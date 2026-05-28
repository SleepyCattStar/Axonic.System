from app.db.database import SessionLocal
from app.db.models import SystemMetrics

from datetime import timezone,datetime,timedelta 


def get_daily_average():

    db = SessionLocal()

    last_24h = datetime.now(timezone.utc) - timedelta(days=1)

    data = db.query(SystemMetrics).filter(SystemMetrics.timestamp >= last_24h).all()

    if not data: return {}

    cpu_avg = sum(d.cpu for d in data) / len(data)
    ram_avg = sum(r.ram for r in data)/ len(data)

    return {
        "cpu_avg": cpu_avg,
        "ram_avg": ram_avg,
        "samples" : len(data)
    }


def get_weekly_average():

    db = SessionLocal()

    last_7d = datetime.now(timezone.utc) - timedelta(days=7)

    data = db.query(SystemMetrics).filter(
        SystemMetrics.timestamp >= last_7d
    ).all()

    if not data:
        return {}

    cpu_avg = sum(d.cpu for d in data) / len(data)
    ram_avg = sum(d.ram for d in data) / len(data)

    return {
        "cpu_avg": cpu_avg,
        "ram_avg": ram_avg
    }