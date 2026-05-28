function TrendChart() {

    return (

        <div className="
            bg-[#0d0d0d]
            border border-[#1a1a1a]
            rounded-xl
            p-4
            h-64
        ">

            <h2 className="text-lg font-semibold mb-3">
                CPU & RAM Trend
            </h2>

            <div className="flex items-center justify-center h-full text-gray-500">
                [ Graph will render here ]
            </div>

        </div>
    );
}

export default TrendChart;