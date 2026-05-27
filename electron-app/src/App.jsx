import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import StatCard from "./components/StatCard";
import ProcessList from "./components/ProcessList";

import {
    fetchSystemStats,
    fetchProcesses
} from "./api/telemetryApi";

function App() {

    const [stats, setStats] = useState(null);

    const [processes, setProcesses] = useState([]);

    useEffect(() => {

        const loadData = async () => {

            try {

                const statsData =
                    await fetchSystemStats();

                const processData =
                    await fetchProcesses();

                setStats(statsData);

                setProcesses(processData);

            } catch (err) {

                console.error(err);
            }
        };

        loadData();

        const interval =
            setInterval(loadData, 1500);

        return () => clearInterval(interval);

    }, []);

    if (!stats) {

        return (

            <div className="
                h-screen
                bg-black
                text-white
                flex
                items-center
                justify-center
            ">

                Loading Telemetry...

            </div>
        );
    }

    return (

        <div className="
            h-screen
            flex
            bg-[#0f1115]
            text-white
        ">

            <Sidebar />

            <div className="
                flex-1
                flex
                flex-col
            ">

                <Topbar />

                <div className="
                    grid
                    grid-cols-4
                    gap-4
                    p-6
                ">

                    <StatCard
                        title="CPU"
                        value={`${stats.cpu_usage}%`}
                        color="text-orange-400"
                    />

                    <StatCard
                        title="RAM"
                        value={`${stats.ram_usage}%`}
                        color="text-cyan-400"
                    />

                    <StatCard
                        title="Disk"
                        value={`${stats.disk_usage}%`}
                        color="text-yellow-400"
                    />

                    <StatCard
                        title="Network"
                        value={`↓ ${stats.download_speed_mb} MB/s`}
                        color="text-green-400"
                    />

                </div>

                <div className="
                    px-6
                    pb-6
                    flex-1
                    overflow-hidden
                ">

                    <ProcessList
                        processes={processes}
                    />

                </div>

            </div>

        </div>
    );
}

export default App;