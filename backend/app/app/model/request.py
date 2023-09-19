from typing import Any, Literal, Optional
from app.exception import CountTooLargeError, StartStopError, TooLessBPointArgsError
from pydantic import BaseModel, root_validator, validator
from app.model.common import ArcString, NoteString


class NoteCommonBody(BaseModel):
    note: NoteString


class ParserLoadlineBody(NoteCommonBody):
    pass


class ArcCommonBody(BaseModel):
    arc: ArcString


class StartStopCommonBody(BaseModel):
    start: int
    stop: int

    @root_validator()
    def start_stop_validate(cls, values: dict[str, Any]) -> dict[str, Any]:
        start, stop = values.get("start"), values.get("stop")

        if isinstance(start, int) and isinstance(stop, int) and start >= stop:
            raise StartStopError("start time must before stop time")

        return values


class OptionalStartStopCommonBody(BaseModel):
    start: Optional[int]
    stop: Optional[int]

    @root_validator()
    def start_stop_validate(cls, values: dict[str, Any]) -> dict[str, Any]:
        start, stop = values.get("start"), values.get("stop")

        if isinstance(start, int) and isinstance(stop, int) and start >= stop:
            raise StartStopError("start time must before stop time")

        return values


class CountCommonBody(BaseModel):
    count: int

    @validator("count")
    def count_validate(cls, val: int) -> int:
        if val > 1024:
            raise CountTooLargeError("max count exceed")
        return val


class ArcSplitParams(OptionalStartStopCommonBody, CountCommonBody):
    pass


class ArcCreaseLineParams(CountCommonBody):
    delta_x: float
    delta_y: float
    mode: Literal["m", "s"] = "m"
    arc_easing: str


class ArcAnimateParams(StartStopCommonBody):
    delta_x: float
    delta_y: float

    basebpm: float

    easing_x: str
    easing_b_point_x: Optional[list[float]] = [1 / 3, 0, 2 / 3, 1]

    easing_y: str
    easing_b_point_y: Optional[list[float]] = [1 / 3, 0, 2 / 3, 1]

    infbpm: float = 999999.0
    framerate: float = 60.0
    fake_note_t: int = 100000

    offset_t: int = 0
    delta_offset_t: int = 0
    easing_offset_t: str
    easing_b_point_offset_t: Optional[list[float]] = [1 / 3, 0, 2 / 3, 1]

    @root_validator()
    def count_validate(cls, values: dict[str, Any]) -> dict[str, Any]:
        start, stop, framerate = (
            values.get("start"),
            values.get("stop"),
            values.get("framerate"),
        )

        if (
            isinstance(start, int)
            and isinstance(stop, int)
            and isinstance(framerate, float)
            and ((stop - start) / 1000 * framerate) > 1024
        ):
            raise CountTooLargeError("too much frames")

        return values

    @validator("easing_b_point_x", "easing_b_point_y", "easing_b_point_offset_t")
    def easing_b_point_validate(cls, val: list[float]) -> list[float]:
        if len(val) < 4:
            raise TooLessBPointArgsError("too less bezier control point arguments")
        return val


class ArcRainParams(StartStopCommonBody):
    step: float
    dropLength: Optional[int]

    @root_validator()
    def count_validate(cls, values: dict[str, Any]) -> dict[str, Any]:
        start, stop, step = (
            values.get("start"),
            values.get("stop"),
            values.get("step"),
        )

        if (
            isinstance(start, int)
            and isinstance(stop, int)
            and isinstance(step, float)
            and ((int(stop) - int(start)) / float(step)) > 1024
        ):
            raise CountTooLargeError("too much arcs")

        return values


class TimingEasingParams(StartStopCommonBody, CountCommonBody):
    start_bpm: float
    stop_bpm: float
    bar: float = 4.00
    easing: str = "s"
    easing_b_point: list[float] = [1 / 3, 0, 2 / 3, 1]

    @validator("easing_b_point")
    def easing_b_point_validate(cls, val: list[float]) -> list[float]:
        if len(val) < 4:
            raise TooLessBPointArgsError("too less bezier control point arguments")
        return val


class TimingGlitchParams(StartStopCommonBody, CountCommonBody):
    bpm_range: float
    exact_bar: float = 4.00
    zero_bar: float = 4.00


class ChartOffsetParams(BaseModel):
    offset: int


class ChartAlignParams(BaseModel):
    bpm: float
    error: int
    lcd: int = 96


class ArcPostProcessParams(BaseModel):
    mirror: bool
    straighten_x: bool
    straighten_y: bool
    connector: bool
    position_filter: Literal["", "even", "odd"]


class ArcEnvelopeParams(CountCommonBody):
    mode: Optional[Literal["c", "p"]] = "c"
