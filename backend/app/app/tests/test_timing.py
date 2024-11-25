from fastapi.testclient import TestClient

from ..main import app

client = TestClient(app)


def test_easing():
    response = client.post(
        "/aff/timing/easing",
        json={
            "params": {
                "easing": "s",
                "count": 10,
                "stop_bpm": 222.22,
                "start_bpm": 0,
                "stop": 1000,
                "start": 0,
            }
        },
    )
    assert response.status_code == 200
    assert response.json() == {
        "code": 0,
        "result": "timing(0,0.00,4.00);\ntiming(100,22.22,4.00);\ntiming(200,44.44,4.00);\ntiming(300,66.67,4.00);\ntiming(400,88.89,4.00);\ntiming(500,111.11,4.00);\ntiming(600,133.33,4.00);\ntiming(700,155.55,4.00);\ntiming(800,177.78,4.00);\ntiming(900,200.00,4.00);\ntiming(1000,222.22,4.00);\n",
    }


def test_glitch():
    response = client.post(
        "/aff/timing/glitch",
        json={"params": {"bpm_range": 222.22, "count": 10, "stop": 1000, "start": 0}},
    )
    assert response.status_code == 200
    assert response.json() == {
        "code": 0,
        "result": "timing(0,222.22,4.00);\ntiming(1,0.00,4.00);\ntiming(111,-222.22,4.00);\ntiming(112,0.00,4.00);\ntiming(222,222.22,4.00);\ntiming(223,0.00,4.00);\ntiming(333,-222.22,4.00);\ntiming(334,0.00,4.00);\ntiming(444,222.22,4.00);\ntiming(445,0.00,4.00);\ntiming(555,-222.22,4.00);\ntiming(556,0.00,4.00);\ntiming(666,222.22,4.00);\ntiming(667,0.00,4.00);\ntiming(777,-222.22,4.00);\ntiming(778,0.00,4.00);\ntiming(888,222.22,4.00);\ntiming(889,0.00,4.00);\ntiming(999,-222.22,4.00);\ntiming(1000,0.00,4.00);\n",
    }


def test_easing_disp():
    response = client.post(
        "/aff/timing/easing-disp",
        json={
            "params": {
                "easing": "ease_in_sine",
                "count": 10,
                "basebpm": 222.22,
                "stop": 1000,
                "start": 0,
            }
        },
    )
    assert response.status_code == 200
    assert response.json() == {
        "code": 0,
        "result": "timing(0,0.00,4.00);\ntiming(100,53.09,4.00);\ntiming(200,115.85,4.00);\ntiming(300,167.52,4.00);\ntiming(400,209.92,4.00);\ntiming(500,245.41,4.00);\ntiming(600,275.70,4.00);\ntiming(700,302.00,4.00);\ntiming(800,325.14,4.00);\ntiming(900,345.76,4.00);\ntiming(1000,666.66,4.00);\n",
    }
