from typing import Annotated
from app.model.common import CommonResponse
from app.model.request import ArcSplitParams, ParserLoadlineBody
from app.utils.response import make_success_resp, make_fail_resp
import app.exception as appexc
from fastapi import APIRouter, Body
from arcfutil import aff as a
from arcfutil import exception as aex
from arcfutil.aff.easing import get_easing_func


parser_router = APIRouter(
    prefix="/parser",
    tags=["parser"],
)


@parser_router.post("/loadline")
async def parser_loadline(
    body: Annotated[
        ParserLoadlineBody,
        Body(examples=[{"note": "(1000,1);"}]),
    ]
) -> CommonResponse:
    note = a.loadline(body.note)

    if isinstance(note, a.Note):
        return make_success_resp(note.__dict__)

    return make_fail_resp("unknown error")
