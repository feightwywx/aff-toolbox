from app.model.common import CommonResponse, StatusCode
from app.utils.response import make_fail_resp, make_success_resp
from app.router.aff import aff_router
from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AFF Toolbox API",
    version="2.0.0",
    contact={
        "name": ".direwolf",
        "email": "canis@direcore.xyz",
    },
    license_info={
        "name": "MIT",
        "url": "https://mit-license.org/",
    },
)

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root() -> CommonResponse:
    return make_success_resp("VVelcome! OpenAPI Docs: /docs")

app.include_router(aff_router)
