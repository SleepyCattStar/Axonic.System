import {
    FaChrome,
    FaPython,
    FaMemory,
    FaCode,
    FaLinux
} from "react-icons/fa";

import { killProcess } from "../api/telemetryApi";

function getProcessIcon(name) {

    const process = name.toLowerCase();

    if (process.includes("chrome")) {
        return <FaChrome className="text-yellow-400" />;
    }

    if (process.includes("python")) {
        return <FaPython className="text-blue-400" />;
    }

    if (process.includes("code")) {
        return <FaCode className="text-cyan-400" />;
    }

    if (process.includes("gnome")) {
        return <FaLinux className="text-orange-400" />;
    }

    return <FaMemory className="text-gray-400" />;
}

function ProcessRow({ proc }) {

    return (

        <div className="
            flex
            items-center
            justify-between
            px-5
            py-4
            mb-3
            rounded-xl
            border
            border-[#2a2f3a]
            bg-[#151922]
            hover:border-cyan-400
            hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]
            hover:bg-[#1a202c]
            transition-all
            duration-200
        ">

            <div className="
                flex
                items-center
                gap-4
            ">

                <div className="
                    text-2xl
                    bg-[#222833]
                    p-3
                    rounded-lg
                ">
                    {getProcessIcon(proc.name)}
                </div>

                <div>

                    <h3 className="
                        font-semibold
                        text-white
                    ">
                        {proc.name}
                    </h3>

                    <p className="
                        text-sm
                        text-gray-400
                    ">
                        PID: {proc.pid}
                    </p>

                </div>

            </div>

            <div className="
                flex
                gap-8
                text-sm
            ">

                <div>

                    <p className="text-gray-400">
                        CPU
                    </p>

                    <p className="
                        text-orange-400
                        font-semibold
                    ">
                        {proc.cpu_percent}%
                    </p>

                </div>

                <div>

                    <p className="text-gray-400">
                        RAM
                    </p>

                    <p className="
                        text-cyan-400
                        font-semibold
                    ">
                        {proc.memory_percent}%
                    </p>

                </div>

            </div>

        </div>
    );
}

export default ProcessRow;