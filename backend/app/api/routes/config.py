from fastapi import APIRouter

from app.services.monitoring.config_manager import load_config,save_config

router = APIRouter()

@router.get("/config")
def get_config():
    return load_config()

@router.put("/config")
def update_config(data: dict):
    current_config = load_config()

    current_config.update(data)

    save_config(current_config)

    return {
        "message": "Config updated successfully",
        "config": current_config
    }