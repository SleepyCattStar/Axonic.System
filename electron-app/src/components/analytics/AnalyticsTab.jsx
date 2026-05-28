import { useEffect, useState } from "react";

import DailyStats from "./DailyStats";
import WeeklyStats from "./WeeklyStats";
import AnalyticsGraph from "./AnalyticsGraph";

import {
    fetchAnalyticsDaily,
    fetchAnalyticsWeekly,
    fetchDailyHistory,
    fetchWeeklyHistory
} from "../../api/telemetryApi";

function AnalyticsTab() {

    // states
    const [daily, setDaily] = useState(null);
    const [weekly, setWeekly] = useState(null);
    const [dailyHistory, setDailyHistory] = useState([]);
    const [weeklyHistory, setWeeklyHistory] = useState([]); 

    useEffect(() => {

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

                setDailyHistory(dailyHistoryData);
                setWeeklyHistory(weeklyHistoryData);

                setDaily(dailyData);
                setWeekly(weeklyData);

            } catch (err) {

                console.error(err);
            }
        };

        loadAnalytics();

        const interval =
            setInterval(loadAnalytics, 5000);

        return () => clearInterval(interval);

    }, []);

    // if (!daily || !weekly) {

    //     return (
    //         <div className="text-gray-500">
    //             Loading analytics...
    //         </div>
    //     );
    // }

    if (!daily || !weekly) {
    return (
        <div className="w-full p-4 space-y-6 animate-pulse">
            {/* Header Skeleton */}
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            
            {/* Chart/Card Skeletons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64 bg-gray-200 rounded-lg"></div>
                <div className="h-64 bg-gray-200 rounded-lg"></div>
            </div>
        </div>
    );
}

    return (

        <div className="space-y-6">

            <h1 className="text-2xl font-bold">
                Dashboard
            </h1>

            <div className="grid grid-cols-2 gap-4">

                <DailyStats daily={daily} />

                <WeeklyStats weekly={weekly} />

                <AnalyticsGraph
                    title="Daily CPU vs RAM"
                    data={dailyHistory}
                />

                <AnalyticsGraph
                    title="Weekly CPU vs RAM"
                    data={weeklyHistory}
                />

            </div>



        </div>
    );
}

export default AnalyticsTab;