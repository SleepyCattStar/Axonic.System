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

// Defined outside the component so it's the same object reference on every
// render. An inline object here creates a new reference each time, which
// causes Recharts to think the tooltip style changed and re-render internally.
const TOOLTIP_STYLE = {
    backgroundColor: "#0d0d0d",
    border: "1px solid #1f1f1f",
    borderRadius: "12px",
    color: "#fff",
};

function AnalyticsGraph({ title, data, lines = [] }) {

    return (

        <div className="
            bg-[#0d0d0d]
            border border-[#1a1a1a]
            rounded-2xl
            p-4
        ">

            <div className="mb-4">
                <h2 className="text-lg font-semibold text-white">
                    {title}
                </h2>
            </div>

            <div className="h-75">

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart data={data}>

                        <CartesianGrid stroke="#1f1f1f" />

                        <XAxis
                            dataKey="timestamp"
                            tick={{ fill: "#888" }}
                            minTickGap={25}
                        />

                        <YAxis tick={{ fill: "#888" }} />

                        <Tooltip contentStyle={TOOLTIP_STYLE} />

                        <Legend />

                        {lines.map((line) => (

                            <Line
                                key={line.dataKey}
                                type="monotone"
                                dataKey={line.dataKey}
                                name={line.name}
                                stroke={line.stroke}
                                strokeWidth={2}
                                dot={false}
                                isAnimationActive={false}
                            />

                        ))}

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default React.memo(AnalyticsGraph);