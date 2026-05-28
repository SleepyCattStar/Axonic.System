from app.db.database import SessionLocal
from app.db.models import SystemMetrics

from datetime import timezone,datetime,timedelta 
import psutil as ps
from collections import defaultdict

BROWSER_KEYWORDS = [
    "chrome", "chromium", "brave", "firefox", "edge", 
    "safari", "opera", "vivaldi", "tor", "waterfox", 
    "librewolf", "midori", "falkon", "epiphany", "yandex", 
    "arc", "zen"
]

CODING_KEYWORDS = [
    "code", "vscode", "cursor", "pycharm", "intellij", 
    "webstorm", "clion", "rubymine", "vim", "nvim", 
    "neovim", "emacs", "nano", "sublime", "zed",
    "python", "python3", "node", "java", "ruby", 
    "php", "perl", "rustc", "cargo", "go", "golang", 
    "lua", "zig", "dotnet", "antigravity",
    "gcc", "g++", "clang", "make", "cmake", "ninja",
    "pip", "npm", "yarn", "pnpm", "conda",
    "git", "svn", "gh"
]

SYSTEM_KEYWORDS = [
    "system", "systemd", "init", "kworker", "kthreadd", 
    "rcu", "dbus", "dbus-daemon",
    "gnome", "gnome-shell", "xorg", "wayland", "x11", 
    "kde", "plasma", "kwin", "mutter", "xfce", 
    "sddm", "gdm", "lightdm",
    "sshd", "cron", "crond", "syslog", "rsyslog", 
    "journald", "udev", "networkmanager", "wpa_supplicant", 
    "polkit", "acpid", "cupsd", "bluetoothd",
    "pipewire", "pulseaudio", "wireplumber",
    "htop", "top", "ps", "btop", "nvtop"
]

MEDIA_KEYWORDS = [
    "spotify", "rhythmbox", "clementine", "audacity", 
    "mpd", "ncmpcpp", "apple music",
    "vlc", "obs", "obs-studio", "mpv", "mplayer", 
    "kodi", "plex", "ffmpeg",
    "discord", "slack", "zoom", "teams", "skype", "telegram",
    "gimp", "inkscape", "blender", "kdenlive", "figma"
]

TERMINAL_KEYWORDS = [
    "bash", "zsh", "fish", "dash", "csh", "tcsh", 
    "powershell", "pwsh", "sh",
    "kitty", "gnome-terminal", "alacritty", "wezterm", 
    "konsole", "xterm", "rxvt", "urxvt", "terminator", 
    "st", "ghostty",
    "tmux", "screen", "zellij"
]

GAMING_KEYWORDS = [
    "steam", "lutris", "wine", "proton", "retroarch", 
    "minecraft", "csgo", "dota2", "epicgames", "heroic"
]

OFFICE_KEYWORDS = [
    "libreoffice", "soffice", "obsidian", "notion", 
    "thunderbird", "evince", "okular", "word", "excel", 
    "powerpoint", "acrobat"
]

CONTAINER_KEYWORDS = [
    "docker", "dockerd", "containerd", "podman", 
    "kubectl", "minikube", "k8s"
]

def get_daily_average():

    db = SessionLocal()

    last_24h = datetime.now(timezone.utc) - timedelta(days=1)

    data = db.query(SystemMetrics).filter(SystemMetrics.timestamp >= last_24h).all()

    if not data: return {}

    cpu_avg = sum(d.cpu for d in data) / len(data)
    ram_avg = sum(r.ram for r in data)/ len(data)

    return {
        "cpu_avg": cpu_avg,
        "ram_avg": ram_avg,
        "samples" : len(data)
    }


def get_weekly_average():

    db = SessionLocal()
    last_7d = datetime.now(timezone.utc) - timedelta(days=7)
    data = db.query(SystemMetrics).filter(
        SystemMetrics.timestamp >= last_7d
    ).all()

    if not data:
        return {}

    cpu_avg = sum(d.cpu for d in data) / len(data)
    ram_avg = sum(d.ram for d in data) / len(data)

    return {
        "cpu_avg": cpu_avg,
        "ram_avg": ram_avg
    }

def get_daily_history():

    db = SessionLocal()
    last_24h = (
        datetime.now(timezone.utc)
        - timedelta(days=1)
    )
    data = (
        db.query(SystemMetrics)
        .filter(
            SystemMetrics.timestamp >= last_24h
        )
        .order_by(SystemMetrics.timestamp.asc())
        .all()
    )

    return [

        {
            "timestamp":
                d.timestamp.strftime("%H:%M"),

            "cpu":
                round(d.cpu, 2),

            "ram":
                round(d.ram, 2)
        }

        for d in data
    ]

def get_weekly_history():

    db = SessionLocal()

    last_7d = (
        datetime.now(timezone.utc)
        - timedelta(days=7)
    )

    data = (
        db.query(SystemMetrics)
        .filter(
            SystemMetrics.timestamp >= last_7d
        )
        .order_by(SystemMetrics.timestamp.asc())
        .all()
    )

    if not data:
        return []

    sampled = data[::50]

    return [

        {
            "timestamp":
                d.timestamp.strftime("%a %H:%M"),

            "cpu":
                round(d.cpu, 2),

            "ram":
                round(d.ram, 2)
        }

        for d in sampled
    ]

def get_process_load_distribution():

    categories = defaultdict(float)

    try:

        for proc in ps.process_iter([

            "name",
            "memory_percent"

        ]):

            try:

                name = (
                    proc.info["name"] or ""
                ).lower()

                ram = (
                    proc.info["memory_percent"] or 0
                )

                # Browsers
                if any(
                    k in name
                    for k in BROWSER_KEYWORDS
                ):

                    categories["Browsing"] += ram

                # Coding / Development
                elif any(
                    k in name
                    for k in CODING_KEYWORDS
                ):

                    categories["Coding"] += ram

                # Containers / Virtualization
                elif any(
                    k in name
                    for k in CONTAINER_KEYWORDS
                ):

                    categories["Containers"] += ram

                # Office / Productivity
                elif any(
                    k in name
                    for k in OFFICE_KEYWORDS
                ):

                    categories["Office"] += ram

                # Media / Communication
                elif any(
                    k in name
                    for k in MEDIA_KEYWORDS
                ):

                    categories["Media"] += ram

                # Gaming
                elif any(
                    k in name
                    for k in GAMING_KEYWORDS
                ):

                    categories["Gaming"] += ram

                # Terminal / Shells
                elif any(
                    k in name
                    for k in TERMINAL_KEYWORDS
                ):

                    categories["Terminal"] += ram

                # System processes
                elif any(
                    k in name
                    for k in SYSTEM_KEYWORDS
                ):

                    categories["System"] += ram

                # Everything else
                else:

                    categories["Misc"] += ram

            except:

                continue
        cleaned = [

            {
                "name": k,
                "value": round(v, 2)
            }

            for k, v in categories.items()

            if v > 0.1
        ]

        cleaned.sort(
            key=lambda x: x["value"],
            reverse=True
        )

        return cleaned

    except Exception as e:

        return {
            "error": str(e)
        }