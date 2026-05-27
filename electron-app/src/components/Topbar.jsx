function Topbar({ activeTab }) {

    return (

        <div className="
            h-16
            border-b
            border-[#111]
            bg-black
            flex
            items-center
            justify-between
            px-6
        ">

            <div>

                <h2 className="
                    text-2xl
                    font-semibold
                    capitalize
                ">
                    {activeTab}
                </h2>

            </div>

            <div className="
                flex
                items-center
                gap-2
                text-green-400
                text-sm
                font-semibold
            ">

                <div className="
                    w-2
                    h-2
                    rounded-full
                    bg-green-400
                    animate-pulse
                " />

                LIVE

            </div>

        </div>
    );
}

export default Topbar;