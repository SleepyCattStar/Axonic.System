import psutil as ps 
import time
from app.db.database import SessionLocal
from app.db.models import SystemMetrics
from app.services.temperature.temperature_service import (
    get_cpu_temperature,
    get_ssd_temperature
)

def collect_metrics():

    db = SessionLocal()

    while True:
        cpu = ps.cpu_percent(interval= 1)
        ram = ps.virtual_memory().percent
        disk = ps.disk_usage('/').percent
        net = ps.net_io_counters()
        cpu_temp = get_cpu_temperature()

        ssd_temp = get_ssd_temperature()

        entry = SystemMetrics(
            cpu = cpu,
            ram = ram,
            disk = disk,
            upload = net.bytes_sent,
            download = net.bytes_recv,
            cpu_temp = cpu_temp,
            ssd_temp = ssd_temp
        )

        db.add(entry)
        db.commit()

        time.sleep(5)