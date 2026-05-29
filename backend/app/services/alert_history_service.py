from app.db.database import SessionLocal
from app.db.models import AlertHistory


def store_alert(
    alert_type,
    message,
    severity="MEDIUM",
    success=True
):

    db = SessionLocal()

    try:

        alert = AlertHistory(
            alert_type=alert_type,
            message=message,
            severity=severity,
            success=success
        )
        db.add(alert)
        db.commit()

    finally:
        db.close()