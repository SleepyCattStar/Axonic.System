import React from "react";

const DailyStats = React.memo(function DailyStats({ daily }) {

    return (

        <div className="
            bg-[#0d0d0d]
            p-4
            rounded-xl
            border
            border-[#1a1a1a]
        ">

            <h2 className="text-lg font-semibold mb-3">
                Today
            </h2>

            <div className="space-y-2 text-sm">

                <p>
                    Avg CPU:
                    <span className="text-orange-400 ml-2">
                        {daily.cpu_avg.toFixed(2)}%
                    </span>
                </p>

                <p>
                    Avg RAM:
                    <span className="text-cyan-400 ml-2">
                        {daily.ram_avg.toFixed(2)}%
                    </span>
                </p>

                <p className="text-gray-500">
                    Samples: {daily.samples}
                </p>

            </div>

        </div>
    );
});

export default DailyStats;