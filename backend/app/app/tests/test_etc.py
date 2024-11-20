from fastapi.testclient import TestClient

from ..main import app

client = TestClient(app)


def test_sc_blink():
    response = client.post(
        "/aff/etc/sc-blink", json={"params": {"count": 10, "stop": 1000, "start": 0}}
    )
    assert response.status_code == 200
    assert response.json() == {
        "code": 0,
        "result": "scenecontrol(0,hidegroup,0.00,1);\nscenecontrol(50,hidegroup,0.00,0);\nscenecontrol(100,hidegroup,0.00,1);\nscenecontrol(150,hidegroup,0.00,0);\nscenecontrol(200,hidegroup,0.00,1);\nscenecontrol(250,hidegroup,0.00,0);\nscenecontrol(300,hidegroup,0.00,1);\nscenecontrol(350,hidegroup,0.00,0);\nscenecontrol(400,hidegroup,0.00,1);\nscenecontrol(450,hidegroup,0.00,0);\nscenecontrol(500,hidegroup,0.00,1);\nscenecontrol(550,hidegroup,0.00,0);\nscenecontrol(600,hidegroup,0.00,1);\nscenecontrol(650,hidegroup,0.00,0);\nscenecontrol(700,hidegroup,0.00,1);\nscenecontrol(750,hidegroup,0.00,0);\nscenecontrol(800,hidegroup,0.00,1);\nscenecontrol(850,hidegroup,0.00,0);\nscenecontrol(900,hidegroup,0.00,1);\nscenecontrol(950,hidegroup,0.00,0);\n",
    }
