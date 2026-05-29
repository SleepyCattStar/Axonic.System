import { memo, useMemo } from "react";

import {
    useFastTelemetry,
    useMediumTelemetry,
    useSlowTelemetry,
} from "../../context/TelemetryContext";

import PerformanceCharts from "../PerformanceCharts";
import GPUCard from "../gpu/GPUCard";
import ThermalCard from "../temperature/ThermalCard";

const PerformanceTab = memo(function PerformanceTab() {

    // 🔵 FAST — live GPU numbers
    const { gpu } = useFastTelemetry();

    // 🟡 MEDIUM — chart arrays
    const { history } = useMediumTelemetry();

    // 🔴 SLOW — temperature
    const { temp } = useSlowTelemetry();

    // ── FIX 2: slice history arrays before passing to PerformanceCharts ──
    const slicedHistory = useMemo(() => {
        if (!history) return null;
        return {
            cpu:              history.cpu?.slice(-60)              ?? [],
            ram:              history.ram?.slice(-60)              ?? [],
            disk:             history.disk?.slice(-60)             ?? [],
            network_download: history.network_download?.slice(-60) ?? [],
        };
    }, [history]);

    if (!slicedHistory) {
        return (
            <div className="text-gray-400 p-4">
                Loading performance...
            </div>
        );
    }

    return (

        <div className="h-full overflow-y-auto pr-2 space-y-6">

            <PerformanceCharts history={slicedHistory} />

            <GPUCard gpu={gpu} />

            <ThermalCard temperature={temp} />

        </div>
    );
});

export default PerformanceTab;