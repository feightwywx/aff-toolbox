from typing import Any


class NotAnArcError(Exception):
    obj: Any

    def __init__(self, obj: Any, *args: object) -> None:
        super().__init__(*args)

        self.obj = obj

    def __str__(self) -> str:
        return f"not an arc: {self.obj}"


class CountTooLargeError(Exception):
    pass


class StartStopError(Exception):
    pass


class TooLessBPointArgsError(Exception):
    pass
