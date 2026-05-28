import { useEffect, useState } from "react";

import DailyStats from "./DailyStats";
import WeeklyStats from "./WeeklyStats";

import {
    fetchAnalyticsDaily,
    fetchAnalyticsWeekly
} from "../../api/telemetryApi";

function AnalyticsTab() {

    const [daily, setDaily] = useState(null);
    const [weekly, setWeekly] = useState(null);

    useEffect(() => {

        const loadAnalytics = async () => {

            try {

                const dailyData =
                    await fetchAnalyticsDaily();

                const weeklyData =
                    await fetchAnalyticsWeekly();

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

    if (!daily || !weekly) {

        return (
            <div className="text-gray-500">
                Loading analytics...
            </div>
        );
    }

    return (

        <div className="space-y-6">

            <h1 className="text-2xl font-bold">
                Analytics Dashboard
            </h1>

            <div className="grid grid-cols-2 gap-4">

                <DailyStats daily={daily} />

                <WeeklyStats weekly={weekly} />

            </div>

        </div>
    );
}

export default AnalyticsTab;