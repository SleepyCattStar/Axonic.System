import axios from "axios";
import { X, Search } from "lucide-react";
import { useState } from "react";

function TopProcesses({ processes, refresh }) {

    const [query, setQuery] = useState("");

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

    const filtered = processes
        .slice(0, 5)
        .filter((p) =>
            p.name
                .toLowerCase()
                .includes(query.toLowerCase())
        );

    const highlightText = (text) => {

        if (!query) return text;

        const parts = text.split(
            new RegExp(`(${query})`, "gi")
        );

        return parts.map((part, i) =>
            part.toLowerCase() ===
            query.toLowerCase() ? (
                <span
                    key={i}
                    className="text-cyan-400 font-bold"
                >
                    {part}
                </span>
            ) : (
                part
            )
        );
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

            {/* Header */}
            <h2 className="
                text-xl
                font-semibold
                mb-4
            ">
                Top Processes
            </h2>

            {/* Search Bar */}
            <div className="
                flex
                items-center
                gap-2
                mb-4
                bg-[#0d0d0d]
                border
                border-[#1a1a1a]
                px-3
                py-2
                rounded-xl
            ">

                <Search size={16} className="text-gray-500" />

                <input
                    type="text"
                    placeholder="Search process..."
                    value={query}
                    onChange={(e) =>
                        setQuery(e.target.value)
                    }
                    className="
                        bg-transparent
                        outline-none
                        text-white
                        w-full
                    "
                />

            </div>

            {/* Process List */}
            <div className="space-y-3">

                {filtered.length === 0 ? (

                    <p className="
                        text-gray-500
                        text-sm
                        text-center
                        py-6
                    ">
                        No processes found
                    </p>

                ) : (

                    filtered.map((p) => (

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
                                transition-all
                            "
                        >

                            <div>

                                <p className="font-medium">
                                    {highlightText(p.name)}
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
                                    onClick={() =>
                                        killProcess(p.pid)
                                    }
                                    className="
                                        text-red-400
                                        hover:text-red-300
                                    "
                                >
                                    <X size={18} />
                                </button>

                            </div>

                        </div>

                    ))
                )}

            </div>

        </div>
    );
}

export default TopProcesses;