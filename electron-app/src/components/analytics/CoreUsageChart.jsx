import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

import React from "react";

function CoreUsageChart({ data }) {

    return (

        <div className="
            bg-[#0d0d0d]
            border border-[#1a1a1a]
            rounded-2xl
            p-4
        ">

            <h2 className="
                text-lg
                font-semibold
                mb-4
            ">
                Per-Core CPU Usage
            </h2>

            <div className="h-87.5">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart
                        data={data}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#1f1f1f"
                        />

                        <XAxis
                            dataKey="core"
                            stroke="#888"
                        />

                        <YAxis
                            stroke="#888"
                            domain={[0, 100]}
                        />

                        <Tooltip />

                        <Bar
                            dataKey="usage"
                            radius={[6, 6, 0, 0]}
                            fill="#06b6d4"
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

// export default CoreUsageChart;
export default React.memo(CoreUsageChart);

// isAnimationActive={false}

// Add to <Bar to reduce lag