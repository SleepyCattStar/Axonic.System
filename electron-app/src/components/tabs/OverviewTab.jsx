import { useEffect, useState } from "react";

import MiniGraph from "../MiniGraph";
import SystemInfo from "../SystemInfo";
import TopProcesses from "../TopProcesses";
import GPUOverview from "../gpu/GPUOverview";

import {
    fetchSystemStats,
    fetchHistory,
    fetchSystemInfo,
    fetchProcesses,
    fetchGPUStats
} from "../../api/telemetryApi";

function OverviewTab() {

    const [stats, setStats] = useState(null);
    const [history, setHistory] = useState(null);
    const [systemInfo, setSystemInfo] = useState(null);
    const [processes, setProcesses] = useState([]);
    const [gpu, setGpu] = useState(null);

    useEffect(() => {

        let alive = true;

        const load = async () => {
            try {
                const [
                    s,
                    h,
                    si,
                    p,
                    g
                ] = await Promise.all([
                    fetchSystemStats(),
                    fetchHistory(),
                    fetchSystemInfo(),
                    fetchProcesses(),
                    fetchGPUStats()
                ]);

                if (!alive) return;

                setStats(s);
                setHistory(h);
                setSystemInfo(si);
                setProcesses(p);
                setGpu(g);

            } catch (err) {
                console.error(err);
            }
        };

        load();

        const interval =
            setInterval(load, 4000);

        return () => {
            alive = false;
            clearInterval(interval);
        };

    }, []);

    if (!stats || !history) {
        return (
            <div className="text-gray-400 p-4">
                Loading overview...
            </div>
        );
    }

    return (

        <div className="h-full overflow-y-auto pr-2">

            <div className="grid grid-cols-2 gap-6">

                <MiniGraph
                    title="CPU"
                    value={`${stats.cpu_usage}%`}
                    data={history.cpu}
                    color="#f97316"
                />

                <MiniGraph
                    title="RAM"
                    value={`${stats.ram_usage}%`}
                    data={history.ram}
                    color="#06b6d4"
                />

                <MiniGraph
                    title="Disk"
                    value={`${stats.disk_usage}%`}
                    data={history.disk}
                    color="#eab308"
                />

                <MiniGraph
                    title="Network"
                    value={`${stats.download_speed_mb} MB/s`}
                    data={history.network_download}
                    color="#22c55e"
                />

                <GPUOverview gpu={gpu} />

                <SystemInfo systemInfo={systemInfo} />

                <div className="col-span-2">
                    <TopProcesses processes={processes} />
                </div>

            </div>

        </div>
    );
}

export default OverviewTab;