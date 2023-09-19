from app.model.common import CommonResponse
from app.model.request import SceneControlBlinkParams
from app.utils.response import make_success_resp
from app.utils.chart import sc_blink
from fastapi import APIRouter, Body
from arcfutil import aff as a
from arcfutil.aff.easing import get_easing_func


etc_router = APIRouter(
    prefix="/etc",
    tags=["etc"],
)


@etc_router.post("/sc-blink")
async def blink(
    params: SceneControlBlinkParams = Body(embed=True),
) -> CommonResponse[str]:
    return make_success_resp(
        sc_blink(
            params.start,
            params.stop,
            params.count,
            params.sc_x if params.sc_x is not None else 0,
        ).__str__()
    )
