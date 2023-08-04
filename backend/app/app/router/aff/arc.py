from app.model.common import CommonResponse
from app.model.request import (
    ArcAnimateParams,
    ArcCreaseLineParams,
    ArcSplitParams,
    ArcRainParams,
)
from app.utils.response import make_success_resp
import app.exception as appexc
from fastapi import APIRouter, Body, Depends
from arcfutil import aff as a
from arcfutil.aff.easing import get_easing_func


arc_router = APIRouter(
    prefix="/arc",
    tags=["arc"],
)


async def arc_converter(arc: str = Body()) -> a.Arc:
    obj = a.loadline(arc)
    if isinstance(obj, a.Arc):
        return obj
    else:
        raise appexc.NotAnArcError(obj)


async def timings_converter(timings: str = Body()) -> a.NoteGroup:
    obj = a.load(timings)
    return a.NoteGroup(filter(lambda note: isinstance(note, a.Timing), obj))


@arc_router.post("/split")
async def arc_split(
    arc: a.Arc = Depends(arc_converter),
    params: ArcSplitParams = Body(
        example={
            "arc": "arc(0,1000,1.00,0.50,si,0.00,1.00,0,none,false);",
            "params": {"start": 0, "stop": 500, "count": 12},
        }
    ),
) -> CommonResponse[str]:
    return make_success_resp(
        a.generator.arc_slice_by_count(
            arc=arc,
            count=params.count,
            start=params.start if (params.start is not None) else arc.time,
            stop=params.stop if (params.stop is not None) else arc.totime,
        ).__str__()
    )


@arc_router.post("/split-by-timing")
async def arc_split_by_timing(
    arc: a.Arc = Depends(arc_converter),
    timings: list[a.Timing] = Depends(timings_converter),
) -> CommonResponse[str]:
    return make_success_resp(a.generator.arc_slice_by_timing(arc, timings).__str__())


@arc_router.post("/crease-line")
def arc_crease_line(
    arc: a.Arc = Depends(arc_converter), params: ArcCreaseLineParams = Body()
) -> CommonResponse[str]:
    return make_success_resp(
        a.generator.arc_crease_line(
            arc,
            params.delta_x,
            params.delta_y,
            params.count,
            mode=params.mode,
            easing=params.easing,
        ).__str__()
    )


@arc_router.post("/rain")
def arc_rain(params: ArcRainParams = Body(embed=True)) -> CommonResponse[str]:
    return make_success_resp(
        a.generator.arc_rain(
            params.start,
            params.stop,
            params.step,
            params.dropLength
            if (params.dropLength is not None)
            else (params.stop - params.start),
        ).__str__()
    )


@arc_router.post("/animate")
def arc_animate(
    arc: a.Arc = Depends(arc_converter),
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

    return make_success_resp(
        a.generator.arc_animation_assist(
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
        ).__str__()
    )
