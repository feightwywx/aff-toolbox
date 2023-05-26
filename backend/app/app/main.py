from app.exception import NotAnArcError
from app.model.common import CommonResponse
from app.utils.response import make_fail_resp, make_success_resp
from app.router.aff import aff_router
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from arcfutil import exception as aex

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


@app.exception_handler(aex.AffNoteValueError)
async def aff_note_val_err_hadler(
    req: Request, e: aex.AffNoteTypeError
) -> JSONResponse:
    return JSONResponse(make_fail_resp("invalid note args" + str(e)).dict())


@app.exception_handler(NotAnArcError)
async def not_an_arc_hadler(req: Request, e: NotAnArcError) -> JSONResponse:
    return JSONResponse(make_fail_resp(str(e)).dict())


@app.exception_handler(Exception)
async def any_err_hadler(req: Request, e: Exception) -> JSONResponse:
    return JSONResponse(make_fail_resp("unknown error: " + str(e)).dict())


app.include_router(aff_router)
