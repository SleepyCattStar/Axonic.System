function WeeklyStats({ weekly }) {

    return (

        <div className="
            bg-[#0d0d0d]
            p-4
            rounded-xl
            border
            border-[#1a1a1a]
        ">

            <h2 className="
                text-lg
                font-semibold
                mb-3
            ">
                This Week
            </h2>

            <div className="space-y-2 text-sm">

                <p>
                    Avg CPU:
                    <span className="text-orange-400 ml-2">
                        {weekly.cpu_avg.toFixed(2)}%
                    </span>
                </p>

                <p>
                    Avg RAM:
                    <span className="text-cyan-400 ml-2">
                        {weekly.ram_avg.toFixed(2)}%
                    </span>
                </p>

            </div>

        </div>
    );
}

export default WeeklyStats;