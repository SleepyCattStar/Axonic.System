import psutil as ps
import time 
import platform
import socket
import getpass


def get_uptime():
    boot_time = ps.boot_time()

    uptime_seconds = (
        time.time() - boot_time
    )

    hours = int(
        uptime_seconds // 3600
    )

    minutes = int(
        (uptime_seconds % 3600) // 60
    )

    return f"{hours}h {minutes}m"


def get_cpu_temp():
    try:
        temps = ps.sensors_temperatures()
        if not temps:
            return "Unavailable"

        for name, entries in temps.items():
            if entries:
                return (
                    f"{entries[0].current}°C"
                )
    except:
        return "Unavailable"

    return "Unavailable"


def get_system_info():
    return {

        "os":
            platform.system(),

        "release":
            platform.release(),

        "hostname":
            socket.gethostname(),

        "architecture":
            platform.machine(),

        "cpu_cores":
            ps.cpu_count(),

        "uptime":
            get_uptime(),

        "temperature":
            get_cpu_temp(),
        
        "username":getpass.getuser(),
    }



# get_system_info()
# get_cpu_temp()
# get_uptime()