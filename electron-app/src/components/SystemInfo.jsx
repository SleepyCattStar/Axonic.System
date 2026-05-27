// src/components/SystemInfo.jsx


import {
    Monitor,
    Cpu,
    Clock3,
    Thermometer
} from "lucide-react";


// icons from luicide.

function SystemInfo({
    systemInfo
}) {

    if (!systemInfo) {

        return null;
    }

    return (

        <div className="
            bg-[#080808]
            border
            border-[#171717]
            rounded-2xl
            p-6
            mt-6
        ">

            <h2 className="
                text-2xl
                font-semibold
                mb-6
            ">
                System Information
            </h2>

            <div className="
                grid
                grid-cols-2
                gap-5
            ">

                <InfoCard
                    icon={<Monitor />}
                    label="Operating System"
                    value={`${systemInfo.os}
                    ${systemInfo.release}`}
                />

                <InfoCard
                    icon={<Cpu />}
                    label="CPU Cores"
                    value={systemInfo.cpu_cores}
                />

                <InfoCard
                    icon={<Clock3 />}
                    label="Session Time"
                    value={systemInfo.uptime}
                />

                <InfoCard
                    icon={<Thermometer />}
                    label="CPU Temperature"
                    value={systemInfo.temperature}
                />

            </div>

        </div>
    );
}

function InfoCard({
    icon,
    label,
    value
}) {

    return (

        <div className="
            bg-[#0d0d0d]
            border
            border-[#1a1a1a]
            rounded-xl
            p-5
            flex
            items-center
            gap-4
            hover:border-cyan-400/20
            transition-all
        ">

            <div className="
                text-cyan-400
            ">
                {icon}
            </div>

            <div>

                <p className="
                    text-sm
                    text-gray-500
                ">
                    {label}
                </p>

                <h3 className="
                    text-lg
                    font-semibold
                ">
                    {value}
                </h3>

            </div>

        </div>
    );
}

export default SystemInfo;