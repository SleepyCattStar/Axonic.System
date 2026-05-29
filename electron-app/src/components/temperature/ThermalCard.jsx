import {
    Thermometer,
    AlertTriangle
} from "lucide-react";

function ThermalCard({ temperature }) {

    if (!temperature) {

        return (

            <div className="
                bg-[#080808]
                border border-[#171717]
                rounded-2xl
                p-6
            ">
                Loading temperature...
            </div>
        );
    }

    const temp =
        temperature.cpu_temp;

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

    return (

        <div className="
            bg-[#080808]
            border border-[#171717]
            rounded-2xl
            p-6
            space-y-5
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
                        Thermal Status
                    </h2>

                    <p className="
                        text-sm
                        text-gray-500
                    ">
                        Real-time CPU temperature
                    </p>

                </div>

                <Thermometer
                    size={28}
                    className="text-orange-400"
                />

            </div>

            {/* TEMP */}
            <div className="
                flex items-end gap-3
            ">

                <div className="
                    text-5xl
                    font-bold
                    text-white
                ">

                    {
                        temp !== null
                        ? `${temp}°C`
                        : "--"
                    }

                </div>

                <div className={`
                    text-sm
                    font-medium
                    mb-1
                    ${getStatusColor()}
                `}>

                    {status.toUpperCase()}

                </div>

            </div>

            {/* WARNING */}
            {
                status === "hot" ||
                status === "critical"
            ? (

                <div className="
                    flex items-center gap-2
                    bg-red-500/10
                    border border-red-500/20
                    rounded-xl
                    px-4 py-3
                    text-red-300
                    text-sm
                ">

                    <AlertTriangle size={18} />

                    <span>

                        High CPU temperature detected

                    </span>

                </div>

            ) : null
            }

        </div>
    );
}

export default ThermalCard;