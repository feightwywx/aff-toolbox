from typing import Iterable
from app.model.common import CommonResponse
from app.model.request import (
    ChartAlignParams,
    ChartOffsetParams,
    ChartScaleParams,
)
from app.utils.response import make_success_resp
from fastapi import APIRouter, Body, Depends
from arcfutil import aff as a


chart_router = APIRouter(
    prefix="/chart",
    tags=["chart"],
)


async def notes_converter(notes: str = Body()) -> a.NoteGroup | a.AffList:
    chart = a.load(notes)
    if not notes.startswith("AudioOffset"):
        return a.NoteGroup(chart)
    return chart


@chart_router.post("/offset")
async def chart_offset(
    notes: str = Body(), params: ChartOffsetParams = Body()
) -> CommonResponse[str]:
    chart: a.AffList = a.load(notes)  # type: ignore
    chart.offsetto(params.offset)

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
    def scale_group(notes):
        for each in notes:
            if isinstance(each, Iterable):
                scale_group(each)
            else:
                each.time = (
                    each.time - params.standard
                ) * params.scale + params.standard
        return notes

    def filter_by_standard(notes):
        for each in notes:
            if isinstance(each, Iterable):
                filter_by_standard(each)
            else:
                if each.time < params.standard:
                    notes.remove(each)
        return notes

    return make_success_resp(filter_by_standard(scale_group(notes)).__str__())
