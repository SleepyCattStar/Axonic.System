import axios from "axios";
import { X, Search } from "lucide-react";
import { useState } from "react";

function TopProcesses({ processes, refresh }) {

    //states
    const [query, setQuery] = useState("");
    const [holding, setHolding] = useState(false);
    const [toast, setToast] = useState(null);
    const [confirm, setConfirm] = useState(null); // stores process



    //checking for sensitive/system processes
    const isSystemProcess = (name) => {

        const systemKeywords = [
            "system",
            "kernel",
            "gnome",
            "kworker",
            "init",
            "dbus"
        ];

        {isSystemProcess(p.name) && (
            <span className="text-xs text-yellow-400 ml-2">
                ⚠ system
            </span>
        )}

        return systemKeywords.some((k) =>
            name.toLowerCase().includes(k)
        );
    };

    const killProcess = async (pid) => {

        try {

            await axios.delete(
                `http://127.0.0.1:8000/api/process/${pid}`
            );

            setToast({
                type: "success",
                msg: "Process killed successfully"
            });

            refresh();

        } catch (err) {

            setToast({
                type: "error",
                msg: "Failed to kill process"
            });

            console.error(err);
        }

        setTimeout(() => setToast(null), 2000);
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
            <div className="space-y-1.5">

                {filtered.length === 0 ? (

                    <p className="
                        text-gray-500
                        text-sm
                        text-center
                        py-4
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
                                p-2
                                rounded-lg
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

                                <button
                                    onClick={() => setConfirm(p)}
                                    className="
                                        text-yellow-400
                                        hover:text-yellow-300
                                    "
                                >
                                    ⚠
                                </button>

                            </div>

                        </div>

                    ))
                )}

            </div>
                
                {confirm && (
                    <div className="
                        fixed inset-0
                        bg-black/70
                        flex items-center justify-center
                        z-50
                    ">

                        <div className="
                            bg-[#0d0d0d]
                            border border-[#1a1a1a]
                            p-6 rounded-2xl
                            w-[320px]
                            text-center
                        ">

                            <h2 className="text-lg font-semibold mb-2">
                                Kill Process?
                            </h2>

                            <p className="text-gray-400 text-sm mb-6">
                                {confirm.name} (PID: {confirm.pid})
                            </p>

                            <div className="flex justify-center gap-4">

                                <button
                                    onClick={() => {
                                        killProcess(confirm.pid);
                                        setConfirm(null);
                                    }}
                                    className="
                                        bg-red-500/20
                                        text-red-400
                                        px-4 py-2
                                        rounded-lg
                                        hover:bg-red-500/30
                                    "
                                >
                                    ✔ Kill
                                </button>

                                <button
                                    onClick={() => setConfirm(null)}
                                    className="
                                        bg-gray-700/30
                                        text-gray-300
                                        px-4 py-2
                                        rounded-lg
                                        hover:bg-gray-700/50
                                    "
                                >
                                    ✖ Cancel
                                </button>

                            </div>

                        </div>

                    </div>
                )}

                {toast && (
                    <div className={`
                        fixed bottom-5 right-5
                        px-4 py-3
                        rounded-xl
                        text-sm
                        z-50
                        bg-[#0d0d0d]
                        border border-[#1a1a1a]
                        ${toast.type === "success"
                            ? "text-green-400"
                            : "text-red-400"}
                    `}>
                        {toast.msg}
                    </div>
                )}

        </div>

        
    );
}



export default TopProcesses;