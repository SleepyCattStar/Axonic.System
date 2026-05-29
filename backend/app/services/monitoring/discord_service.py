import requests
from app.services.alert_history_service import store_alert

def send_discord_alert(webhook_url,message):

    if not webhook_url:
        return
    
    payload = {
        "content" : message
    }

    try:
        requests.post(
        webhook_url,
        json = payload,
        timeout= 5
        )
        store_alert(
            alert_type="CPU",
            message="CPU exceeded threshold",
            severity="HIGH",
            success=True
        )

    except Exception as e:
        print(f"[DISCORD-ERROR] {e}")
        store_alert(
            alert_type="CPU",
            message="Discord webhook failed",
            severity="HIGH",
            success=False
        )

# Handling alerts here
