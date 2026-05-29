import { memo } from "react";

import { useSlowTelemetry } from "../../context/TelemetryContext";
import DailyStats from "./DailyStats";
import WeeklyStats from "./WeeklyStats";
import AnalyticsGraph from "./AnalyticsGraph";
import ProcessLoadChart from "./ProcessLoadChart";
import CoreUsageChart from "./CoreUsageChart";
import AlertsPanel from "./AlertsPanel";

// ─────────────────────────────────────────────────────────────────────────────
// Stable line config arrays — module-level constants, same reference forever.
// ─────────────────────────────────────────────────────────────────────────────

const CPU_RAM_LINES = [
    { dataKey: "cpu",  stroke: "#f97316", name: "CPU" },
    { dataKey: "ram",  stroke: "#06b6d4", name: "RAM" },
];

const THERMAL_LINES = [
    { dataKey: "cpu_temp", stroke: "#ef4444", name: "CPU Temp" },
    { dataKey: "ssd_temp", stroke: "#eab308", name: "SSD Temp" },
];

// ─────────────────────────────────────────────────────────────────────────────
// AnalyticsTab — PURE UI CONSUMER (SLOW stream only)
//
// Only re-renders every 30 s when the slow stream updates.
// FAST and MEDIUM updates have ZERO effect on this component.
// ─────────────────────────────────────────────────────────────────────────────

const AnalyticsTab = memo(function AnalyticsTab() {

    // 🔴 SLOW only — this tab never needs fast or medium data
    const {
        analyticsDaily,
        analyticsWeekly,
        dailyHistory,
        weeklyHistory,
        processLoad,
        coreUsage,
        alerts,
    } = useSlowTelemetry();

    if (!analyticsDaily || !analyticsWeekly) {
        return (
            <div className="flex flex-col items-center justify-center min-h-75 text-gray-500 space-y-4">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="text-sm font-medium animate-pulse">
                    Loading your analytics...
                </p>
            </div>
        );
    }

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
                p-6
                space-y-6
                min-h-full
            ">

                <h1 className="text-2xl font-bold">
                    Dashboard
                </h1>

                <div className="grid grid-cols-2 gap-4">

                    <DailyStats daily={analyticsDaily} />

                    <WeeklyStats weekly={analyticsWeekly} />

                    <div className="col-span-2">
                        <AnalyticsGraph
                            title="Daily CPU vs RAM"
                            data={dailyHistory}
                            lines={CPU_RAM_LINES}
                        />
                    </div>

                    <div className="col-span-2">
                        <AnalyticsGraph
                            title="Weekly CPU vs RAM"
                            data={weeklyHistory}
                            lines={CPU_RAM_LINES}
                        />
                    </div>

                    <div className="col-span-2">
                        <AnalyticsGraph
                            title="Thermal History"
                            data={dailyHistory}
                            lines={THERMAL_LINES}
                        />
                    </div>

                    <div className="col-span-2">
                        <ProcessLoadChart data={processLoad} />
                    </div>

                    <div className="col-span-2">
                        <CoreUsageChart data={coreUsage} />
                    </div>

                    <div className="col-span-2">
                        <AlertsPanel alerts={alerts} />
                    </div>

                </div>

            </div>

        </div>
    );
});

export default AnalyticsTab;