from fastapi import APIRouter

from app.services.analytics_service import get_daily_average, get_weekly_average


router = APIRouter()

@router.get("/analytics/daily")
def daily_analytics():
    return get_daily_average()

@router.get("/analytics/weekly")
def weekly_analytics():
    return get_weekly_average()