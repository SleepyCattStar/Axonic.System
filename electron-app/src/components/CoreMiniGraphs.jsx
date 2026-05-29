import React from "react";

function CoreMiniGraphs({ data }) {

    const createPath = (points) => {

        if (!points || points.length === 0)
            return "";

        const width = 120;
        const height = 40;

        return points.map((p, i) => {

            const x =
                (i / (points.length - 1)) * width;

            const y =
                height - (p / 100) * height;

            return `${i === 0 ? "M" : "L"} ${x} ${y}`;

        }).join(" ");
    };

    return (

        <div className="
            bg-[#080808]
            border border-[#171717]
            rounded-2xl
            p-4
            mb-4
        ">

            <h2 className="
                text-lg
                font-semibold
                mb-4
            ">
                CPU Core Activity
            </h2>

            <div className="
                grid
                grid-cols-2
                md:grid-cols-4
                gap-4
            ">

                {Object.entries(data).map(
                    ([core, values]) => {

                    const latest =
                        values[values.length - 1];

                    return (

                        <div
                            key={core}
                            className="
                                bg-[#0d0d0d]
                                border border-[#1a1a1a]
                                rounded-xl
                                p-3
                            "
                        >

                            <div className="
                                flex
                                justify-between
                                mb-2
                            ">

                                <span className="
                                    text-sm
                                    text-gray-400
                                ">
                                    {core}
                                </span>

                                <span className="
                                    text-cyan-400
                                    text-sm
                                    font-semibold
                                ">
                                    {latest}%
                                </span>

                            </div>

                            <svg
                                width="100%"
                                height="40"
                                viewBox="0 0 120 40"
                            >

                                <path
                                    d={createPath(values)}
                                    fill="none"
                                    stroke="#06b6d4"
                                    strokeWidth="2"
                                />

                            </svg>

                        </div>
                    );
                })}

            </div>

        </div>
    );
}

export default React.memo(CoreMiniGraphs);

