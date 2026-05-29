import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

import React from "react";

const GraphCard = React.memo(function GraphCard({
    title,
    data,
    color
}) {

    return (

        <div className="
            bg-[#080808]
            border
            border-[#171717]
            rounded-2xl
            p-5
            hover:border-cyan-400/20
            hover:shadow-[0_0_30px_rgba(34,211,238,0.05)]
            transition-all
        ">

            <h2 className="
                text-xl
                font-semibold
                mb-4
            ">
                {title}
            </h2>

            <div className="h-72">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <LineChart data={data}>

                        <XAxis hide />

                        <YAxis
                            hide
                            domain={[0, 100]}
                        />

                        <Tooltip
                            contentStyle={{
                                background: "#111",
                                border: "1px solid #222",
                                borderRadius: "12px"
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={color}
                            strokeWidth={3}
                            dot={false}
                            isAnimationActive={false}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
});

const PerformanceCharts = React.memo(function PerformanceCharts({
    history
}) {

    return (

        <div className="
            grid
            grid-cols-2
            gap-6
        ">

            <GraphCard
                title="CPU Usage"
                data={history.cpu}
                color="#f97316"
            />

            <GraphCard
                title="RAM Usage"
                data={history.ram}
                color="#06b6d4"
            />

            <GraphCard
                title="Disk Usage"
                data={history.disk}
                color="#eab308"
            />

            <GraphCard
                title="Download Speed"
                data={history.network_download}
                color="#22c55e"
            />

        </div>
    );
});

export default PerformanceCharts;