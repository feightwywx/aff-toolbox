from typing import Optional
from app.model.common import CommonResponse
from app.model.request import (
    ArcShiftParams,
    ImageCommonBody,
    ArcAnimateParams,
    ArcBreakParams,
    ArcCreaseLineParams,
    ArcEnvelopeParams,
    ArcPostProcessParams,
    ArcSplitParams,
    ArcRainParams,
    ArcSketchToArcParams,
)
from app.utils.chart import arc_break, image_to_arc
from app.utils.postprocess import arc_post_process
from app.utils.response import make_success_resp
import app.exception as appexc
from fastapi import APIRouter, Body, Depends
from arcfutil import aff as a
from arcfutil.aff.easing import get_easing_func


arc_router = APIRouter(
    prefix="/arc",
    tags=["arc"],
)


async def arc_converter(arc: str = Body(embed=True)) -> list[a.Arc]:
    notes = a.NoteGroup(filter(lambda note: isinstance(note, a.Arc), (a.load(arc))))
    if len(notes) > 0:
        return notes
    else:
        raise appexc.NotAnArcError(notes)


async def arc_tap_hold_converter(arc: str = Body()) -> list[a.Arc | a.Tap | a.Hold]:
    notes = a.NoteGroup(
        filter(
            lambda note: isinstance(note, a.Arc)
            or isinstance(note, a.Tap)
            or isinstance(note, a.Hold),
            (a.load(arc)),
        )
    )
    if len(notes) > 0:
        return notes
    else:
        raise appexc.NotAnArcError(notes)


async def timings_converter(timings: str = Body()) -> a.NoteGroup:
    obj = a.load(timings)
    return a.NoteGroup(filter(lambda note: isinstance(note, a.Timing), obj))


@arc_router.post("/split")
async def arc_split(
    arc: a.Arc = Depends(arc_converter),
    params: ArcSplitParams = Body(
        examples=[
            {
                "arc": "arc(0,1000,1.00,0.50,si,0.00,1.00,0,none,false);",
                "params": {"start": 0, "stop": 500, "count": 12},
            }
        ]
    ),
    post: Optional[ArcPostProcessParams] = Body(),
) -> CommonResponse[str]:
    result = arc_post_process(
        a.NoteGroup(
            *map(
                lambda arc: a.generator.arc_slice_by_count(
                    arc=arc,
                    count=params.count,
                    start=params.start if (params.start is not None) else arc.time,
                    stop=params.stop if (params.stop is not None) else arc.totime,
                ),
                arc,
            )
        ),
        post,
    )

    return make_success_resp(result.__str__())


@arc_router.post("/split-by-timing")
async def arc_split_by_timing(
    arc: a.Arc = Depends(arc_converter),
    timings: list[a.Timing] = Depends(timings_converter),
    post: Optional[ArcPostProcessParams] = Body(),
) -> CommonResponse[str]:
    result = arc_post_process(
        a.NoteGroup(
            *map(
                lambda arc: a.generator.arc_slice_by_timing(
                    arc=arc,
                    timings=timings,
                ),
                arc,
            )
        ),
        post,
    )

    return make_success_resp(result.__str__())


@arc_router.post("/crease-line")
def arc_crease_line(
    arc: a.Arc = Depends(arc_converter),
    params: ArcCreaseLineParams = Body(),
    post: Optional[ArcPostProcessParams] = Body(),
) -> CommonResponse[str]:
    result = arc_post_process(
        a.NoteGroup(
            *map(
                lambda arc: a.generator.arc_crease_line(
                    base=arc,
                    x_range=params.delta_x,
                    y_range=params.delta_y,
                    count=params.count,
                    mode=params.mode,
                    easing=params.arc_easing,
                ),
                arc,
            )
        ),
        post,
    )

    return make_success_resp(result.__str__())


@arc_router.post("/rain")
def arc_rain(
    params: ArcRainParams = Body(embed=True),
    post: Optional[ArcPostProcessParams] = Body(),
) -> CommonResponse[str]:
    result = a.generator.arc_rain(
        params.start,
        params.stop,
        params.step,
        (
            params.dropLength
            if (params.dropLength is not None)
            else (params.stop - params.start)
        ),
        mode=params.mode,
        x_limit=params.x_limit_range,
        y_limit=params.y_limit_range,
    )

    if post is not None:
        result = arc_post_process(result, post)

    return make_success_resp(result.__str__())


@arc_router.post("/animate")
def arc_animate(
    arc: a.Arc | a.Tap | a.Hold = Depends(arc_tap_hold_converter),
    params: ArcAnimateParams = Body(),
) -> CommonResponse[str]:
    easing_x = get_easing_func(
        params.easing_x,
        params.easing_b_point_x,
    )

    easing_y = get_easing_func(
        params.easing_y,
        params.easing_b_point_y,
    )

    easing_offset_t = get_easing_func(
        params.easing_offset_t,
        params.easing_b_point_offset_t,
    )

    result = a.NoteGroup(
        *map(
            lambda arc: a.generator.arc_animation_assist(
                arc,
                params.start,
                params.stop,
                params.delta_x,
                params.delta_y,
                params.basebpm,
                easing_x=easing_x,
                easing_y=easing_y,
                infbpm=params.infbpm,
                framerate=params.framerate,
                fake_note_t=params.fake_note_t,
                offset_t=params.offset_t,
                delta_offset_t=params.delta_offset_t,
                easing_offset_t=easing_offset_t,
            ),
            arc,
        )
    )

    return make_success_resp(result.__str__())


@arc_router.post("/envelope")
def arc_envelope(
    arc1: str = Body(),
    arc2: str = Body(),
    params: ArcEnvelopeParams = Body(),
    post: Optional[ArcPostProcessParams] = Body(),
) -> CommonResponse[str]:
    obj1 = a.loadline(arc1)
    obj2 = a.loadline(arc2)
    if not (isinstance(obj1, a.Arc) and isinstance(obj2, a.Arc)):
        raise appexc.NotAnArcError([obj1, obj2])
    result = a.generator.arc_envelope(
        obj1,
        obj2,
        params.count,
        params.mode if params.mode is not None else "c",
    )

    if post is not None:
        result = arc_post_process(result, post)

    return make_success_resp(result.__str__())


@arc_router.post("/break")
def arc_break_router(
    arc: a.Arc = Depends(arc_converter),
    params: ArcBreakParams = Body(embed=True),
    post: Optional[ArcPostProcessParams] = Body(),
) -> CommonResponse[str]:
    result = arc_post_process(
        a.NoteGroup(
            *map(
                lambda arc: arc_break(
                    arc,
                    params.breakpoints,
                    params.disp,
                ),
                arc,
            )
        ),
        post,
    )

    return make_success_resp(result.__str__())


@arc_router.post("/sketch-to-arc")
def sketch_to_arc(
    params: ArcSketchToArcParams = Body(),
    post: Optional[ArcPostProcessParams] = Body(),
) -> CommonResponse[str]:
    result = image_to_arc(
        params.image,
        params.start,
        params.stop,
        params.sampling_rate,
        params.x_offset,
        params.y_offset,
        params.x_scale,
        params.y_scale,
        method=params.method,
        plane=params.plane
    )

    if post is not None:
        result = arc_post_process(result, post)

    return make_success_resp(result.__str__())


@arc_router.post("/shift")
def arc_shift_router(
    arc: a.Arc = Depends(arc_converter),
    params: ArcShiftParams = Body(embed=True),
    post: Optional[ArcPostProcessParams] = Body(),
) -> CommonResponse[str]:
    converted_map = list(
        filter(
            lambda y: y is not None,
            map(
                lambda x: x.transfer(params.x_offset, params.y_offset) if isinstance(x, a.Arc) else None,
                arc
            )
        )
    )

    result = arc_post_process(
        a.NoteGroup(converted_map),
        post
    )

    return make_success_resp(result.__str__())
