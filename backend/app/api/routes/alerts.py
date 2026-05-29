from fastapi import APIRouter

from app.db.database import SessionLocal
from app.db.models import AlertHistory

router = APIRouter()

@router.get("/alerts")
def get_alerts():

    db = SessionLocal()

    alerts = db.query(AlertHistory)\
        .order_by(AlertHistory.timestamp.desc())\
        .limit(50)\
        .all()

    result = []

    for a in alerts:

        result.append({

            "id": a.id,
            "timestamp": a.timestamp,
            "type": a.alert_type,
            "message": a.message,
            "severity": a.severity,
            "success": a.success
        })

    return result