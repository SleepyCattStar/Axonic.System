import time
import psutil

from app.services.monitoring.config_manager import load_config

from app.services.monitoring.temperature_service import (
    get_cpu_temperature
)

from app.services.monitoring.alert_rules import (
    check_cpu,
    check_ram,
    check_temperature
)

from app.services.monitoring.discord_service import (
    send_discord_alert
)

from app.services.monitoring.state_manager import (
    can_send_alert
)


def start_alert_daemon():

    print("[MONITOR] Alert daemon started")

    while True:

        try:

            config = load_config()

            if not config.get("alerts_enabled", False):

                time.sleep(5)
                continue

            cpu = psutil.cpu_percent()

            ram = psutil.virtual_memory().percent

            temp = get_cpu_temperature()

            cooldown = config.get(
                "alert_cooldown",
                300
            )

            webhook = config.get(
                "discord_webhook",
                ""
            )

            # CPU ALERT
            if check_cpu(cpu, config["cpu_limit"]):

                if can_send_alert("cpu", cooldown):

                    send_discord_alert(
                        webhook,
                        f"CPU usage high: {cpu}%"
                    )

            # RAM ALERT
            if check_ram(ram, config["ram_limit"]):

                if can_send_alert("ram", cooldown):

                    send_discord_alert(
                        webhook,
                        f"RAM usage high: {ram}%"
                    )

            # TEMP ALERT
            if check_temperature(
                temp,
                config["temperature_limit"]
            ):

                if can_send_alert("temp", cooldown):

                    send_discord_alert(
                        webhook,
                        f"CPU temperature high: {temp}°C"
                    )

            time.sleep(
                config.get("check_interval", 5)
            )

        except Exception as e:

            print(f"[ALERT DAEMON ERROR] {e}")

            time.sleep(5)