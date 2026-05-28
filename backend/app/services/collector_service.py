import psutil as ps 
import time
from app.db.database import SessionLocal
from app.db.models import SystemMetrics

def collect_metrics():

    db = SessionLocal()

    while True:
        cpu = ps.cpu_percent(interval= 1)
        ram = ps.virtual_memory().percent
        disk = ps.disk_usage('/').percent
        net = ps.net_io_counters()

        entry = SystemMetrics(
            cpu = cpu,
            ram = ram,
            disk = disk,
            upload = net.bytes_sent,
            download = net.bytes_recv
        )

        db.add(entry)
        db.commit()

        time.sleep(5)