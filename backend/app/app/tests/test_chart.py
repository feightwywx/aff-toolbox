from fastapi.testclient import TestClient

from ..main import app

client = TestClient(app)


def test_offset():
    response = client.post(
        "/aff/chart/offset",
        json={
            "params": {"allowMinusTimingNote": False, "offset": 1000},
            "notes": "(0,1);",
        },
    )
    assert response.status_code == 200
    assert response.json() == {"code": 0, "result": "(1000,1);\n"}


def test_align():
    response = client.post(
        "/aff/chart/align",
        json={"params": {"lcd": 96, "error": 0, "bpm": 222.22}, "notes": "(1, 2);"},
    )
    assert response.status_code == 200
    assert response.json() == {"code": 0, "result": "(1,2);\n"}


def test_mirror():
    response = client.post("/aff/chart/mirror", json={"notes": "(0, 1);"})
    assert response.status_code == 200
    assert response.json() == {"code": 0, "result": "(0,4);\n"}


def test_scale():
    response = client.post(
        "/aff/chart/scale", json={"params": {"scale": 1.1}, "notes": "(100,1);"}
    )
    assert response.status_code == 200
    assert response.json() == {"code": 0, "result": "(90,1);\n"}
