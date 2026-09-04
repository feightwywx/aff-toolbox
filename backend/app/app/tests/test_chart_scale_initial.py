"""缩放时，各时间组的初始 Timing/SceneControl 取样回归测试。"""
from fastapi.testclient import TestClient

from ..main import app

client = TestClient(app)


def test_scale_prefers_latest_before_standard():
    response = client.post(
        "/aff/chart/scale",
        json={
            "params": {"standard": 1000, "scale": 2},
            "notes": "timing(1050,180,4);\ntiming(900,120,3);\ntiming(600,100,4);",
        },
    )
    assert response.status_code == 200
    assert response.json() == {
        "code": 0,
        "result": "timing(0,240.00,3.00);\ntiming(1025,360.00,4.00);\n",
    }


def test_scale_positive_fallback_keeps_original():
    response = client.post(
        "/aff/chart/scale",
        json={
            "params": {"standard": 1000, "scale": 2},
            "notes": "timing(1600,180,4);\ntiming(1200,120,3);",
        },
    )
    assert response.status_code == 200
    assert response.json() == {
        "code": 0,
        "result": "timing(0,240.00,3.00);\ntiming(1300,360.00,4.00);\ntiming(1100,240.00,3.00);\n",
    }


def test_scale_samples_exact_standard():
    response = client.post(
        "/aff/chart/scale",
        json={
            "params": {"standard": 1000, "scale": 2},
            "notes": "timing(900,120,4);\ntiming(1000,180,3);\ntiming(1100,200,4);",
        },
    )
    assert response.status_code == 200
    assert response.json() == {
        "code": 0,
        "result": "timing(0,360.00,3.00);\ntiming(1000,360.00,3.00);\ntiming(1050,400.00,4.00);\n",
    }


def test_scale_zero_events_are_not_duplicated_or_moved():
    response = client.post(
        "/aff/chart/scale",
        json={
            "params": {"standard": 1000, "scale": 2},
            "notes": "timing(0,120,3);\nscenecontrol(0,hidegroup,2,1);",
        },
    )
    assert response.status_code == 200
    assert response.json() == {
        "code": 0,
        "result": "timing(0,240.00,3.00);\nscenecontrol(0,hidegroup,2.00,1);\n",
    }


def test_scale_replaces_older_zero_events():
    response = client.post(
        "/aff/chart/scale",
        json={
            "params": {"standard": 1000, "scale": 2},
            "notes": "timing(0,120,4);\ntiming(800,180,3);\nscenecontrol(0,hidegroup,0,0);\nscenecontrol(800,hidegroup,2,1);",
        },
    )
    assert response.status_code == 200
    assert response.json() == {
        "code": 0,
        "result": "timing(0,360.00,3.00);\nscenecontrol(0,hidegroup,2.00,1);\n",
    }


def test_scale_events_before_standard_and_scene_types():
    response = client.post(
        "/aff/chart/scale",
        json={
            "params": {"standard": 1000, "scale": 2},
            "notes": "timing(0,100,4);\ntiming(600,120,3);\ntiming(1200,180,4);\nscenecontrol(200,hidegroup,0,0);\nscenecontrol(800,hidegroup,2,1);\nscenecontrol(1100,trackhide);\nscenecontrol(700,trackshow);\n(900,1);\n(1400,2);",
        },
    )
    assert response.status_code == 200
    assert response.json() == {
        "code": 0,
        "result": "timing(0,240.00,3.00);\nscenecontrol(0,hidegroup,2.00,1);\nscenecontrol(0,trackhide);\nscenecontrol(0,trackshow);\ntiming(1100,360.00,4.00);\nscenecontrol(1050,trackhide);\n(1200,2);\n",
    }


def test_scale_groups_sample_independently():
    response = client.post(
        "/aff/chart/scale",
        json={
            "params": {"standard": 1000, "scale": 2},
            "notes": (
                "AudioOffset:100\n-\ntiming(0,100,4);\ntiming(600,120,3);\nscenecontrol(900,hidegroup,2,1);\n"
                "timinggroup(noinput){\ntiming(0,60,4);\ntiming(800,90,4);\nscenecontrol(900,hidegroup,1,0);\n(950,1);\n};\n"
                "timinggroup(anglex200){\ntiming(0,100,3);\ntiming(1200,150,3);\nscenecontrol(1400,hidegroup,3,1);\n};\n"
                "timinggroup(){\ntiming(0,80,4);\n(990,1);\n};\n(970,1);"
            ),
        },
    )
    assert response.status_code == 200
    assert response.json() == {
        "code": 0,
        "result": (
            "AudioOffset:550\n-\ntiming(0,240.00,3.00);\nscenecontrol(0,hidegroup,2.00,1);\n"
            "timinggroup(noinput){\n  timing(0,180.00,4.00);\n  scenecontrol(0,hidegroup,1.00,0);\n};\n"
            "timinggroup(anglex200){\n  timing(0,200.00,3.00);\n  scenecontrol(0,hidegroup,3.00,1);\n  timing(1100,300.00,3.00);\n  scenecontrol(1200,hidegroup,3.00,1);\n};\n"
            "timinggroup(){\n  timing(0,160.00,4.00);\n};\n"
        ),
    }


def test_scale_does_not_create_missing_initial_events():
    response = client.post(
        "/aff/chart/scale",
        json={
            "params": {"standard": 1000, "scale": 2},
            "notes": "(600,1);\n(1200,2);\nhold(800,1400,3);",
        },
    )
    assert response.status_code == 200
    assert response.json() == {"code": 0, "result": "(1100,2);\n"}


def test_scale_group_keeps_initial_timing_when_other_events_filtered():
    response = client.post(
        "/aff/chart/scale",
        json={
            "params": {"standard": 1000, "scale": 2},
            "notes": "(100,1);\ntiminggroup(noinput){\ntiming(0,120,4);\n(600,2);\n};",
        },
    )
    assert response.status_code == 200
    assert response.json() == {
        "code": 0,
        "result": "timinggroup(noinput){\n  timing(0,240.00,4.00);\n};\n",
    }
