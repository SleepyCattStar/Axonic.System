from app.db.database import Base
from datetime import datetime,timezone
from sqlalchemy import Float, Integer, Column, DateTime

class SystemMetrics(Base):
    __tablename__ = "system_metrics"

    # Creating columns

    id = Column(Integer, primary_key = True, index = True)
    imestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    cpu = Column(Float)
    ram = Column(Float)
    disk = Column(Float)

    upload = Column(Float)
    download = Column(Float)
