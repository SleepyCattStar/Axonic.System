import {
    FaChrome,
    FaPython,
    FaMemory,
    FaCode,
    FaLinux
} from "react-icons/fa";

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
            bg-[#090909]
            border
            border-[#171717]
            rounded-2xl
            p-0.3
            flex
            items-center
            justify-between
            transition-all
            duration-300
            hover:border-cyan-400/20
            hover:bg-[#0d0d0d]
            hover:shadow-[0_0_25px_rgba(34,211,238,0.08)]
        ">

            <div className="
                flex
                items-center
                gap-4
            ">

                <div className="
                    w-14
                    h-14
                    rounded-xl
                    bg-[#141414]
                    flex
                    items-center
                    justify-center
                    text-2xl
                ">

                    {getProcessIcon(proc.name)}

                </div>

                <div>

                    <h2 className="
                        text-lg
                        font-semibold
                    ">
                        {proc.name}
                    </h2>

                    <p className="
                        text-sm
                        text-gray-500
                    ">
                        PID: {proc.pid}
                    </p>

                </div>

            </div>

            <div className="
                flex
                gap-10
            ">

                <div>

                    <p className="
                        text-xs
                        uppercase
                        text-gray-500
                    ">
                        CPU
                    </p>

                    <p className="
                        text-orange-400
                        font-semibold
                        text-lg
                    ">
                        {proc.cpu_percent}%
                    </p>

                </div>

                <div>

                    <p className="
                        text-xs
                        uppercase
                        text-gray-500
                    ">
                        RAM
                    </p>

                    <p className="
                        text-cyan-400
                        font-semibold
                        text-lg
                    ">
                        {proc.memory_percent}%
                    </p>

                </div>

            </div>

        </div>
    );
}

export default ProcessRow;