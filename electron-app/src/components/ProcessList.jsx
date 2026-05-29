import { useEffect, useState, useMemo, useCallback } from "react";

import { Search } from "lucide-react";

import ProcessGroup from "./ProcessGroup";
import CoreMiniGraphs from "./CoreMiniGraphs";

import {
    fetchCoreHistory
} from "../api/telemetryApi";

function ProcessList({ processes }) {

    // search
    const [query, setQuery] = useState("");

    // sorting
    const [sortKey, setSortKey] =
        useState("cpu");

    const [sortOrder, setSortOrder] =
        useState("desc");

    // cpu core history
    const [coreHistory, setCoreHistory] =
        useState({});

    // -------------------------
    // CORE HISTORY FETCH
    // -------------------------
    useEffect(() => {

        const loadCoreHistory = async () => {

            try {

                const data =
                    await fetchCoreHistory();

                setCoreHistory(data);

            } catch (err) {

                console.error(err);
            }
        };

        loadCoreHistory();

        const interval =
            setInterval(loadCoreHistory, 5000);

        return () =>
            clearInterval(interval);

    }, []);

    // -------------------------
    // SORT TOGGLE
    // -------------------------
    const toggleSort = useCallback((key) => {

        if (sortKey === key) {

            setSortOrder(prev =>
                prev === "asc"
                    ? "desc"
                    : "asc"
            );

        } else {

            setSortKey(key);

            setSortOrder("desc");
        }

    }, [sortKey]);

    // -------------------------
    // PROCESS GROUPING
    // -------------------------
    const groups = useMemo(() => {

        const grouped = processes.reduce(
            (acc, p) => {

                const name = p.name;

                if (!acc[name]) {

                    acc[name] = {

                        name,

                        processes: [],

                        total_cpu: 0,

                        total_ram: 0
                    };
                }

                acc[name].processes.push(p);

                acc[name].total_cpu +=
                    p.cpu_percent;

                acc[name].total_ram +=
                    p.memory_percent;

                return acc;

            }, {}
        );

        let result =
            Object.values(grouped);

        // search filter
        result = result.filter(group =>
            group.name
                .toLowerCase()
                .includes(
                    query.toLowerCase()
                )
        );

        // sorting
        result.sort((a, b) => {

            let A, B;

            if (sortKey === "name") {

                A = a.name.toLowerCase();
                B = b.name.toLowerCase();
            }

            if (sortKey === "cpu") {

                A = a.total_cpu;
                B = b.total_cpu;
            }

            if (sortKey === "ram") {

                A = a.total_ram;
                B = b.total_ram;
            }

            return sortOrder === "asc"
                ? (A > B ? 1 : -1)
                : (A < B ? 1 : -1);
        });

        // LIMIT RENDER COUNT
        return result.slice(0, 80);

    }, [
        processes,
        query,
        sortKey,
        sortOrder
    ]);

    return (

        <div className="
            h-full
            overflow-y-auto
            pr-2
        ">

            <div className="
                bg-[#080808]
                border border-[#171717]
                rounded-2xl
                p-4
                min-h-full
                flex flex-col
            ">

                {/* CORE MINI GRAPHS */}
                <CoreMiniGraphs
                    data={coreHistory}
                />

                {/* SEARCH */}
                <div className="
                    flex items-center gap-2
                    mb-4
                    mt-2
                    bg-[#0d0d0d]
                    border border-[#1a1a1a]
                    px-3 py-2 rounded-xl
                ">

                    <Search
                        size={16}
                        className="text-gray-500"
                    />

                    <input
                        value={query}
                        onChange={(e) =>
                            setQuery(e.target.value)
                        }
                        placeholder="Search process groups..."
                        className="
                            bg-transparent
                            w-full
                            outline-none
                            text-white
                        "
                    />

                </div>

                {/* TABLE HEADER */}
                <div className="
                    grid grid-cols-12
                    text-xs text-gray-400
                    px-3 py-2
                    border-b border-[#1a1a1a]
                    mb-2
                ">

                    {/* NAME */}
                    <div
                        className="
                            col-span-5
                            cursor-pointer
                            flex items-center gap-1
                        "
                        onClick={() =>
                            toggleSort("name")
                        }
                    >

                        Process

                        {
                            sortKey === "name" &&
                            (
                                sortOrder === "asc"
                                    ? "▲"
                                    : "▼"
                            )
                        }

                    </div>

                    {/* CPU */}
                    <div
                        className="
                            col-span-3
                            text-right
                            cursor-pointer
                        "
                        onClick={() =>
                            toggleSort("cpu")
                        }
                    >

                        CPU

                        {
                            sortKey === "cpu" &&
                            (
                                sortOrder === "asc"
                                    ? "▲"
                                    : "▼"
                            )
                        }

                    </div>

                    {/* RAM */}
                    <div
                        className="
                            col-span-3
                            text-right
                            cursor-pointer
                        "
                        onClick={() =>
                            toggleSort("ram")
                        }
                    >

                        RAM

                        {
                            sortKey === "ram" &&
                            (
                                sortOrder === "asc"
                                    ? "▲"
                                    : "▼"
                            )
                        }

                    </div>

                    <div className="col-span-1"></div>

                </div>

                {/* PROCESS GROUPS */}
                <div className="
                    flex-1
                    overflow-y-auto
                    pr-2
                    space-y-2
                ">

                    {
                        groups.length === 0 ? (

                            <div className="
                                text-gray-500
                                text-sm
                                text-center
                                mt-10
                            ">

                                No processes found

                            </div>

                        ) : (

                            groups.map(group => (

                                <ProcessGroup
                                    key={group.name}
                                    group={group}
                                />

                            ))
                        )
                    }

                </div>

            </div>

        </div>
    );
}

export default ProcessList;