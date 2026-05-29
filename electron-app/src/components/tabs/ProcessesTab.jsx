import { useEffect, useState, useMemo } from "react";

import ProcessGroup from "../ProcessGroup";
import CoreMiniGraphs from "../CoreMiniGraphs";

import { Search } from "lucide-react";

import {
    fetchProcesses,
    fetchCoreHistory
} from "../../api/telemetryApi";

function ProcessesTab() {

    const [processes, setProcesses] = useState([]);
    const [coreHistory, setCoreHistory] = useState({});
    const [query, setQuery] = useState("");
    const [sortKey, setSortKey] = useState("cpu");
    const [sortOrder, setSortOrder] = useState("desc");

    useEffect(() => {

        let alive = true;

        const load = async () => {
            try {

                const [p, c] = await Promise.all([
                    fetchProcesses(),
                    fetchCoreHistory()
                ]);

                if (!alive) return;

                setProcesses(p);
                setCoreHistory(c);

            } catch (err) {
                console.error(err);
            }
        };

        load();

        const interval =
            setInterval(load, 6000);

        return () => {
            alive = false;
            clearInterval(interval);
        };

    }, []);

    const groups = useMemo(() => {

        const grouped = processes.reduce((acc, p) => {

            if (!acc[p.name]) {

                acc[p.name] = {
                    name: p.name,
                    processes: [],
                    total_cpu: 0,
                    total_ram: 0
                };
            }

            acc[p.name].processes.push(p);
            acc[p.name].total_cpu += p.cpu_percent;
            acc[p.name].total_ram += p.memory_percent;

            return acc;

        }, {});

        let result = Object.values(grouped);

        result = result.filter(g =>
            g.name.toLowerCase().includes(query.toLowerCase())
        );

        result.sort((a, b) => {

            let A, B;

            if (sortKey === "name") {
                A = a.name;
                B = b.name;
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
                        onChange={(e) => setQuery(e.target.value)}
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
}

export default ProcessesTab;