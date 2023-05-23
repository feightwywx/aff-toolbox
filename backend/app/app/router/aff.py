from app.model.common import CommonResponse
from app.utils.response import make_success_resp
from fastapi import APIRouter


aff_router = APIRouter(
    prefix="/aff",
    tags=["aff"],)


@aff_router.get("/")
async def aff_root() -> CommonResponse:
    return make_success_resp('/aff')
