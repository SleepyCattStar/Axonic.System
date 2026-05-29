import { useEffect, useState } from "react";

import {
    X,
    Save,
    Bell,
    Cpu,
    MemoryStick,
    Thermometer,
    Webhook
} from "lucide-react";

import {
    fetchConfig,
    updateConfig
} from "../../api/telemetryApi";

function SettingsModal({

    open,
    onClose

}) {

    const [config, setConfig] =
        useState(null);

    const [saving, setSaving] =
        useState(false);

    // LOAD CONFIG
    useEffect(() => {

        if (!open) return;

        const loadConfig = async () => {

            try {

                const data =
                    await fetchConfig();

                setConfig(data);

            } catch (err) {

                console.error(err);
            }
        };

        loadConfig();

    }, [open]);

    // UPDATE FIELD
    const updateField = (key, value) => {

        setConfig(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // SAVE CONFIG
    const handleSave = async () => {

        try {

            setSaving(true);

            await updateConfig(config);

            onClose();

        } catch (err) {

            console.error(err);

        } finally {

            setSaving(false);
        }
    };

    if (!open) return null;

    return (

        <div className="
            fixed inset-0
            bg-black/70
            backdrop-blur-sm
            flex
            items-center
            justify-center
            z-50
        ">

            {/* MODAL */}
            <div className="
                w-[650px]
                max-h-[85vh]
                overflow-y-auto
                bg-[#0b0b0b]
                border border-[#1a1a1a]
                rounded-3xl
                p-6
                space-y-6
                shadow-2xl
            ">

                {/* HEADER */}
                <div className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-[#1a1a1a]
                    pb-4
                ">

                    <div>

                        <h1 className="
                            text-2xl
                            font-bold
                        ">
                            Settings
                        </h1>

                        <p className="
                            text-sm
                            text-gray-500
                            mt-1
                        ">
                            Configure monitoring alerts
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="
                            text-gray-500
                            hover:text-white
                            transition-all
                        "
                    >

                        <X size={22} />

                    </button>

                </div>

                {/* CONTENT */}
                {!config ? (

                    <div className="
                        flex
                        items-center
                        justify-center
                        py-20
                        text-gray-500
                    ">
                        Loading settings...
                    </div>

                ) : (

                    <div className="space-y-6">

                        {/* ALERT TOGGLE */}
                        <div className="
                            bg-[#101010]
                            border border-[#1a1a1a]
                            rounded-2xl
                            p-5
                            flex
                            items-center
                            justify-between
                        ">

                            <div className="
                                flex
                                items-center
                                gap-3
                            ">

                                <Bell className="text-cyan-400" />

                                <div>

                                    <h2 className="font-semibold">
                                        Alerts Enabled
                                    </h2>

                                    <p className="
                                        text-sm
                                        text-gray-500
                                    ">
                                        Enable system monitoring alerts
                                    </p>

                                </div>

                            </div>

                            <input
                                type="checkbox"
                                checked={config.alerts_enabled}
                                onChange={(e) =>
                                    updateField(
                                        "alerts_enabled",
                                        e.target.checked
                                    )
                                }
                                className="
                                    w-5
                                    h-5
                                "
                            />

                        </div>

                        {/* CPU LIMIT */}
                        <SettingInput
                            icon={<Cpu />}
                            title="CPU Threshold"
                            subtitle="Alert when CPU exceeds this percentage"
                            value={config.cpu_limit}
                            onChange={(v) =>
                                updateField("cpu_limit", Number(v))
                            }
                        />

                        {/* RAM LIMIT */}
                        <SettingInput
                            icon={<MemoryStick />}
                            title="RAM Threshold"
                            subtitle="Alert when RAM exceeds this percentage"
                            value={config.ram_limit}
                            onChange={(v) =>
                                updateField("ram_limit", Number(v))
                            }
                        />

                        {/* TEMP LIMIT */}
                        <SettingInput
                            icon={<Thermometer />}
                            title="Temperature Threshold"
                            subtitle="Alert when temperature exceeds limit"
                            value={config.temperature_limit}
                            onChange={(v) =>
                                updateField(
                                    "temperature_limit",
                                    Number(v)
                                )
                            }
                        />

                        {/* WEBHOOK */}
                        <div className="
                            bg-[#101010]
                            border border-[#1a1a1a]
                            rounded-2xl
                            p-5
                            space-y-3
                        ">

                            <div className="
                                flex
                                items-center
                                gap-3
                            ">

                                <Webhook
                                    className="
                                        text-cyan-400
                                    "
                                />

                                <div>

                                    <h2 className="font-semibold">
                                        Discord Webhook
                                    </h2>

                                    <p className="
                                        text-sm
                                        text-gray-500
                                    ">
                                        Send alerts to Discord
                                    </p>

                                </div>

                            </div>

                            <input
                                type="text"
                                value={config.discord_webhook}
                                onChange={(e) =>
                                    updateField(
                                        "discord_webhook",
                                        e.target.value
                                    )
                                }
                                placeholder="https://discord.com/api/webhooks/..."
                                className="
                                    w-full
                                    bg-[#0b0b0b]
                                    border border-[#1f1f1f]
                                    rounded-xl
                                    px-4
                                    py-3
                                    outline-none
                                    focus:border-cyan-400/40
                                "
                            />

                        </div>

                        {/* SAVE */}
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="
                                w-full
                                flex
                                items-center
                                justify-center
                                gap-2
                                bg-cyan-500
                                hover:bg-cyan-400
                                text-black
                                font-semibold
                                py-3
                                rounded-2xl
                                transition-all
                            "
                        >

                            <Save size={18} />

                            {
                                saving
                                ? "Saving..."
                                : "Save Settings"
                            }

                        </button>

                    </div>
                )}

            </div>

        </div>
    );
}


// REUSABLE INPUT CARD
function SettingInput({

    icon,
    title,
    subtitle,
    value,
    onChange

}) {

    return (

        <div className="
            bg-[#101010]
            border border-[#1a1a1a]
            rounded-2xl
            p-5
            flex
            items-center
            justify-between
            gap-6
        ">

            <div className="
                flex
                items-center
                gap-3
            ">

                <div className="text-cyan-400">
                    {icon}
                </div>

                <div>

                    <h2 className="font-semibold">
                        {title}
                    </h2>

                    <p className="
                        text-sm
                        text-gray-500
                    ">
                        {subtitle}
                    </p>

                </div>

            </div>

            <input
                type="number"
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                className="
                    w-28
                    bg-[#0b0b0b]
                    border border-[#1f1f1f]
                    rounded-xl
                    px-3
                    py-2
                    text-right
                    outline-none
                    focus:border-cyan-400/40
                "
            />

        </div>
    );
}

export default SettingsModal;