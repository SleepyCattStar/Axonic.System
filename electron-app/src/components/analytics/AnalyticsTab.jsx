import { useEffect, useState } from "react";

import DailyStats from "./DailyStats";
import WeeklyStats from "./WeeklyStats";
import AnalyticsGraph from "./AnalyticsGraph";
import ProcessLoadChart from "./ProcessLoadChart";
import CoreUsageChart from "./CoreUsageChart";
import AlertsPanel from "./AlertsPanel";

import {
    fetchAnalyticsDaily,
    fetchAnalyticsWeekly,
    fetchDailyHistory,
    fetchWeeklyHistory,
    fetchProcessLoad,
    fetchCoreUsage,
    fetchAlerts
} from "../../api/telemetryApi";

function AnalyticsTab() {

    // states
    const [daily, setDaily] = useState(null);
    const [weekly, setWeekly] = useState(null);
    const [dailyHistory, setDailyHistory] = useState([]);
    const [weeklyHistory, setWeeklyHistory] = useState([]); 
    const [processLoad, setProcessLoad] = useState([]);
    const [coreUsage, setCoreUsage] = useState([]);
    const [alerts, setAlerts] = useState([]);
    
    // useEffect(() => {

    //     const loadAnalytics = async () => {

    //         try {

    //             const dailyData =
    //                 await fetchAnalyticsDaily();

    //             const weeklyData =
    //                 await fetchAnalyticsWeekly();

    //             const dailyHistoryData =
    //                 await fetchDailyHistory();

    //             const weeklyHistoryData =
    //                 await fetchWeeklyHistory();

    //             const processLoadData =
    //                 await fetchProcessLoad();

    //             setProcessLoad(processLoadData);

    //             setDailyHistory(dailyHistoryData);
    //             setWeeklyHistory(weeklyHistoryData);

    //             setDaily(dailyData);
    //             setWeekly(weeklyData);

    //         } catch (err) {

    //             console.error(err);
    //         }
    //     };

    //     loadAnalytics();

    //     const interval =
    //         setInterval(loadAnalytics, 5000);

    //     return () => clearInterval(interval);

    // }, []);

    useEffect(() => {

    // FAST REFRESH
    const loadAnalytics = async () => {

        try {

            const dailyData =
                await fetchAnalyticsDaily();

            const weeklyData =
                await fetchAnalyticsWeekly();

            const dailyHistoryData =
                await fetchDailyHistory();

            const weeklyHistoryData =
                await fetchWeeklyHistory();

            const coreUsageData =
                await fetchCoreUsage();
            
            const alertsData =
                await fetchAlerts();

            setAlerts(alertsData);

            setCoreUsage(coreUsageData);

            setDaily(dailyData);
            setWeekly(weeklyData);

            setDailyHistory(dailyHistoryData.slice(-70));
            setWeeklyHistory(weeklyHistoryData.slice(-50));

        } catch (err) {

            console.error(err);
        }
    };

    // SLOW REFRESH
    const loadProcessLoad = async () => {

        try {

            const processLoadData =
                await fetchProcessLoad();

            setProcessLoad(processLoadData);

        } catch (err) {

            console.error(err);
        }
    };

    // initial load
    loadAnalytics();
    loadProcessLoad();

    // intervals
    const analyticsInterval =
        setInterval(loadAnalytics, 30000);  // 10 seconds

    const processInterval =
        setInterval(loadProcessLoad, 18000);  // 18 seconds

    return () => {

        clearInterval(analyticsInterval);
        clearInterval(processInterval);
    };

}, []);

    // if (!daily || !weekly) {

    //     return (
    //         <div className="text-gray-500">
    //             Loading analytics...
    //         </div>
    //     );
    // }

//     if (!daily || !weekly) {
//     return (
//         <div className="w-full p-4 space-y-6 animate-pulse">
//             {/* Header Skeleton */}
//             <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            
//             {/* Chart/Card Skeletons */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="h-64 bg-gray-200 rounded-lg"></div>
//                 <div className="h-64 bg-gray-200 rounded-lg"></div>
//             </div>
//         </div>
//     );
// }

if (!daily || !weekly) {
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

                <DailyStats daily={daily} />

                <WeeklyStats weekly={weekly} />

                <div className="col-span-2">

                    <AnalyticsGraph
                        title="Daily CPU vs RAM"
                        data={dailyHistory}
                    />

                </div>

                <div className="col-span-2">

                    <AnalyticsGraph
                        title="Weekly CPU vs RAM"
                        data={weeklyHistory}
                    />

                </div>

                <div className="col-span-2">

                    <ProcessLoadChart
                        data={processLoad}
                    />

                </div>

                <div className="col-span-2">

                    <CoreUsageChart
                        data={coreUsage}
                    />

                </div>

                <div className="col-span-2">

                    <AlertsPanel
                        alerts={alerts}
                    />

                </div>


            </div>

        </div>

    </div>
);
}

export default AnalyticsTab;