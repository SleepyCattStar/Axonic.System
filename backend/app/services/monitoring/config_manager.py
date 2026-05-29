import json
from pathlib import Path

CONFIG_PATH = Path("config/alerts.json")

def load_config():  
    try:
        with open(CONFIG_PATH,"r") as file:
            return json.load(file)
    except Exception as e:
        print(f"[CONFIG-ERROR] {e}")

        return {
            "alerts_enabled": False
        }

def save_config(data):
    try:
        with open(CONFIG_PATH, "w") as file:
            json.dump(data,file,indent=4)
    except Exception as e:
        print(f"[CONFIG-ERROR] {e}")