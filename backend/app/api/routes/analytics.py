from fastapi import APIRouter

from app.services.analytics_service import get_daily_average, get_weekly_average,get_daily_history,get_weekly_history, get_process_load_distribution


router = APIRouter()

@router.get("/analytics/daily")
def daily_analytics():
    return get_daily_average()

@router.get("/analytics/weekly")
def weekly_analytics():
    return get_weekly_average()

@router.get("/analytics/history/daily")
def history_daily_analytics():
    return get_daily_history()

@router.get("/analytics/history/weekly")
def history_weekly_analytics():
    return get_weekly_history()

@router.get("/analytics/process-load")
def process_load_analytics():
    return get_process_load_distribution()
