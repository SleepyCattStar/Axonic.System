import psutil
import time
import os
import signal

def get_top_processes(limit=30):

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

def kill_process(pid: int):

    try:
        os.kill(pid, signal.SIGTERM)
        process = psutil.Process(pid)
        process.kill()
        return {"status": "killed", "pid": pid}

    except Exception as e:
        return {"status": "error", "message": str(e)}