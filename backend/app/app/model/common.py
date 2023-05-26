from enum import Enum
from typing import Any, Generic, TypeVar
from app.exception import NotAnArcError
from pydantic import BaseModel
from arcfutil import aff as a
from arcfutil import exception as aex


T = TypeVar("T")


class StatusCode(int, Enum):
    SUCCESS = 0
    UNKNOWN_ERR = -1
    REQUEST_VALIDATION_ERR = 100


class CommonResponse(BaseModel, Generic[T]):
    code: StatusCode
    result: T


class NoteString(str):
    @classmethod
    def __get_validators__(cls) -> Any:
        yield cls.validate

    @classmethod
    def validate(cls, v: str) -> Any:
        try:
            arc = a.loadline(v)
            return cls(v)
        except Exception as e:
            raise e


class ArcString(str):
    @classmethod
    def __get_validators__(cls) -> Any:
        yield cls.validate

    @classmethod
    def validate(cls, v: str) -> Any:
        try:
            arc = a.loadline(v)
            if not isinstance(arc, a.Arc):
                raise NotAnArcError(arc)
            return cls(v)
        except Exception as e:
            raise e
