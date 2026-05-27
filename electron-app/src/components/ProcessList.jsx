import { useState } from "react";
import { Search } from "lucide-react";
import ProcessRow from "./ProcessRow";

function ProcessList({ processes }) {

    const [query, setQuery] = useState("");
    const [sortKey, setSortKey] = useState("cpu");
    const [sortOrder, setSortOrder] = useState("desc");

    const toggleSort = (key) => {

        if (sortKey === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortOrder("desc");
        }
    };

    const sorted = processes
        .filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase())
        )
        .sort((a, b) => {

            let A, B;

            if (sortKey === "name") {
                A = a.name.toLowerCase();
                B = b.name.toLowerCase();
            }

            if (sortKey === "cpu") {
                A = a.cpu_percent;
                B = b.cpu_percent;
            }

            if (sortKey === "ram") {
                A = a.memory_percent;
                B = b.memory_percent;
            }

            return sortOrder === "asc"
                ? (A > B ? 1 : -1)
                : (A < B ? 1 : -1);
        });

    return (

        <div className="
            bg-[#080808]
            border border-[#171717]
            rounded-2xl
            p-4
            h-[75vh]
            flex flex-col
        ">

            {/* SEARCH */}
            <div className="
                flex items-center gap-2
                mb-4
                bg-[#0d0d0d]
                border border-[#1a1a1a]
                px-3 py-2 rounded-xl
            ">
                <Search size={16} className="text-gray-500" />

                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search process..."
                    className="bg-transparent w-full outline-none text-white"
                />
            </div>

            {/* HEADER */}
            <div className="
                grid grid-cols-12
                text-xs text-gray-400
                px-3 py-2
                border-b border-[#1a1a1a]
                mb-2
            ">

                {/* NAME */}
                <div
                    className="col-span-5 flex items-center gap-1 cursor-pointer"
                    onClick={() => toggleSort("name")}
                >
                    Name
                    {sortKey === "name" &&
                        (sortOrder === "asc" ? "▲" : "▼")}
                </div>

                {/* CPU */}
                <div
                    className="col-span-2 text-right cursor-pointer"
                    onClick={() => toggleSort("cpu")}
                >
                    CPU {sortKey === "cpu" &&
                        (sortOrder === "asc" ? "▲" : "▼")}
                </div>

                {/* RAM */}
                <div
                    className="col-span-2 text-right cursor-pointer"
                    onClick={() => toggleSort("ram")}
                >
                    RAM {sortKey === "ram" &&
                        (sortOrder === "asc" ? "▲" : "▼")}
                </div>

                {/* ACTION */}
                <div className="col-span-3 text-right">
                    Action
                </div>

            </div>

            {/* ROWS */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-2">

                {sorted.map(proc => (
                    <ProcessRow key={proc.pid} proc={proc} />
                ))}

            </div>

        </div>
    );
}

export default ProcessList;