from typing import Iterable
from app.model.common import CommonResponse
from app.model.request import (
    ChartAlignParams,
    ChartOffsetParams,
    ChartScaleParams,
    ChartToSkylineParams,
)
from app.utils.response import make_success_resp
from app.utils.chart import note_to_skyline, arcs_to_appendix
from fastapi import APIRouter, Body, Depends
from arcfutil import aff as a


chart_router = APIRouter(
    prefix="/chart",
    tags=["chart"],
)


async def notes_converter(notes: str = Body(embed=True)) -> a.NoteGroup | a.AffList:
    chart = a.load(notes)
    if not notes.startswith("AudioOffset"):
        return a.NoteGroup(chart)
    return chart


@chart_router.post("/offset")
async def chart_offset(
    notes: str = Body(), params: ChartOffsetParams = Body()
) -> CommonResponse[str]:
    def filter_by_standard(notes):
        for i, each in enumerate(notes):
            if isinstance(each, a.NoteGroup):
                filter_by_standard(each)
                if isinstance(each, a.TimingGroup):
                    opt = each.option
                    filtered_tg = a.TimingGroup(
                        filter(lambda x: x is not None, each), opt=opt
                    )
                    if len(filtered_tg) > 0:
                        notes[i] = filtered_tg
                    else:
                        notes[i] = None
            else:
                if each.time < 0 and not (
                    each.time == 0 and isinstance(each, a.Timing)
                ):
                    notes[i] = None
        return notes

    chart: a.AffList = a.load(notes)  # type: ignore
    chart.offsetto(params.offset)
    if hasattr(chart, "offset") and params.process_audiooffset:
        chart.offset = chart.offset - params.offset
    if not params.allowMinusTimingNote:
        chart = filter_by_standard(chart)

    if notes.startswith("AudioOffset"):
        return make_success_resp(chart.__str__())
    else:
        processed = a.NoteGroup(chart)
        processed.pop(0)
        return make_success_resp(processed.__str__())


@chart_router.post("/align")
async def chart_align(
    notes: a.NoteGroup = Depends(notes_converter), params: ChartAlignParams = Body()
) -> CommonResponse[str]:
    return make_success_resp(
        notes.align(params.bpm, params.error, params.lcd).__str__()
    )


@chart_router.post("/mirror")
async def chart_mirror(
    notes: a.NoteGroup = Depends(notes_converter),
) -> CommonResponse[str]:
    return make_success_resp(notes.mirror().__str__())


@chart_router.post("/scale")
async def chart_scale(
    notes: a.NoteGroup = Depends(notes_converter), params: ChartScaleParams = Body()
) -> CommonResponse[str]:
    original_scale = params.scale
    params.scale = 1 / params.scale

    initial_event_ids = set()

    def scale_group(notes):
        if isinstance(notes, a.AffList):
            notes.offset = (
                notes.offset - params.standard
            ) * params.scale + params.standard

        for each in notes:
            if each is None:
                continue

            if isinstance(each, a.NoteGroup):
                scale_group(each)
            else:
                if isinstance(each, a.Timing):
                    each.bpm = each.bpm * original_scale

                if id(each) in initial_event_ids:
                    continue

                is_zero_duration = False
                if hasattr(each, "totime"):
                    is_zero_duration = each.totime == each.time
                    each.totime = int(
                        (each.totime - params.standard) * params.scale + params.standard
                    )

                each.time = int(
                    (each.time - params.standard) * params.scale + params.standard
                )

                if (
                    hasattr(each, "totime")
                    and each.time == each.totime
                    and not is_zero_duration
                ):
                    each.totime = each.totime + 1

                if isinstance(each, a.Arc) and each.skynote is not None:
                    each.skynote = list(
                        map(
                            lambda x: (x - params.standard) * params.scale
                            + params.standard,
                            each.skynote,
                        )
                    )

                if isinstance(each, a.SceneControl) and each.type in [
                    "enwidencamera",
                    "enwidenlanes",
                ]:
                    each.x = (each.x - params.standard) * params.scale + params.standard
        return notes

    def filter_by_standard(notes):
        # 每个时间组独立取样：优先参考点之前最近的，否则取之后最近的。
        candidates = {}
        for each in notes:
            if isinstance(each, a.Timing):
                key = (a.Timing,)
            elif isinstance(each, a.SceneControl):
                key = (a.SceneControl, each.scenetype)
            else:
                continue
            candidates.setdefault(key, []).append(each)

        initial_events = []
        for events in candidates.values():
            before = [event for event in events if event.time <= params.standard]
            selected = (
                max(before, key=lambda event: event.time)
                if before
                else min(events, key=lambda event: event.time)
            )
            initial = selected if selected.time == 0 else selected.copyto(0)
            initial_events.append(initial)
            initial_event_ids.add(id(initial))

        retained = []
        for each in notes:
            if isinstance(each, a.NoteGroup):
                filter_by_standard(each)
                if each:
                    retained.append(each)
            elif each is not None and id(each) not in initial_event_ids:
                if each.time >= params.standard:
                    retained.append(each)

        # 原地更新，保留 AffList 头部和 TimingGroup option，并移除过滤占位。
        notes[:] = initial_events + retained
        return notes

    def fix_same_time_timing(group):
        bpm_by_time = {}
        for each in group:
            if isinstance(each, a.Timing):
                while any(bpm != each.bpm for bpm in bpm_by_time.get(each.time, set())):
                    each.time += 1
                bpm_by_time.setdefault(each.time, set()).add(each.bpm)
            elif isinstance(each, a.TimingGroup):
                fix_same_time_timing(each)
        return group

    processed = scale_group(filter_by_standard(notes))
    if params.fix_same_time_timing:
        fix_same_time_timing(processed)
    return make_success_resp(processed.__str__())


@chart_router.post("/to-skyline")
async def chart_to_skyline(
    notes: a.NoteGroup = Depends(notes_converter), params: ChartToSkylineParams = Body()
) -> CommonResponse[str]:
    def note_converter(x: a.Note | a.NoteGroup) -> list:
        if type(x) == a.TimingGroup:
            tg_option = x.option

            result_tg = a.TimingGroup(
                *map(
                    lambda y: note_to_skyline(y, params.tap_scale, params.arctap_scale),
                    x,
                ),
                opt=tg_option
            )

            # create arc appendix in tg
            tg_arcs = [y for y in x if type(y) == a.Arc and y.isskyline == False]
            result_tg.extend(arcs_to_appendix(tg_arcs, params.arc_head_scale))

            return result_tg
        else:
            return note_to_skyline(x, params.tap_scale, params.arctap_scale)

    converted_list = list(map(note_converter, notes))

    result = a.NoteGroup(*converted_list)

    # create arc appendix in main aff
    aff_arcs = [x for x in notes if type(x) == a.Arc and x.isskyline == False]
    result.extend(arcs_to_appendix(aff_arcs, params.arc_head_scale))

    return make_success_resp(result.__str__())
