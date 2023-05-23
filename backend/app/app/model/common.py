from enum import Enum
from typing import Generic, TypeVar
from pydantic import BaseModel


T = TypeVar("T")


class StatusCode(int, Enum):
    SUCCESS = 0
    UNKNOWN_ERR = -1
    REQUEST_VALIDATION_ERR = 100


class CommonResponse(BaseModel, Generic[T]):
    code: StatusCode
    result: T
