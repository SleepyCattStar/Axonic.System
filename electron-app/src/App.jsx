import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import OverviewTab from "./components/tabs/OverviewTab";
import ProcessesTab from "./components/tabs/ProcessesTab";
import PerformanceTab from "./components/tabs/PerformanceTab";
import AnalyticsTab from "./components/analytics/AnalyticsTab";

function App() {

    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="
            h-screen
            flex
            bg-black
            text-white
            overflow-hidden
        ">

            {/* SIDEBAR */}
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {/* MAIN AREA */}
            <div className="
                flex-1
                flex
                flex-col
                overflow-hidden
            ">

                {/* TOPBAR (static now, no polling inside App) */}
                <Topbar activeTab={activeTab} />

                {/* TAB CONTAINER */}
                <div className="
                    flex-1
                    overflow-hidden
                    p-6
                ">

                    {activeTab === "overview" && (
                        <OverviewTab />
                    )}

                    {activeTab === "processes" && (
                        <ProcessesTab />
                    )}

                    {activeTab === "performance" && (
                        <PerformanceTab />
                    )}

                    {activeTab === "analytics" && (
                        <AnalyticsTab />
                    )}

                </div>

            </div>

        </div>
    );
}

export default App;