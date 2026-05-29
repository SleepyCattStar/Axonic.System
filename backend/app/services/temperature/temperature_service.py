import psutil


def get_cpu_temperature():

    try:

        temps = psutil.sensors_temperatures()

        if not temps:
            return None

        # common linux sensor labels
        preferred_keys = [
            "coretemp",
            "k10temp",
            "cpu_thermal"
        ]

        for key in preferred_keys:

            if key in temps:

                entries = temps[key]

                if entries:

                    return round(
                        entries[0].current,
                        1
                    )

        # fallback
        for _, entries in temps.items():

            if entries:

                return round(
                    entries[0].current,
                    1
                )

        return None

    except Exception:

        return None


def get_thermal_status(temp):

    if temp is None:
        return "unknown"

    if temp < 60:
        return "cool"

    if temp < 80:
        return "normal"

    if temp < 90:
        return "hot"

    return "critical"

def get_ssd_temperature():

    try:

        temps = psutil.sensors_temperatures()

        if not temps:
            return None

        for key, entries in temps.items():

            key_lower = key.lower()

            if "nvme" in key_lower:

                for entry in entries:

                    if entry.current:

                        return round(
                            entry.current,
                            1
                        )

        return None

    except Exception:

        return None