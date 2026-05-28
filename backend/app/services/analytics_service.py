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

def get_daily_history():

    db = SessionLocal()
    last_24h = (
        datetime.now(timezone.utc)
        - timedelta(days=1)
    )
    data = (
        db.query(SystemMetrics)
        .filter(
            SystemMetrics.timestamp >= last_24h
        )
        .order_by(SystemMetrics.timestamp.asc())
        .all()
    )

    return [

        {
            "timestamp":
                d.timestamp.strftime("%H:%M"),

            "cpu":
                round(d.cpu, 2),

            "ram":
                round(d.ram, 2)
        }

        for d in data
    ]

def get_weekly_history():

    db = SessionLocal()

    last_7d = (
        datetime.now(timezone.utc)
        - timedelta(days=7)
    )

    data = (
        db.query(SystemMetrics)
        .filter(
            SystemMetrics.timestamp >= last_7d
        )
        .order_by(SystemMetrics.timestamp.asc())
        .all()
    )

    if not data:
        return []

    sampled = data[::50]

    return [

        {
            "timestamp":
                d.timestamp.strftime("%a %H:%M"),

            "cpu":
                round(d.cpu, 2),

            "ram":
                round(d.ram, 2)
        }

        for d in sampled
    ]