import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import StatCard from "./components/StatCard";
import ProcessList from "./components/ProcessList";
import PlaceholderPage from "./components/PlaceholderPage";
import PerformanceCharts from "./components/PerformanceCharts";
import MiniGraph from "./components/MiniGraph";

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
                        activeTab === "overview" &&
                        history && (

                            <div className="
                                grid
                                grid-cols-2
                                gap-6
                            ">

                                <MiniGraph
                                    title="CPU Usage"
                                    value={`${stats.cpu_usage}%`}
                                    data={history.cpu}
                                    color="#f97316"
                                />

                                <MiniGraph
                                    title="RAM Usage"
                                    value={`${stats.ram_usage}%`}
                                    data={history.ram}
                                    color="#06b6d4"
                                />

                                <MiniGraph
                                    title="Disk Usage"
                                    value={`${stats.disk_usage}%`}
                                    data={history.disk}
                                    color="#eab308"
                                />

                                <MiniGraph
                                    title="Download"
                                    value={`${stats.download_speed_mb} MB/s`}
                                    data={history.network_download}
                                    color="#22c55e"
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