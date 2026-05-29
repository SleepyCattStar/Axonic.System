import requests

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
    except Exception as e:
        print(f"[DISCORD-ERROR] {e}")