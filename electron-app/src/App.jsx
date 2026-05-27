import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import StatCard from "./components/StatCard";
import ProcessList from "./components/ProcessList";
import PlaceholderPage from "./components/PlaceholderPage";
import PerformanceCharts from "./components/PerformanceCharts";

import {
    fetchProcesses,
    fetchSystemStats,
    fetchHistory                // getting the functions from the backend api here 
} from "./api/telemetryApi";

function App() {

    const [stats, setStats] =
        useState(null);

    const [processes, setProcesses] =
        useState([]);

    const [history, setHistory] =
    useState(null);

    const [activeTab, setActiveTab] =
        useState("overview");

    useEffect(() => {

        const loadData = async () => {

            try {

                const statsData =
                    await fetchSystemStats();

                const processData =
                    await fetchProcesses();

                const historyData =
                    await fetchHistory();

                setHistory(historyData)

                setStats(statsData);

                setProcesses(processData);

            } catch (err) {

                console.error(err);
            }
        };

        loadData();

        const interval =
            setInterval(loadData, 1500);

        return () =>
            clearInterval(interval);

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

                Loading...

            </div>
        );
    }

    return (

        <div className="
            h-screen
            flex
            bg-black
            text-white
            overflow-hidden
        ">

            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <div className="
                flex-1
                flex
                flex-col
            ">

                <Topbar
                    activeTab={activeTab}
                />

                <div className="
                    flex-1
                    overflow-hidden
                    p-6
                ">

                    {
                        activeTab === "overview" && (

                            <div className="
                                grid
                                grid-cols-4
                                gap-5
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
                                    value={`↓ ${stats.download_speed_mb}`}
                                    color="text-green-400"
                                />

                            </div>
                        )
                    }

                    {
                        activeTab === "processes" && (

                            <ProcessList
                                processes={processes}
                            />
                        )
                    }

                    {
                        activeTab === "performance" &&
                        history && (

                            <PerformanceCharts
                                history={history}
                            />
                        )
                    }

                    {
                        activeTab === "network" && (

                            <PlaceholderPage
                                title="Network Analytics"
                            />
                        )
                    }

                </div>

            </div>

        </div>
    );
}

export default App;