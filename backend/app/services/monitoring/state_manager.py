import time

last_alert_times = {}


def can_send_alert(alert_type, cooldown):

    now = time.time()

    last_time = last_alert_times.get(alert_type, 0)

    if now - last_time >= cooldown:

        last_alert_times[alert_type] = now

        return True

    return False