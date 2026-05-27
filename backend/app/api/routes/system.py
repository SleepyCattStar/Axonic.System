from fastapi import APIRouter
from app.services.telemety_service import get_system_stats

router = APIRouter()

@router.get("/system-stats")
def system_stats():
    return get_system_stats()