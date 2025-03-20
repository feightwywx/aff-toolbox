from typing import Literal
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

    # 检查并删除可能存在的data URI前缀
    if image.startswith('data:'):
        # 提取base64部分
        image = re.sub(r'^data:image/[a-zA-Z]+;base64,', '', image)
    
    # 解码base64图像字符串
    image_data = base64.b64decode(image)
    
    # 解码图像
    img = cv2.imdecode(np.frombuffer(image_data, np.uint8), cv2.IMREAD_GRAYSCALE)
    
    # 检查解码是否成功
    if img is None:
        print("Failed to decode image data")
        return None
    else:
        # 输出图像基本属性
        print("Image shape:", img.shape)

    # 二值化处理(THRESH_BINARY_INV黑白反色处理，OTSU自动阈值处理)
    ret, binary = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
    
    # 修正method名称中的拼写错误
    if method == "contour":
        # 提取轮廓
        contours, _ = cv2.findContours(binary, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    elif method == "thinning":
        # 先进行骨架化：利用 cv2.ximgproc.thinning 方法
        skeleton = cv2.ximgproc.thinning(binary, thinningType=cv2.ximgproc.THINNING_GUOHALL)
        # 再提取骨架的轮廓
        contours, _ = cv2.findContours(skeleton, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    else:
        return None
    
    arcs = NoteGroup()
    image_height = img.shape[0]
    image_width = img.shape[1]
    
    # 计算最大尺寸用于归一化（保持比例）
    max_dimension = max(image_width, image_height)
    
    for contour in contours:
        # 计算轮廓周长用于采样率
        epsilon = sampling_rate * cv2.arcLength(contour, True)
        
        # 多边形近似
        approx = cv2.approxPolyDP(contour, epsilon, True)
        
        # 生成Traces
        for i in range(len(approx)):
            x1, y1 = approx[i][0]
            
            # 如果是最后一个点则连接回第一个点（闭合轮廓）
            if i == len(approx) - 1:
                x2, y2 = approx[0][0]
            else:
                x2, y2 = approx[i+1][0]

            # 坐标变换（归一化 + 翻转Y轴 + 缩放 + 平移）
            x1_norm = x1 / max_dimension
            y1_norm = (image_height - y1) / max_dimension
            x2_norm = x2 / max_dimension
            y2_norm = (image_height - y2) / max_dimension

            if plane == "vertical":
                # 在同一时间的垂直平面上生成traces(XY平面)，忽略终止时间 
                
                # 应用缩放和平移
                x1_trans = round(x1_norm * scale_x + offset_x, 3)
                y1_trans = round(y1_norm * scale_y + offset_y, 3)
                x2_trans = round(x2_norm * scale_x + offset_x, 3)
                y2_trans = round(y2_norm * scale_y + offset_y, 3)

                # 生成Arc
                arcs.append(
                    Arc(time=start, totime=start, fromx=x1_trans, fromy=y1_trans, tox=x2_trans, toy= y2_trans, slideeasing='s', color=0, isskyline=True)
                )

            elif plane == "timeline":
                # 在X轴与时间轴轨道组成平面上生成traces(XY平面)，起止时间决定垂直方向的拉伸系数
                # Y值由offset_y决定

                x1_trans = round(x1_norm * scale_x + offset_x, 3)
                x2_trans = round(x2_norm * scale_x + offset_x, 3)

                t1_trans = y1_norm  * (stop - start) + start
                t2_trans = y2_norm  * (stop - start) + start
                t1_trans = int(t1_trans)
                t2_trans = int(t2_trans)

                # 如果t1_trans大于t2_trans，交换它们的值，保证trace的起始时间小于结束时间
                if t1_trans > t2_trans:
                    t1_trans, t2_trans = t2_trans, t1_trans
                    # 同时，也要交换x1_trans和x2_trans的值
                    x1_trans, x2_trans = x2_trans, x1_trans

                # 生成Arc
                arcs.append(
                    Arc(time=t1_trans, totime=t2_trans, fromx=x1_trans, fromy=offset_y, tox=x2_trans, toy=offset_y, slideeasing='s', color=0, isskyline=True)
                )
                
            else:
                return None
        
    return arcs