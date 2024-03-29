from app.model.common import CommonResponse
from app.model.request import (
    TimingEasingDispParams,
    TimingEasingParams,
    TimingGlitchParams,
)
from app.utils.response import make_success_resp
from fastapi import APIRouter, Body
from arcfutil import aff as a
from arcfutil.aff.easing import get_easing_func


timing_router = APIRouter(
    prefix="/timing",
    tags=["timing"],
)


@timing_router.post("/easing")
async def timing_easing(
    params: TimingEasingParams = Body(embed=True),
) -> CommonResponse[str]:
    return make_success_resp(
        a.generator.timing_easing(
            params.start,
            params.stop,
            params.start_bpm,
            params.stop_bpm,
            params.count,
            bar=params.bar,
            mode=get_easing_func(params.easing, params.easing_b_point),
        ).__str__()
    )


@timing_router.post("/glitch")
async def timing_glitch(
    params: TimingGlitchParams = Body(embed=True),
) -> CommonResponse[str]:
    return make_success_resp(
        a.generator.timing_glitch(
            params.start,
            params.stop,
            params.count,
            params.bpm_range,
            exact_bar=params.exact_bar,
            zero_bar=params.zero_bar,
        ).__str__()
    )


@timing_router.post("/easing-disp")
async def timing_easing_disp(
    params: TimingEasingDispParams = Body(embed=True),
) -> CommonResponse[str]:
    return make_success_resp(
        a.generator.timing_easing_by_disp(
            params.start,
            params.stop,
            params.basebpm,
            params.count,
            bar=params.bar if params.bar is not None else 4.00,
            easing=get_easing_func(
                params.easing if params.easing is not None else "s",
                params.easing_b_point
                if params.easing_b_point is not None
                else [1 / 3, 0, 2 / 3, 1],
            ),
        ).__str__()
    )
