import { useState } from "react";

import { TelemetryProvider } from "./context/TelemetryContext";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import OverviewTab from "./components/tabs/OverviewTab";
import ProcessesTab from "./components/tabs/ProcessesTab";
import PerformanceTab from "./components/tabs/PerformanceTab";
import AnalyticsTab from "./components/analytics/AnalyticsTab";

function App() {

    const [activeTab, setActiveTab] = useState("overview");

    return (
        <TelemetryProvider>
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

                    <Topbar activeTab={activeTab} />

                    {/*
                     * All tabs are always mounted and hidden with CSS rather than
                     * conditionally rendered. Benefits:
                     *   • No teardown / remount cost on every tab switch
                     *   • Scroll positions and local UI state (e.g. search query) survive
                     *   • Data from context is already there when the user switches back
                     */}
                    <div className="flex-1 overflow-hidden p-6">

                        <div className={activeTab === "overview"    ? "h-full" : "hidden"}>
                            <OverviewTab />
                        </div>

                        <div className={activeTab === "processes"   ? "h-full" : "hidden"}>
                            <ProcessesTab />
                        </div>

                        <div className={activeTab === "performance" ? "h-full" : "hidden"}>
                            <PerformanceTab />
                        </div>

                        <div className={activeTab === "analytics"   ? "h-full" : "hidden"}>
                            <AnalyticsTab />
                        </div>

                    </div>

                </div>

            </div>
        </TelemetryProvider>
    );
}

export default App;