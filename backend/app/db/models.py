from app.db.database import Base
from datetime import datetime,timezone
from sqlalchemy import Float, Integer, Column, DateTime, String, Boolean

class SystemMetrics(Base):
    __tablename__ = "system_metrics"

    # Creating columns

    id = Column(Integer, primary_key = True, index = True)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    cpu = Column(Float)
    ram = Column(Float)
    disk = Column(Float)

    upload = Column(Float)
    download = Column(Float)
    cpu_temp = Column(Float, nullable=True)
    ssd_temp = Column(Float, nullable=True)


class AlertHistory(Base):

    __tablename__ = "alert_history"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    timestamp = Column(
        DateTime,
        default=lambda:
            datetime.now(timezone.utc)
    )

    alert_type = Column(String)

    message = Column(String)

    severity = Column(String)

    success = Column(Boolean)