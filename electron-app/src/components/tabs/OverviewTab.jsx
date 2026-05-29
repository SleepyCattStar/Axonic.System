import { memo, useMemo } from "react";

import {
    useFastTelemetry,
    useMediumTelemetry,
    useSlowTelemetry,
} from "../../context/TelemetryContext";

import MiniGraph from "../MiniGraph";
import SystemInfo from "../SystemInfo";
import TopProcesses from "../TopProcesses";
import GPUOverview from "../gpu/GPUOverview";

const OverviewTab = memo(function OverviewTab() {

    // 🔵 FAST — numbers update every 1.5 s
    const { stats, gpu } = useFastTelemetry();

    // 🟡 MEDIUM — chart arrays update every 6 s
    const { history, processes } = useMediumTelemetry();

    // 🔴 SLOW — barely changes
    const { systemInfo } = useSlowTelemetry();

    // ── FIX 2: slice history BEFORE passing to children ──────────────────
    // useMemo ensures the sliced array keeps the same reference between
    // renders unless `history` itself has changed (medium stream update).
    // This prevents MiniGraph from re-rendering on FAST updates.

    const cpuSeries     = useMemo(() => history?.cpu?.slice(-30)              ?? [], [history]);
    const ramSeries     = useMemo(() => history?.ram?.slice(-30)              ?? [], [history]);
    const diskSeries    = useMemo(() => history?.disk?.slice(-30)             ?? [], [history]);
    const networkSeries = useMemo(() => history?.network_download?.slice(-30) ?? [], [history]);

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
                    data={cpuSeries}
                    color="#f97316"
                />

                <MiniGraph
                    title="RAM"
                    value={`${stats.ram_usage}%`}
                    data={ramSeries}
                    color="#06b6d4"
                />

                <MiniGraph
                    title="Disk"
                    value={`${stats.disk_usage}%`}
                    data={diskSeries}
                    color="#eab308"
                />

                <MiniGraph
                    title="Network"
                    value={`${stats.download_speed_mb} MB/s`}
                    data={networkSeries}
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
});

export default OverviewTab;