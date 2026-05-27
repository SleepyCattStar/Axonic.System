import psutil
import time


def get_top_processes(limit=10):

    # First sampling
    for proc in psutil.process_iter():
        try:
            proc.cpu_percent(interval=None)
        except:
            pass

    # Small delay
    time.sleep(0.1)

    processes = []

    # Second sampling
    for proc in psutil.process_iter([
        'pid',
        'name',
        'memory_percent'
    ]):
        try:
            process_info = {
                "pid": proc.info["pid"],
                "name": proc.info["name"],
                "cpu_percent": round(proc.cpu_percent(interval=None), 2),
                "memory_percent": round(proc.info["memory_percent"], 2)
            }

            processes.append(process_info)

        except (
            psutil.NoSuchProcess,
            psutil.AccessDenied,
            psutil.ZombieProcess
        ):
            pass

    processes = sorted(
        processes,
        key=lambda x: x["cpu_percent"],
        reverse=True
    )

    return processes[:limit]