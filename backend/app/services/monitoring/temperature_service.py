import psutil


def get_cpu_temperature():

    try:

        temps = psutil.sensors_temperatures()

        if not temps:
            return None

        for name in temps:

            entries = temps[name]

            if entries:
                return entries[0].current

        return None

    except Exception as e:

        print(f"[TEMP ERROR] {e}")
        return None