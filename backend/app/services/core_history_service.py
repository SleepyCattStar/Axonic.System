import psutil as ps
import threading
import time

_core_history = {}

MAX_POINTS = 30


def collect_core_history():

    global _core_history

    while True:

        try:
            usages = ps.cpu_percent(
                percpu=True
            )

            for i, usage in enumerate(usages):
                core_name = f"Core {i}"
                if core_name not in _core_history:

                    _core_history[core_name] = []

                _core_history[core_name].append(
                    round(usage, 1)
                )

                # keep only last N points
                if len(_core_history[core_name]) > MAX_POINTS:

                    _core_history[core_name].pop(0)

            time.sleep(2)

        except Exception as e:

            print(
                "Core history error:",
                e
            )


def start_core_history_collection():

    threading.Thread(
        target=collect_core_history,
        daemon=True
    ).start()


def core_history():

    return _core_history