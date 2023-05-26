from fastapi import APIRouter
from .arc import arc_router
from .parser import parser_router
from .timing import timing_router
from .chart import chart_router


aff_router = APIRouter(
    prefix="/aff",
    tags=["aff"],
)

aff_router.include_router(arc_router)
aff_router.include_router(parser_router)
aff_router.include_router(timing_router)
aff_router.include_router(chart_router)
