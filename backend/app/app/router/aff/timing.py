from app.model.common import CommonResponse
from app.model.request import (
    TimingEasingParams,
    TimingGlitchParams,
)
from app.utils.response import make_success_resp
from fastapi import APIRouter, Body
from arcfutil import aff as a


timing_router = APIRouter(
    prefix="/timing",
    tags=["timing"],
)


@timing_router.get("/easing")
async def timing_easing(params: TimingEasingParams = Body()) -> CommonResponse[str]:
    return make_success_resp(
        a.generator.timing_easing(
            params.start,
            params.stop,
            params.start_bpm,
            params.stop_bpm,
            params.count,
            bar=params.bar,
            mode=params.easing,
            b_point=params.easing_b_point,
        ).__str__()
    )


@timing_router.get("/glitch")
async def timing_glitch(params: TimingGlitchParams = Body()) -> CommonResponse[str]:
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
