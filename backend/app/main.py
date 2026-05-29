from fastapi import FastAPI
# All API routes here
from app.api.routes import system
from app.api.routes import process
from app.api.routes import history
from app.api.routes import system_info
from app.api.routes import analytics
from app.api.routes import config
from app.api.routes import alerts
from fastapi.middleware.cors import CORSMiddleware


#services
from app.services.history_service import start_background_collection
from app.services.core_history_service import start_core_history_collection
from app.services.monitoring.alert_daemon import start_alert_daemon

from app.db.database import Base,engine
from app.db import models

from app.services.collector_service import collect_metrics
import threading 

Base.metadata.create_all(bind=engine)  # creating the table   # create all will create all the tables from models.py
app = FastAPI()

# calling the services to run in background
start_background_collection()
start_core_history_collection()

app.include_router(system.router,prefix = "/api")
app.include_router(process.router,prefix = "/api")
app.include_router(history.router,prefix = "/api")
app.include_router(system_info.router,prefix="/api")
app.include_router(analytics.router,prefix= "/api")
app.include_router(config.router,prefix ="/api")
app.include_router(alerts.router,prefix = "/api")

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

threading.Thread(
    target=start_alert_daemon,
    daemon=True
).start()