from fastapi import FastAPI
from app.api.routes import system
from app.api.routes import process
from app.api.routes import history
from app.api.routes import system_info
from app.api.routes import analytics
from fastapi.middleware.cors import CORSMiddleware

from app.services.history_service import start_background_collection

from app.db.database import Base,engine
from app.db import models

from app.services.collector_service import collect_metrics
import threading 

Base.metadata.create_all(bind=engine)  # creating the table
app = FastAPI()
start_background_collection()
app.include_router(system.router,prefix = "/api")
app.include_router(process.router,prefix = "/api")
app.include_router(history.router,prefix = "/api")
app.include_router(system_info.router,prefix="/api")
app.include_router(analytics.router,prefix= "/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

threading.Thread(
    target=collect_metrics,
    daemon=True
).start()