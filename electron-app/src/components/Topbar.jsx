function Topbar() {

    return (

        <div className="
            h-16
            border-b
            border-[#2a2f3a]
            flex
            items-center
            justify-between
            px-6
        ">

            <h2 className="
                text-xl
                font-semibold
            ">
                System Overview
            </h2>

            <div className="
                text-green-400
                text-sm
                font-semibold
            ">
                LIVE
            </div>

        </div>
    );
}

export default Topbar;