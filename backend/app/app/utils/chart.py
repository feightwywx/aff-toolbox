from typing import Literal
from arcfutil import aff as a
from arcfutil.aff.note import NoteGroup, SceneControl, Arc
from math import atan2, sin, cos


def sc_blink(start: int, stop: int, count: int, x: float = 0) -> NoteGroup:
    timings = list(range(start, stop, int((stop - start) / count / 2)))
    result = NoteGroup()
    for i, timing in enumerate(timings):
        # hide on odd, show on even
        result.append(SceneControl(timing, "hidegroup", x, (i + 1) % 2))
    return result


def arc_break(arc: Arc, breakpoints: list[int], disp: float) -> NoteGroup:
    def calc_disp(arc: Arc, disp: float) -> tuple[float, float]:
        dx = arc.tox - arc.fromx
        dy = arc.toy - arc.fromy
        if dx != 0 and dy != 0:
            deg = atan2(dy, dx)

            x_disp = disp * sin(deg)
            y_disp = disp * cos(deg)

            return x_disp, y_disp
        elif dy != 0:
            return 0, disp
        else:
            return disp, 0

    arcs = a.generator.arc_slice_by_timing(
        arc, list(map(lambda x: a.Timing(x, 100), breakpoints))
    )

    for i in range(0, len(arcs)):
        arc_current: Arc = arcs[i]

        x, y = calc_disp(arc_current, disp / 2)
        # change start coordinate
        if i != 0:
            arc_current.fromx += x
            arc_current.fromy += y
        # change stop coordinate
        if i != len(arcs) - 1:
            arc_current.tox -= x
            arc_current.toy -= y

    return arcs
