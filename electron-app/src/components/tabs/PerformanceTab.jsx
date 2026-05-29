import { useEffect, useState } from "react";

import PerformanceCharts from "../PerformanceCharts";
import GPUCard from "../gpu/GPUCard";
import ThermalCard from "../temperature/ThermalCard";

import {
    fetchHistory,
    fetchGPUStats,
    fetchTemperatureStats
} from "../../api/telemetryApi";

function PerformanceTab() {

    const [history, setHistory] = useState(null);
    const [gpu, setGpu] = useState(null);
    const [temp, setTemp] = useState(null);

    useEffect(() => {

        let alive = true;

        const load = async () => {
            try {

                const [h, g, t] = await Promise.all([
                    fetchHistory(),
                    fetchGPUStats(),
                    fetchTemperatureStats()
                ]);

                if (!alive) return;

                setHistory(h);
                setGpu(g);
                setTemp(t);

            } catch (err) {
                console.error(err);
            }
        };

        load();

        const interval =
            setInterval(load, 8000);

        return () => {
            alive = false;
            clearInterval(interval);
        };

    }, []);

    if (!history) {
        return (
            <div className="text-gray-400 p-4">
                Loading performance...
            </div>
        );
    }

    return (

        <div className="h-full overflow-y-auto pr-2 space-y-6">

            <PerformanceCharts history={history} />

            <GPUCard gpu={gpu} />

            <ThermalCard temperature={temp} />

        </div>
    );
}

export default PerformanceTab;