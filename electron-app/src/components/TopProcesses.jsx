import axios from "axios";
import { X } from "lucide-react";

function TopProcesses({ processes, refresh }) {

    const top5 = processes
        .slice(0, 5);

    const killProcess = async (pid) => {

        try {

            await axios.delete(
                `http://127.0.0.1:8000/api/process/${pid}`
            );

            refresh();

        } catch (err) {

            console.error(err);
        }
    };

    return (

        <div className="
            bg-[#080808]
            border
            border-[#171717]
            rounded-2xl
            p-5
            mt-6
        ">

            <h2 className="
                text-xl
                font-semibold
                mb-4
            ">
                Top Processes
            </h2>

            <div className="space-y-3">

                {top5.map((p) => (

                    <div
                        key={p.pid}
                        className="
                            flex
                            items-center
                            justify-between
                            bg-[#0d0d0d]
                            border
                            border-[#1a1a1a]
                            p-3
                            rounded-xl
                            hover:border-cyan-400/20
                        "
                    >

                        <div>

                            <p className="font-medium">
                                {p.name}
                            </p>

                            <p className="text-xs text-gray-500">
                                PID: {p.pid}
                            </p>

                        </div>

                        <div className="flex items-center gap-4">

                            <div className="text-sm text-orange-400">
                                {p.cpu_percent}%
                            </div>

                            <button
                                onClick={() => killProcess(p.pid)}
                                className="
                                    text-red-400
                                    hover:text-red-300
                                "
                            >
                                <X size={18} />
                            </button>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default TopProcesses;