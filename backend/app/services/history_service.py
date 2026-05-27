import threading 
import time

from app.services.telemety_service import get_system_stats

history_buffer = {
    "cpu": [],
    "ram": [],
    "disk": [],
    "network_download": [],
    "network_upload": []
}

MAX_HISTORY = 60

def add_data_point(key, value):

    history_buffer[key].append({

        "timestamp": time.time(),
        "value": value
    })

    if len(history_buffer[key]) > MAX_HISTORY:

        history_buffer[key].pop(0)


def collect_telemetry():

    while True:

        stats = get_system_stats()

        add_data_point(
            "cpu",
            stats["cpu_usage"]
        )

        add_data_point(
            "ram",
            stats["ram_usage"]
        )

        add_data_point(
            "disk",
            stats["disk_usage"]
        )

        add_data_point(
            "network_download",
            stats["download_speed_mb"]
        )

        add_data_point(
            "network_upload",
            stats["upload_speed_mb"]
        )

        time.sleep(1)


def start_background_collection():

    thread = threading.Thread(
        target=collect_telemetry,
        daemon=True
    )

    thread.start()


def get_history():
    return history_buffer