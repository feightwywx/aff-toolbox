from arcfutil import aff as a
from arcfutil.aff.note import NoteGroup, SceneControl


def sc_blink(start: int, stop: int, count: int, x: float = 0) -> NoteGroup:
    timings = list(range(start, stop, int((stop - start) / count / 2)))
    result = NoteGroup()
    for i, timing in enumerate(timings):
        # hide on odd, show on even
        result.append(SceneControl(timing, "hidegroup", x, (i + 1) % 2))
    return result
