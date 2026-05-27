from fastapi import FastAPI
from app.api.routes import system
from app.api.routes import process
from app.api.routes import history
from app.api.routes import system_info
from fastapi.middleware.cors import CORSMiddleware

from app.services.history_service import start_background_collection

app = FastAPI()
start_background_collection()
app.include_router(system.router,prefix = "/api")
app.include_router(process.router,prefix = "/api")
app.include_router(history.router,prefix = "/api")
app.include_router(system_info.router,prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)