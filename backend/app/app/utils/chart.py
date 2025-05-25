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


def note_to_skyline(note: a.Note) -> a.NoteGroup:
    tap_duration = 25

    def get_x_from_lane(lane: int) -> float:
        return 0.5 * (lane - 1)
    
    print(note)
    
    if type(note) == a.Tap:
        t1 = note.time
        t2 = t1 + tap_duration
        dx = get_x_from_lane(note.lane)
        return NoteGroup(
            [
                Arc(t1, t1, -0.45 + dx, -0.05 + dx, "s", -0.20, -0.20, 0, True),
                Arc(t1, t2, -0.45 + dx, -0.45 + dx, "s", -0.20, -0.20, 0, True),
                Arc(t1, t2, -0.05 + dx, -0.05 + dx, "s", -0.20, -0.20, 0, True),
                Arc(t2, t2, -0.45 + dx, -0.05 + dx, "s", -0.20, -0.20, 0, True),
            ]
        )
    elif type(note) == a.Hold:
        t1 = note.time
        t2 = note.totime
        dx = get_x_from_lane(note.lane)
        return NoteGroup(
            [
                Arc(t1, t1, -0.45 + dx, -0.05 + dx, 's', -0.20, -0.20, 0, True),
                Arc(t1, t2, -0.45 + dx, -0.45 + dx, 's', -0.20, -0.20, 0, True),
                Arc(t1, t2, -0.05 + dx, -0.05 + dx, 's', -0.20, -0.20, 0, True),
                Arc(t2, t2, -0.45 + dx, -0.05 + dx, 's', -0.20, -0.20, 0, True)
            ]
        )
    elif type(note) == a.Arc and not note.isskyline:
        t1 = note.time
        t2 = note.totime
        dx1 = note.fromx
        dx2 = note.tox
        dy1 = note.fromy
        dy2 = note.toy
        arc_type = note.slideeasing
        color = note.color
        return NoteGroup(
            [
                # start
                Arc(t1, t1, -0.09 + dx1, 0.00 + dx1, 's', -0.07 + dy1, 0.09 + dy1, color, True),
                Arc(t1, t1, 0.00 + dx1, 0.09 + dx1, 's', 0.09 + dy1, -0.07 + dy1, color, True),
                # mid
                Arc(t1, t2, -0.09 + dx1, -0.09 + dx2, arc_type, -0.07 + dy1, -0.07 + dy2, color, True),
                Arc(t1, t2, 0.00 + dx1, 0.00 + dx2, arc_type, 0.09 + dy1, 0.09 + dy2, color, True),
                Arc(t1, t2, 0.09 + dx1, 0.09 + dx2, arc_type, -0.07 + dy1, -0.07 + dy2, color, True),
                # end
                Arc(t2, t2, -0.09 + dx2, 0.00 + dx2, 's', -0.07 + dy2, 0.09 + dy2, color, True),
                Arc(t2, t2, 0.00 + dx2, 0.09 + dx2, 's', 0.09 + dy2, -0.07 + dy2, color, True),
            ]
        )
    else:
        return NoteGroup([note])
