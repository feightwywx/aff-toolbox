from fastapi.testclient import TestClient

from ..main import app

client = TestClient(app)


def test_arc_split():
    response = client.post(
        "/aff/arc/split",
        json={
            "post": {
                "mirror": False,
                "straighten_x": False,
                "straighten_y": False,
                "connector": False,
                "position_filter": "",
            },
            "params": {"count": 16},
            "arc": "arc(0,1000,0.00,1.00,s,1.00,1.00,0,none,false);",
        },
    )
    assert response.status_code == 200
    assert response.json() == {
        "code": 0,
        "result": "arc(0,62,0.00,0.06,s,1.00,1.00,0,none,false);\narc(62,125,0.06,0.12,s,1.00,1.00,0,none,false);\narc(125,187,0.12,0.19,s,1.00,1.00,0,none,false);\narc(187,250,0.19,0.25,s,1.00,1.00,0,none,false);\narc(250,312,0.25,0.31,s,1.00,1.00,0,none,false);\narc(312,375,0.31,0.38,s,1.00,1.00,0,none,false);\narc(375,437,0.38,0.44,s,1.00,1.00,0,none,false);\narc(437,500,0.44,0.50,s,1.00,1.00,0,none,false);\narc(500,562,0.50,0.56,s,1.00,1.00,0,none,false);\narc(562,625,0.56,0.62,s,1.00,1.00,0,none,false);\narc(625,687,0.62,0.69,s,1.00,1.00,0,none,false);\narc(687,750,0.69,0.75,s,1.00,1.00,0,none,false);\narc(750,812,0.75,0.81,s,1.00,1.00,0,none,false);\narc(812,875,0.81,0.88,s,1.00,1.00,0,none,false);\narc(875,937,0.88,0.94,s,1.00,1.00,0,none,false);\narc(937,1000,0.94,1.00,s,1.00,1.00,0,none,false);\n",
    }


def test_arc_split_by_timing():
    response = client.post(
        "/aff/arc/split-by-timing",
        json={
            "arc": "arc(0,1000,0.00,1.00,s,1.00,1.00,0,none,false)[arctap(500)];",
            "timings": "timing(0,222.22,4.00);\ntiming(200,222.22,4.00);\ntiming(400,222.22,4.00);\ntiming(600,222.22,4.00);\ntiming(800,222.22,4.00);",
            "post": {
                "mirror": False,
                "straighten_x": False,
                "straighten_y": False,
                "connector": False,
                "position_filter": "",
            },
        },
    )
    assert response.status_code == 200
    assert response.json() == {
        "code": 0,
        "result": "arc(0,200,0.00,0.20,s,1.00,1.00,0,none,false);\narc(200,400,0.20,0.40,s,1.00,1.00,0,none,false);\narc(400,600,0.40,0.60,s,1.00,1.00,0,none,false);\narc(600,800,0.60,0.80,s,1.00,1.00,0,none,false);\narc(800,1000,0.80,1.00,s,1.00,1.00,0,none,false);\n",
    }


def test_arc_rain():
    response = client.post(
        "/aff/arc/rain",
        json={
            "post": {
                "mirror": False,
                "straighten_x": False,
                "straighten_y": False,
                "connector": False,
                "position_filter": "",
            },
            "params": {
                "mode": "s",
                "dropLength": 2,
                "step": 100,
                "stop": 1000,
                "start": 0,
            },
        },
    )
    assert response.status_code == 200
    json = response.json()
    assert json["code"] == 0
    assert json["result"].splitlines().__len__() == 10


def test_arc_crease_line():
    response = client.post(
        "/aff/arc/crease-line",
        json={
            "post": {
                "mirror": False,
                "straighten_x": False,
                "straighten_y": False,
                "connector": False,
                "position_filter": "",
            },
            "params": {
                "mode": "m",
                "arc_easing": "s",
                "count": 10,
                "delta_y": 0,
                "delta_x": 0.1,
            },
            "arc": "arc(0,1000,0.00,1.00,s,1.00,1.00,0,none,false);",
        },
    )
    assert response.status_code == 200
    assert response.json() == {
        "code": 0,
        "result": "arc(0,100,0.00,0.20,s,1.00,1.00,0,none,false);\narc(100,200,0.20,0.10,s,1.00,1.00,0,none,false);\narc(200,300,0.10,0.40,s,1.00,1.00,0,none,false);\narc(300,400,0.40,0.30,s,1.00,1.00,0,none,false);\narc(400,500,0.30,0.60,s,1.00,1.00,0,none,false);\narc(500,600,0.60,0.50,s,1.00,1.00,0,none,false);\narc(600,700,0.50,0.80,s,1.00,1.00,0,none,false);\narc(700,800,0.80,0.70,s,1.00,1.00,0,none,false);\narc(800,900,0.70,1.00,s,1.00,1.00,0,none,false);\narc(900,1000,1.00,0.90,s,1.00,1.00,0,none,false);\n",
    }


def test_arc_envelope():
    response = client.post(
        "/aff/arc/envelope",
        json={
            "post": {
                "mirror": False,
                "straighten_x": False,
                "straighten_y": False,
                "connector": False,
                "position_filter": "",
            },
            "params": {"count": 10, "mode": "c"},
            "arc2": "arc(0,1000,1.00,0.50,s,1.00,1.00,0,none,false);",
            "arc1": "arc(0,1000,0.00,0.50,s,1.00,1.00,0,none,false);",
        },
    )
    assert response.status_code == 200
    assert response.json() == {
        "code": 0,
        "result": "arc(0,100,0.00,0.95,s,1.00,1.00,0,none,false);\narc(100,200,0.95,0.10,s,1.00,1.00,0,none,false);\narc(200,300,0.10,0.85,s,1.00,1.00,0,none,false);\narc(300,400,0.85,0.20,s,1.00,1.00,0,none,false);\narc(400,500,0.20,0.75,s,1.00,1.00,0,none,false);\narc(500,600,0.75,0.30,s,1.00,1.00,0,none,false);\narc(600,700,0.30,0.65,s,1.00,1.00,0,none,false);\narc(700,800,0.65,0.40,s,1.00,1.00,0,none,false);\narc(800,900,0.40,0.55,s,1.00,1.00,0,none,false);\narc(900,1000,0.55,0.50,s,1.00,1.00,0,none,false);\n",
    }


def test_arc_break():
    response = client.post(
        "/aff/arc/break",
        json={
            "post": {
                "mirror": False,
                "straighten_x": False,
                "straighten_y": False,
                "connector": False,
                "position_filter": "",
            },
            "params": {"disp": 0.1, "breakpoints": [200, 400, 600, 800]},
            "arc": "arc(0,1000,0.00,1.00,s,1.00,1.00,0,none,false)[arctap(500)];",
        },
    )
    assert response.status_code == 200
    assert response.json() == {
        "code": 0,
        "result": "arc(0,200,0.00,0.15,s,1.00,1.00,0,none,false);\narc(200,400,0.25,0.35,s,1.00,1.00,0,none,false);\narc(400,600,0.45,0.55,s,1.00,1.00,0,none,false);\narc(600,800,0.65,0.75,s,1.00,1.00,0,none,false);\narc(800,1000,0.85,1.00,s,1.00,1.00,0,none,false);\n",
    }


def test_arc_animate():
    response = client.post(
        "/aff/arc/animate",
        json={
            "params": {
                "easing_offset_t": "s",
                "easing_y": "s",
                "easing_x": "s",
                "basebpm": 222.22,
                "delta_y": -1,
                "delta_x": -0.5,
                "stop": 1000,
                "start": 0,
            },
            "arc": "arc(0,1,0.50,0.50,s,1.00,1.00,0,none,true)[arctap(0)];",
        },
    )
    assert response.status_code == 200
    assert response.json() == {
        "code": 0,
        "result": "timinggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(0,hidegroup,0.00,0);\n  timing(0,999999.00,4.00);\n  timing(1,0.00,4.00);\n  timing(24,-999999.00,4.00);\n  timing(25,0.00,4.00);\n  scenecontrol(33,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.50,0.50,s,1.00,1.00,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(16,hidegroup,0.00,0);\n  timing(16,999999.00,4.00);\n  timing(17,0.00,4.00);\n  timing(40,-999999.00,4.00);\n  timing(41,0.00,4.00);\n  scenecontrol(50,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.49,0.49,s,0.98,0.98,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(33,hidegroup,0.00,0);\n  timing(33,999999.00,4.00);\n  timing(34,0.00,4.00);\n  timing(57,-999999.00,4.00);\n  timing(58,0.00,4.00);\n  scenecontrol(66,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.48,0.48,s,0.97,0.97,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(50,hidegroup,0.00,0);\n  timing(50,999999.00,4.00);\n  timing(51,0.00,4.00);\n  timing(74,-999999.00,4.00);\n  timing(75,0.00,4.00);\n  scenecontrol(83,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.47,0.47,s,0.95,0.95,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(66,hidegroup,0.00,0);\n  timing(66,999999.00,4.00);\n  timing(67,0.00,4.00);\n  timing(90,-999999.00,4.00);\n  timing(91,0.00,4.00);\n  scenecontrol(100,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.47,0.47,s,0.93,0.93,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(83,hidegroup,0.00,0);\n  timing(83,999999.00,4.00);\n  timing(84,0.00,4.00);\n  timing(107,-999999.00,4.00);\n  timing(108,0.00,4.00);\n  scenecontrol(116,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.46,0.46,s,0.92,0.92,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(100,hidegroup,0.00,0);\n  timing(100,999999.00,4.00);\n  timing(101,0.00,4.00);\n  timing(124,-999999.00,4.00);\n  timing(125,0.00,4.00);\n  scenecontrol(133,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.45,0.45,s,0.90,0.90,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(116,hidegroup,0.00,0);\n  timing(116,999999.00,4.00);\n  timing(117,0.00,4.00);\n  timing(140,-999999.00,4.00);\n  timing(141,0.00,4.00);\n  scenecontrol(150,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.44,0.44,s,0.88,0.88,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(133,hidegroup,0.00,0);\n  timing(133,999999.00,4.00);\n  timing(134,0.00,4.00);\n  timing(157,-999999.00,4.00);\n  timing(158,0.00,4.00);\n  scenecontrol(166,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.43,0.43,s,0.86,0.86,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(150,hidegroup,0.00,0);\n  timing(150,999999.00,4.00);\n  timing(151,0.00,4.00);\n  timing(174,-999999.00,4.00);\n  timing(175,0.00,4.00);\n  scenecontrol(183,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.42,0.42,s,0.85,0.85,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(166,hidegroup,0.00,0);\n  timing(166,999999.00,4.00);\n  timing(167,0.00,4.00);\n  timing(190,-999999.00,4.00);\n  timing(191,0.00,4.00);\n  scenecontrol(200,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.42,0.42,s,0.83,0.83,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(183,hidegroup,0.00,0);\n  timing(183,999999.00,4.00);\n  timing(184,0.00,4.00);\n  timing(207,-999999.00,4.00);\n  timing(208,0.00,4.00);\n  scenecontrol(216,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.41,0.41,s,0.81,0.81,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(200,hidegroup,0.00,0);\n  timing(200,999999.00,4.00);\n  timing(201,0.00,4.00);\n  timing(224,-999999.00,4.00);\n  timing(225,0.00,4.00);\n  scenecontrol(233,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.40,0.40,s,0.80,0.80,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(216,hidegroup,0.00,0);\n  timing(216,999999.00,4.00);\n  timing(217,0.00,4.00);\n  timing(240,-999999.00,4.00);\n  timing(241,0.00,4.00);\n  scenecontrol(250,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.39,0.39,s,0.78,0.78,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(233,hidegroup,0.00,0);\n  timing(233,999999.00,4.00);\n  timing(234,0.00,4.00);\n  timing(257,-999999.00,4.00);\n  timing(258,0.00,4.00);\n  scenecontrol(266,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.38,0.38,s,0.76,0.76,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(250,hidegroup,0.00,0);\n  timing(250,999999.00,4.00);\n  timing(251,0.00,4.00);\n  timing(274,-999999.00,4.00);\n  timing(275,0.00,4.00);\n  scenecontrol(283,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.37,0.37,s,0.75,0.75,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(266,hidegroup,0.00,0);\n  timing(266,999999.00,4.00);\n  timing(267,0.00,4.00);\n  timing(290,-999999.00,4.00);\n  timing(291,0.00,4.00);\n  scenecontrol(300,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.36,0.36,s,0.73,0.73,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(283,hidegroup,0.00,0);\n  timing(283,999999.00,4.00);\n  timing(284,0.00,4.00);\n  timing(307,-999999.00,4.00);\n  timing(308,0.00,4.00);\n  scenecontrol(316,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.36,0.36,s,0.71,0.71,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(300,hidegroup,0.00,0);\n  timing(300,999999.00,4.00);\n  timing(301,0.00,4.00);\n  timing(324,-999999.00,4.00);\n  timing(325,0.00,4.00);\n  scenecontrol(333,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.35,0.35,s,0.69,0.69,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(316,hidegroup,0.00,0);\n  timing(316,999999.00,4.00);\n  timing(317,0.00,4.00);\n  timing(340,-999999.00,4.00);\n  timing(341,0.00,4.00);\n  scenecontrol(350,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.34,0.34,s,0.68,0.68,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(333,hidegroup,0.00,0);\n  timing(333,999999.00,4.00);\n  timing(334,0.00,4.00);\n  timing(357,-999999.00,4.00);\n  timing(358,0.00,4.00);\n  scenecontrol(366,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.33,0.33,s,0.66,0.66,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(350,hidegroup,0.00,0);\n  timing(350,999999.00,4.00);\n  timing(351,0.00,4.00);\n  timing(374,-999999.00,4.00);\n  timing(375,0.00,4.00);\n  scenecontrol(383,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.32,0.32,s,0.64,0.64,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(366,hidegroup,0.00,0);\n  timing(366,999999.00,4.00);\n  timing(367,0.00,4.00);\n  timing(390,-999999.00,4.00);\n  timing(391,0.00,4.00);\n  scenecontrol(400,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.31,0.31,s,0.63,0.63,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(383,hidegroup,0.00,0);\n  timing(383,999999.00,4.00);\n  timing(384,0.00,4.00);\n  timing(407,-999999.00,4.00);\n  timing(408,0.00,4.00);\n  scenecontrol(416,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.31,0.31,s,0.61,0.61,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(400,hidegroup,0.00,0);\n  timing(400,999999.00,4.00);\n  timing(401,0.00,4.00);\n  timing(424,-999999.00,4.00);\n  timing(425,0.00,4.00);\n  scenecontrol(433,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.30,0.30,s,0.59,0.59,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(416,hidegroup,0.00,0);\n  timing(416,999999.00,4.00);\n  timing(417,0.00,4.00);\n  timing(440,-999999.00,4.00);\n  timing(441,0.00,4.00);\n  scenecontrol(450,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.29,0.29,s,0.58,0.58,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(433,hidegroup,0.00,0);\n  timing(433,999999.00,4.00);\n  timing(434,0.00,4.00);\n  timing(457,-999999.00,4.00);\n  timing(458,0.00,4.00);\n  scenecontrol(466,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.28,0.28,s,0.56,0.56,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(450,hidegroup,0.00,0);\n  timing(450,999999.00,4.00);\n  timing(451,0.00,4.00);\n  timing(474,-999999.00,4.00);\n  timing(475,0.00,4.00);\n  scenecontrol(483,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.27,0.27,s,0.54,0.54,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(466,hidegroup,0.00,0);\n  timing(466,999999.00,4.00);\n  timing(467,0.00,4.00);\n  timing(490,-999999.00,4.00);\n  timing(491,0.00,4.00);\n  scenecontrol(500,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.26,0.26,s,0.53,0.53,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(483,hidegroup,0.00,0);\n  timing(483,999999.00,4.00);\n  timing(484,0.00,4.00);\n  timing(507,-999999.00,4.00);\n  timing(508,0.00,4.00);\n  scenecontrol(516,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.25,0.25,s,0.51,0.51,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(500,hidegroup,0.00,0);\n  timing(500,999999.00,4.00);\n  timing(501,0.00,4.00);\n  timing(524,-999999.00,4.00);\n  timing(525,0.00,4.00);\n  scenecontrol(533,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.25,0.25,s,0.49,0.49,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(516,hidegroup,0.00,0);\n  timing(516,999999.00,4.00);\n  timing(517,0.00,4.00);\n  timing(540,-999999.00,4.00);\n  timing(541,0.00,4.00);\n  scenecontrol(550,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.24,0.24,s,0.47,0.47,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(533,hidegroup,0.00,0);\n  timing(533,999999.00,4.00);\n  timing(534,0.00,4.00);\n  timing(557,-999999.00,4.00);\n  timing(558,0.00,4.00);\n  scenecontrol(566,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.23,0.23,s,0.46,0.46,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(550,hidegroup,0.00,0);\n  timing(550,999999.00,4.00);\n  timing(551,0.00,4.00);\n  timing(574,-999999.00,4.00);\n  timing(575,0.00,4.00);\n  scenecontrol(583,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.22,0.22,s,0.44,0.44,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(566,hidegroup,0.00,0);\n  timing(566,999999.00,4.00);\n  timing(567,0.00,4.00);\n  timing(590,-999999.00,4.00);\n  timing(591,0.00,4.00);\n  scenecontrol(600,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.21,0.21,s,0.42,0.42,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(583,hidegroup,0.00,0);\n  timing(583,999999.00,4.00);\n  timing(584,0.00,4.00);\n  timing(607,-999999.00,4.00);\n  timing(608,0.00,4.00);\n  scenecontrol(616,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.20,0.20,s,0.41,0.41,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(600,hidegroup,0.00,0);\n  timing(600,999999.00,4.00);\n  timing(601,0.00,4.00);\n  timing(624,-999999.00,4.00);\n  timing(625,0.00,4.00);\n  scenecontrol(633,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.19,0.19,s,0.39,0.39,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(616,hidegroup,0.00,0);\n  timing(616,999999.00,4.00);\n  timing(617,0.00,4.00);\n  timing(640,-999999.00,4.00);\n  timing(641,0.00,4.00);\n  scenecontrol(650,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.19,0.19,s,0.37,0.37,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(633,hidegroup,0.00,0);\n  timing(633,999999.00,4.00);\n  timing(634,0.00,4.00);\n  timing(657,-999999.00,4.00);\n  timing(658,0.00,4.00);\n  scenecontrol(666,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.18,0.18,s,0.36,0.36,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(650,hidegroup,0.00,0);\n  timing(650,999999.00,4.00);\n  timing(651,0.00,4.00);\n  timing(674,-999999.00,4.00);\n  timing(675,0.00,4.00);\n  scenecontrol(683,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.17,0.17,s,0.34,0.34,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(666,hidegroup,0.00,0);\n  timing(666,999999.00,4.00);\n  timing(667,0.00,4.00);\n  timing(690,-999999.00,4.00);\n  timing(691,0.00,4.00);\n  scenecontrol(700,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.16,0.16,s,0.32,0.32,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(683,hidegroup,0.00,0);\n  timing(683,999999.00,4.00);\n  timing(684,0.00,4.00);\n  timing(707,-999999.00,4.00);\n  timing(708,0.00,4.00);\n  scenecontrol(716,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.15,0.15,s,0.31,0.31,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(700,hidegroup,0.00,0);\n  timing(700,999999.00,4.00);\n  timing(701,0.00,4.00);\n  timing(724,-999999.00,4.00);\n  timing(725,0.00,4.00);\n  scenecontrol(733,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.14,0.14,s,0.29,0.29,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(716,hidegroup,0.00,0);\n  timing(716,999999.00,4.00);\n  timing(717,0.00,4.00);\n  timing(740,-999999.00,4.00);\n  timing(741,0.00,4.00);\n  scenecontrol(750,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.14,0.14,s,0.27,0.27,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(733,hidegroup,0.00,0);\n  timing(733,999999.00,4.00);\n  timing(734,0.00,4.00);\n  timing(757,-999999.00,4.00);\n  timing(758,0.00,4.00);\n  scenecontrol(766,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.13,0.13,s,0.25,0.25,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(750,hidegroup,0.00,0);\n  timing(750,999999.00,4.00);\n  timing(751,0.00,4.00);\n  timing(774,-999999.00,4.00);\n  timing(775,0.00,4.00);\n  scenecontrol(783,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.12,0.12,s,0.24,0.24,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(766,hidegroup,0.00,0);\n  timing(766,999999.00,4.00);\n  timing(767,0.00,4.00);\n  timing(790,-999999.00,4.00);\n  timing(791,0.00,4.00);\n  scenecontrol(800,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.11,0.11,s,0.22,0.22,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(783,hidegroup,0.00,0);\n  timing(783,999999.00,4.00);\n  timing(784,0.00,4.00);\n  timing(807,-999999.00,4.00);\n  timing(808,0.00,4.00);\n  scenecontrol(816,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.10,0.10,s,0.20,0.20,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(800,hidegroup,0.00,0);\n  timing(800,999999.00,4.00);\n  timing(801,0.00,4.00);\n  timing(824,-999999.00,4.00);\n  timing(825,0.00,4.00);\n  scenecontrol(833,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.09,0.09,s,0.19,0.19,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(816,hidegroup,0.00,0);\n  timing(816,999999.00,4.00);\n  timing(817,0.00,4.00);\n  timing(840,-999999.00,4.00);\n  timing(841,0.00,4.00);\n  scenecontrol(850,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.08,0.08,s,0.17,0.17,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(833,hidegroup,0.00,0);\n  timing(833,999999.00,4.00);\n  timing(834,0.00,4.00);\n  timing(857,-999999.00,4.00);\n  timing(858,0.00,4.00);\n  scenecontrol(866,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.08,0.08,s,0.15,0.15,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(850,hidegroup,0.00,0);\n  timing(850,999999.00,4.00);\n  timing(851,0.00,4.00);\n  timing(874,-999999.00,4.00);\n  timing(875,0.00,4.00);\n  scenecontrol(883,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.07,0.07,s,0.14,0.14,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(866,hidegroup,0.00,0);\n  timing(866,999999.00,4.00);\n  timing(867,0.00,4.00);\n  timing(890,-999999.00,4.00);\n  timing(891,0.00,4.00);\n  scenecontrol(900,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.06,0.06,s,0.12,0.12,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(883,hidegroup,0.00,0);\n  timing(883,999999.00,4.00);\n  timing(884,0.00,4.00);\n  timing(907,-999999.00,4.00);\n  timing(908,0.00,4.00);\n  scenecontrol(916,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.05,0.05,s,0.10,0.10,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(900,hidegroup,0.00,0);\n  timing(900,999999.00,4.00);\n  timing(901,0.00,4.00);\n  timing(924,-999999.00,4.00);\n  timing(925,0.00,4.00);\n  scenecontrol(933,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.04,0.04,s,0.08,0.08,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(916,hidegroup,0.00,0);\n  timing(916,999999.00,4.00);\n  timing(917,0.00,4.00);\n  timing(940,-999999.00,4.00);\n  timing(941,0.00,4.00);\n  scenecontrol(950,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.03,0.03,s,0.07,0.07,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(933,hidegroup,0.00,0);\n  timing(933,999999.00,4.00);\n  timing(934,0.00,4.00);\n  timing(957,-999999.00,4.00);\n  timing(958,0.00,4.00);\n  scenecontrol(966,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.03,0.03,s,0.05,0.05,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(950,hidegroup,0.00,0);\n  timing(950,999999.00,4.00);\n  timing(951,0.00,4.00);\n  timing(974,-999999.00,4.00);\n  timing(975,0.00,4.00);\n  scenecontrol(983,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.02,0.02,s,0.03,0.03,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(966,hidegroup,0.00,0);\n  timing(966,999999.00,4.00);\n  timing(967,0.00,4.00);\n  timing(990,-999999.00,4.00);\n  timing(991,0.00,4.00);\n  scenecontrol(1000,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.01,0.01,s,0.02,0.02,0,none,true)[arctap(100001)];\n};\ntiminggroup(noinput){\n  timing(0,222.22,4.00);\n  scenecontrol(0,hidegroup,0.00,1);\n  scenecontrol(983,hidegroup,0.00,0);\n  timing(983,999999.00,4.00);\n  timing(984,0.00,4.00);\n  timing(1007,-999999.00,4.00);\n  timing(1008,0.00,4.00);\n  scenecontrol(1016,hidegroup,0.00,1);\n  timing(100000,999999.00,4.00);\n  timing(100001,222.22,4.00);\n  arc(100001,100002,0.00,0.00,s,0.00,0.00,0,none,true)[arctap(100001)];\n};\n",
    }
