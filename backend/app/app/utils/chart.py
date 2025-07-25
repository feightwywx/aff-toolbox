from typing import Literal, Optional
from arcfutil import aff as a
from arcfutil.aff.note import NoteGroup, SceneControl, Arc
from math import atan2, sin, cos
import cv2
import numpy as np
import base64
import re


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


def image_to_arc(image: str, 
                 start: int, stop: int, 
                 sampling_rate: float,
                 offset_x: float = 0.0,
                 offset_y: float = 0.0, 
                 scale_x: float = 1.0, 
                 scale_y: float = 1.0, 
                 method="thinging",
                 plane="vertical"):

    # Extract base64 part. Remove any existing data URI prefix
    if image.startswith('data:'):
        image = re.sub(r'^data:image/[a-zA-Z]+;base64,', '', image)
    
    # Decode base64 image string
    image_data = base64.b64decode(image)
    img = cv2.imdecode(np.frombuffer(image_data, np.uint8), cv2.IMREAD_GRAYSCALE)
    
    # Check if decoding was successful
    if img is None:
        print("Failed to decode image data")
        return None

    # Binary thresholding (THRESH_BINARY_INV for black/white inversion, OTSU for automatic threshold processing)
    ret, binary = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
    
    if method == "contour":
        # Extract contours
        contours, _ = cv2.findContours(binary, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    elif method == "thinning":
        # First perform skeletonization using cv2.ximgproc.thinning method
        skeleton = cv2.ximgproc.thinning(binary, thinningType=cv2.ximgproc.THINNING_GUOHALL)
        # Then extract contours from the skeleton
        contours, _ = cv2.findContours(skeleton, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    else:
        return None
    
    arcs = NoteGroup()
    image_height = img.shape[0]
    image_width = img.shape[1]
    
    # Calculate maximum dimension for normalization (maintaining aspect ratio)
    max_dimension = max(image_width, image_height)
    
    for contour in contours:
        # Calculate contour perimeter for sampling rate
        epsilon = sampling_rate * cv2.arcLength(contour, True)
        
        # Polygon approximation
        approx = cv2.approxPolyDP(contour, epsilon, True)
        
        # Generate Arcs
        for i in range(len(approx)):
            x1, y1 = approx[i][0]
            
            # If it's the last point, connect back to the first point (close the contour)
            if i == len(approx) - 1:
                x2, y2 = approx[0][0]
            else:
                x2, y2 = approx[i+1][0]

            # Coordinate transformation (normalization + Y-axis flip + scaling + translation)
            x1_norm = x1 / max_dimension
            y1_norm = (image_height - y1) / max_dimension
            x2_norm = x2 / max_dimension
            y2_norm = (image_height - y2) / max_dimension

            if plane == "vertical":
                # Generate traces on a vertical plane (XY plane) at the same time, ignoring end time 
                
                # Apply scaling and translation
                x1_trans = round(x1_norm * scale_x + offset_x, 3)
                y1_trans = round(y1_norm * scale_y + offset_y, 3)
                x2_trans = round(x2_norm * scale_x + offset_x, 3)
                y2_trans = round(y2_norm * scale_y + offset_y, 3)

                # Generate Arc
                arcs.append(
                    Arc(time=start, totime=start, fromx=x1_trans, fromy=y1_trans, tox=x2_trans, toy= y2_trans, slideeasing='s', color=0, isskyline=True)
                )

            elif plane == "timeline":
                # Generate traces on a plane formed by X-axis and time axis, start/end time determines vertical stretching factor
                # Y value is determined by offset_y

                x1_trans = round(x1_norm * scale_x + offset_x, 3)
                x2_trans = round(x2_norm * scale_x + offset_x, 3)

                t1_trans = y1_norm  * (stop - start) + start
                t2_trans = y2_norm  * (stop - start) + start
                t1_trans = int(t1_trans)
                t2_trans = int(t2_trans)

                # If t1_trans is greater than t2_trans, swap their values to ensure trace start time is less than end time
                if t1_trans > t2_trans:
                    t1_trans, t2_trans = t2_trans, t1_trans
                    # Also swap x1_trans and x2_trans values
                    x1_trans, x2_trans = x2_trans, x1_trans

                # Generate Arcs
                arcs.append(
                    Arc(time=t1_trans, totime=t2_trans, fromx=x1_trans, fromy=offset_y, tox=x2_trans, toy=offset_y, slideeasing='s', color=0, isskyline=True)
                )
                
            else:
                return None
        
    return arcs


def note_to_skyline(
        note: a.Note,
        tap_scale: Optional[float],
        arctap_scale: Optional[float]
    ) -> a.NoteGroup:
    tap_duration = 25 * (tap_scale if tap_scale is not None else 1)
    arctap_duration = 12 * (arctap_scale if arctap_scale is not None else 1)

    def get_x_from_lane(lane: int) -> float:
        return 0.5 * (lane - 1)
    
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

        arc_body_list = [
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

        return NoteGroup(
            arc_body_list
        )
    elif type(note) == a.Arc and note.isskyline:
        def createArctap(t: int, pos: list[float]) -> list[Arc]:
            t1 = t
            t2 = t1 + arctap_duration
            dx = pos[0]
            dy = pos[1]
            return [
                # start TRBL
                Arc(t1, t1, -0.24 + dx, 0.24 + dx, 's', -0.02 + dy, -0.02 + dy, 0, True),
                Arc(t1, t1, 0.24 + dx, 0.24 + dx, 's', -0.02 + dy, -0.15 + dy, 0, True),
                Arc(t1, t1, -0.24 + dx, 0.24 + dx, 's', -0.15 + dy, -0.15 + dy, 0, True),
                Arc(t1, t1, -0.24 + dx, -0.24 + dx, 's', -0.02 + dy, -0.15 + dy, 0, True),
                # body TL TR BR BL
                Arc(t1, t2, -0.24 + dx, -0.24 + dx, 's', -0.02 + dy, -0.02 + dy, 0, True),
                Arc(t1, t2, 0.24 + dx, 0.24 + dx, 's', -0.02 + dy, -0.02 + dy, 0, True),
                Arc(t1, t2, 0.24 + dx, 0.24 + dx, 's', -0.15 + dy, -0.15 + dy, 0, True),
                Arc(t1, t2, -0.24 + dx, -0.24 + dx, 's', -0.15 + dy, -0.15 + dy, 0, True),
                # end TRBL
                Arc(t2, t2, -0.24 + dx, 0.24 + dx, 's', -0.02 + dy, -0.02 + dy, 0, True),
                Arc(t2, t2, 0.24 + dx, 0.24 + dx, 's', -0.02 + dy, -0.15 + dy, 0, True),
                Arc(t2, t2, -0.24 + dx, 0.24 + dx, 's', -0.15 + dy, -0.15 + dy, 0, True),
                Arc(t2, t2, -0.24 + dx, -0.24 + dx, 's', -0.02 + dy, -0.15 + dy, 0, True),
            ]
        arctap_list: list[Arc] = []

        for t in note.skynote:
            arctap_list.extend(createArctap(t, note[t]))

        note.skynote = []

        return NoteGroup(
            [note],
            arctap_list
        )
    else:
        return NoteGroup([note])
    

def arcs_to_appendix(
        arcs: list[Arc],
        arc_head_scale: Optional[float]
    ) -> a.NoteGroup:
    arc_head_duration = 5 * (arc_head_scale if arc_head_scale is not None else 1)

    arcs_with_head: list[Arc] = []
    arcs_with_indicator: list[Arc] = []

    def create_arc_head(arc: Arc) -> list[Arc]:
        t1 = arc.time - arc_head_duration
        t2 = arc.time
        x = arc.fromx
        y = arc.fromy
        color = arc.color

        return [
            Arc(t1, t2, x, x, 's', y - 0.07, y + 0.09, color, True),
            Arc(t1, t2, x, x - 0.09, 's', y - 0.07, y - 0.07, color, True),
            Arc(t1, t2, x, x + 0.09, 's', y - 0.07, y - 0.07, color, True)
        ]
    
    def create_arc_indicator(arc: Arc) -> list[Arc]:
        t = arc.time
        x = arc.fromx
        y = arc.fromy
        color = arc.color

        return [
            Arc(t, t, x, x, 's', -0.20, y - 0.07, color, True)
        ]

    for a in arcs:
        # find arcs with head
        # arcs with head always have height indicator at start
        if not any([b.totime == a.time for b in arcs]):
            arcs_with_head.append(a)
            arcs_with_indicator.append(a)
        
        # find arcs with height indicator at start
        if any([b.totime == a.time
                and abs(b.tox - a.fromx) < 1e-4
                and abs(b.toy - a.fromy) < 1e-4
                and abs(a.fromy - a.toy) > 1e-4
                for b in arcs]):
            arcs_with_indicator.append(a)

    return NoteGroup(
        *map(create_arc_head, arcs_with_head),
        *map(create_arc_indicator, arcs_with_indicator)
    )
