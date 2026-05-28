function InsightCards() {

    return (

        <div className="grid grid-cols-2 gap-4">

            <div className="bg-[#0d0d0d] p-4 rounded-xl border border-[#1a1a1a]">
                ⚡ System load is stable
            </div>

            <div className="bg-[#0d0d0d] p-4 rounded-xl border border-[#1a1a1a]">
                📉 CPU usage dropped vs yesterday
            </div>

            <div className="bg-[#0d0d0d] p-4 rounded-xl border border-[#1a1a1a]">
                🧠 RAM usage within normal range
            </div>

            <div className="bg-[#0d0d0d] p-4 rounded-xl border border-[#1a1a1a]">
                🔥 Peak usage detected earlier today
            </div>

        </div>
    );
}

export default InsightCards;