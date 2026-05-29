import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend
} from "recharts";
import React from "react";

function AnalyticsGraph({
    title,
    data
}) {

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
                {title}
            </h2>

            <div className="h-75">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <LineChart data={data}>

                        <CartesianGrid
                            stroke="#1f1f1f"
                        />

                        <XAxis
                            dataKey="timestamp"
                            tick={{ fill: "#888" }}
                        />

                        <YAxis
                            tick={{ fill: "#888" }}
                        />

                        <Tooltip />

                        <Legend />

                        <Line
                            type="monotone"
                            dataKey="cpu"
                            isAnimationActive={false}
                            stroke="#f97316"
                            strokeWidth={2}
                            dot={false}
                        />

                        <Line
                            type="monotone"
                            dataKey="ram"
                            stroke="#06b6d4"
                            strokeWidth={2}
                            dot={false}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

// export default AnalyticsGraph;
export default React.memo(AnalyticsGraph);

//                             isAnimationActive={false}
//    Add that to <Line to cut off the animations to reduce lag.