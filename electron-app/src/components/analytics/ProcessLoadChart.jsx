import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

import React from "react";


const COLORS = [

    "#06b6d4",
    "#f97316",
    "#22c55e",
    "#eab308",
    "#8b5cf6",
    "#ef4444",
    "#14b8a6",
    "#f43f5e"
];

function ProcessLoadChart({ data }) {

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
                RAM Usage Distribution
            </h2>

            <div className="h-100">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={130}
                            label
                        >

                            {data.map((_, index) => (

                                <Cell
                                    key={index}
                                    fill={
                                        COLORS[
                                            index % COLORS.length
                                        ]
                                    }
                                />

                            ))}

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

// export default ProcessLoadChart;
export default React.memo(ProcessLoadChart);


//                             isAnimationActive={false} add to <Pie  to reduce lag
