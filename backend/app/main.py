from fastapi import FastAPI
from app.api.routes import system
from app.api.routes import process
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(system.router,prefix = "/api")
app.include_router(process.router,prefix = "/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)