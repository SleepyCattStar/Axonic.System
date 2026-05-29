import {
    ResponsiveContainer,
    LineChart,
    Line
} from "recharts";

import React from "react";

function MiniGraph({
    title,
    value,
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
            hover:shadow-[0_0_20px_rgba(34,211,238,0.05)]
            transition-all
        ">

            <div className="
                flex
                items-center
                justify-between
                mb-4
            ">

                <div>

                    <p className="
                        text-sm
                        text-gray-500
                        uppercase
                    ">
                        {title}
                    </p>

                    <h2 className="
                        text-3xl
                        font-bold
                        mt-1
                    ">
                        {value}
                    </h2>

                </div>

            </div>

            <div className="h-24">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <LineChart data={data}>

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
}

export default React.memo(MiniGraph);