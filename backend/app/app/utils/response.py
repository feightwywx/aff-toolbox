from typing import TypeVar

from app.model.common import CommonResponse, StatusCode


T = TypeVar("T")


def make_success_resp(result: T) -> CommonResponse[T]:
    return CommonResponse.parse_obj({'code': StatusCode.SUCCESS, 'result': result})


def make_fail_resp(result: T, code: StatusCode = StatusCode.UNKNOWN_ERR) -> CommonResponse[T]:
    return CommonResponse.parse_obj({'code': code, 'result': result})
