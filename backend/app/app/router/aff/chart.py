from typing import Iterable
from app.model.common import CommonResponse
from app.model.request import (
    ChartAlignParams,
    ChartOffsetParams,
    ChartScaleParams,
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

    def scale_group(notes):
        if isinstance(notes, a.AffList):
            notes.offset = (
                notes.offset - params.standard
            ) * params.scale + params.standard
            print("scaled offset:", notes.offset)

        for each in notes:
            print(each.__dict__)
            if each is None:
                continue

            if isinstance(each, a.NoteGroup):
                scale_group(each)
            else:
                if isinstance(each, a.Timing):
                    each.bpm = each.bpm * original_scale

                if each.time == 0 and isinstance(each, a.Timing):
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
                if each.time < params.standard and not (
                    each.time == 0 and isinstance(each, a.Timing)
                ):
                    notes[i] = None
        return notes

    return make_success_resp(scale_group(filter_by_standard(notes)).__str__())


@chart_router.post("/to-skyline")
async def chart_to_skyline(
    notes: a.NoteGroup = Depends(notes_converter),
) -> CommonResponse[str]:
    def note_converter(x: a.Note | a.NoteGroup) -> list:
        if type(x) == a.TimingGroup:
            tg_option = x.option

            result_tg = a.TimingGroup(
                *map(
                    lambda y: note_to_skyline(y), x
                ),
                opt=tg_option
            )

            # create arc appendix in tg
            tg_arcs = [y for y in x if type(y) == a.Arc]
            result_tg.extend(arcs_to_appendix(tg_arcs))

            return result_tg
        else:
            return note_to_skyline(x)

    converted_list = list(map(note_converter, notes))

    result = a.NoteGroup(*converted_list)

    # create arc appendix in main aff
    aff_arcs = [x for x in notes if type(x) == a.Arc]
    result.extend(arcs_to_appendix(aff_arcs))

    return make_success_resp(result.__str__())
