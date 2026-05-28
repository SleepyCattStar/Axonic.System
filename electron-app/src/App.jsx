import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import StatCard from "./components/StatCard";
import ProcessList from "./components/ProcessList";
import PlaceholderPage from "./components/PlaceholderPage";
import PerformanceCharts from "./components/PerformanceCharts";
import MiniGraph from "./components/MiniGraph";
import SystemInfo from "./components/SystemInfo";
import TopProcesses from "./components/TopProcesses";

import {
    fetchProcesses,
    fetchSystemStats,
    fetchHistory,                // getting the functions from the backend api here 
    fetchSystemInfo
} from "./api/telemetryApi";

function App() {

    // All states here
    const [stats, setStats] =
        useState(null);

    const [processes, setProcesses] =
        useState([]);

    const [history, setHistory] =
    useState(null);

    const [activeTab, setActiveTab] =
        useState("overview");

    const [systemInfo, setSystemInfo] =
    useState(null);

    const refreshProcesses = async () => {

        const processData =
            await fetchProcesses();

        setProcesses(processData);
    };


    useEffect(() => {

        const loadData = async () => {

            try {

                // fetching data here
                const statsData =
                    await fetchSystemStats();

                const processData =
                    await fetchProcesses();

                const historyData =
                    await fetchHistory();

                const systemInfoData =
                    await fetchSystemInfo();

                setSystemInfo(systemInfoData);

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

                                <SystemInfo                         // added the system info here for rendering inside the overview tab
                                    systemInfo={systemInfo}
                                />

                                <TopProcesses
                                    processes={processes}
                                    refresh={refreshProcesses}
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
                        activeTab === "Analytics" && (

                            <PlaceholderPage
                                title="Device Analytics"
                            />
                        )
                    }

                </div>

            </div>

        </div>
    );
}

export default App;