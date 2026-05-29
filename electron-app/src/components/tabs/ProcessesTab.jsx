import { memo, useCallback, useMemo, useState } from "react";
import { Search } from "lucide-react";

import { useMediumTelemetry } from "../../context/TelemetryContext";
import ProcessGroup from "../ProcessGroup";
import CoreMiniGraphs from "../CoreMiniGraphs";

const ProcessesTab = memo(function ProcessesTab() {

    // 🟡 MEDIUM only — no fast/slow needed
    const { processes, coreHistory } = useMediumTelemetry();

    const [query,     setQuery]     = useState("");
    const [sortKey,   setSortKey]   = useState("cpu");
    const [sortOrder, setSortOrder] = useState("desc");

    const handleQueryChange = useCallback(
        (e) => setQuery(e.target.value),
        []
    );

    const groups = useMemo(() => {

        const grouped = processes.reduce((acc, p) => {
            if (!acc[p.name]) {
                acc[p.name] = { name: p.name, processes: [], total_cpu: 0, total_ram: 0 };
            }
            acc[p.name].processes.push(p);
            acc[p.name].total_cpu += p.cpu_percent;
            acc[p.name].total_ram += p.memory_percent;
            return acc;
        }, {});

        let result = Object.values(grouped);

        if (query) {
            const q = query.toLowerCase();
            result = result.filter(g => g.name.toLowerCase().includes(q));
        }

        result.sort((a, b) => {
            const A = sortKey === "name" ? a.name
                    : sortKey === "cpu"  ? a.total_cpu
                    :                     a.total_ram;

            const B = sortKey === "name" ? b.name
                    : sortKey === "cpu"  ? b.total_cpu
                    :                     b.total_ram;

            return sortOrder === "asc"
                ? (A > B ? 1 : -1)
                : (A < B ? 1 : -1);
        });

        return result;

    }, [processes, query, sortKey, sortOrder]);

    return (

        <div className="h-full overflow-y-auto pr-2">

            <div className="bg-[#080808] p-4 rounded-xl border border-[#171717]">

                <CoreMiniGraphs data={coreHistory} />

                <div className="flex gap-2 my-3 bg-[#111] p-2 rounded-lg">

                    <Search size={16} />

                    <input
                        className="bg-transparent outline-none text-white w-full"
                        value={query}
                        onChange={handleQueryChange}
                        placeholder="Search processes..."
                    />

                </div>

                <div className="space-y-2">
                    {groups.map(g => (
                        <ProcessGroup key={g.name} group={g} />
                    ))}
                </div>

            </div>

        </div>
    );
});

export default ProcessesTab;