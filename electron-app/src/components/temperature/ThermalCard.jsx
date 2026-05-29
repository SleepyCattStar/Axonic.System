import React from "react";
import {
    Thermometer,
    HardDrive,
    Cpu,
    AlertTriangle
} from "lucide-react";

const ThermalCard = React.memo(function ThermalCard({ temperature }) {

    if (!temperature) {

        return (

            <div className="
                bg-[#080808]
                border border-[#171717]
                rounded-2xl
                p-6
            ">
                Loading thermal data...
            </div>
        );
    }

    const cpuTemp =
        temperature.cpu_temp;

    const ssdTemp =
        temperature.ssd_temp;

    const status =
        temperature.thermal_status;

    const getStatusColor = () => {

        if (status === "cool")
            return "text-cyan-400";

        if (status === "normal")
            return "text-green-400";

        if (status === "hot")
            return "text-yellow-400";

        if (status === "critical")
            return "text-red-400";

        return "text-gray-400";
    };

    const getTempColor = (temp) => {

        if (temp === null)
            return "text-gray-500";

        if (temp < 60)
            return "text-cyan-400";

        if (temp < 80)
            return "text-green-400";

        if (temp < 90)
            return "text-yellow-400";

        return "text-red-400";
    };

    return (

        <div className="
            bg-[#080808]
            border border-[#171717]
            rounded-2xl
            p-6
            space-y-6
        ">

            {/* HEADER */}
            <div className="
                flex items-center justify-between
            ">

                <div>

                    <h2 className="
                        text-lg
                        font-semibold
                        text-white
                    ">
                        Thermal Monitor
                    </h2>

                    <p className="
                        text-sm
                        text-gray-500
                    ">
                        Live hardware temperatures
                    </p>

                </div>

                <Thermometer
                    size={30}
                    className="text-orange-400"
                />

            </div>

            {/* TEMPERATURE GRID */}
            <div className="
                grid grid-cols-2 gap-4
            ">

                {/* CPU */}
                <div className="
                    bg-[#0d0d0d]
                    border border-[#1a1a1a]
                    rounded-xl
                    p-4
                    space-y-2
                ">

                    <div className="
                        flex items-center gap-2
                        text-gray-400 text-sm
                    ">

                        <Cpu size={16} />

                        CPU

                    </div>

                    <div className={`
                        text-3xl
                        font-bold
                        ${getTempColor(cpuTemp)}
                    `}>

                        {
                            cpuTemp !== null
                            ? `${cpuTemp}°C`
                            : "--"
                        }

                    </div>

                </div>

                {/* SSD */}
                <div className="
                    bg-[#0d0d0d]
                    border border-[#1a1a1a]
                    rounded-xl
                    p-4
                    space-y-2
                ">

                    <div className="
                        flex items-center gap-2
                        text-gray-400 text-sm
                    ">

                        <HardDrive size={16} />

                        SSD

                    </div>

                    <div className={`
                        text-3xl
                        font-bold
                        ${getTempColor(ssdTemp)}
                    `}>

                        {
                            ssdTemp !== null
                            ? `${ssdTemp}°C`
                            : "--"
                        }

                    </div>

                </div>

            </div>

            {/* STATUS */}
            <div className="
                flex items-center justify-between
                bg-[#0d0d0d]
                border border-[#1a1a1a]
                rounded-xl
                px-4 py-3
            ">

                <span className="
                    text-sm
                    text-gray-400
                ">
                    Thermal Status
                </span>

                <span className={`
                    text-sm
                    font-semibold
                    ${getStatusColor()}
                `}>

                    {status.toUpperCase()}

                </span>

            </div>

            {/* WARNING */}
            {
                status === "hot" ||
                status === "critical"
            ? (

                <div className="
                    flex items-center gap-3
                    bg-red-500/10
                    border border-red-500/20
                    rounded-xl
                    px-4 py-3
                    text-red-300
                    text-sm
                ">

                    <AlertTriangle size={18} />

                    <span>

                        High system temperature detected

                    </span>

                </div>

            ) : null
            }

        </div>
    );
});

export default ThermalCard;