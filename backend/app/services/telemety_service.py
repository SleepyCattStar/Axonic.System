import psutil as ps

import time


previous_net = ps.net_io_counters()
previous_time = time.time()

def bytes_to_mb(bytes_value):
    return round(bytes_value / (1024 ** 2), 2)

def get_system_stats():
    cpu_usage = ps.cpu_percent(interval = 0.2)
    
    ram = ps.virtual_memory()
    disk = ps.disk_usage('/')


    #network part here
    global previous_net
    global previous_time
    current_net = ps.net_io_counters()
    current_time = time.time()

    time_diff = current_time - previous_time

    upload_speed = (
        current_net.bytes_sent - previous_net.bytes_sent
    ) / time_diff

    download_speed = (
        current_net.bytes_recv - previous_net.bytes_recv
    ) / time_diff

    previous_net = current_net
    previous_time = current_time


    return {
        "cpu_usage": cpu_usage,
        "ram_usage": ram.percent,
        "total_ram": round(ram.total / (1024**3) , 2),
        "available_ram": round(ram.available / (1024**3),2),
        "disk_usage": disk.percent,
        "total_disk": round(disk.total/(1024**3),2),
        "free_disk": round(disk.free/ (1024**3),2),
        "upload_speed_mb": bytes_to_mb(upload_speed),

        "download_speed_mb": bytes_to_mb(download_speed),
        "total_uploaded_gb": round(
            current_net.bytes_sent / (1024**3), 2
        ),
        "total_downloaded_gb": round(
            current_net.bytes_recv / (1024**3), 2
        )
    }