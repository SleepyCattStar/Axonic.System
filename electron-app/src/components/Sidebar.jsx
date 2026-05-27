import {
    LayoutDashboard,
    Cpu,
    Activity,
    Network
} from "lucide-react";

function Sidebar() {

    return (

        <div className="
            w-60
            bg-[#050505]
            border-r
            border-[#111]
            p-4
        ">

            <h1 className="
                text-2xl
                font-bold
                mb-8
            ">
                ProcMon
            </h1>

            <div className="space-y-2">

                <div className="
                    flex
                    items-center
                    gap-3
                    bg-[#1f2630]
                    px-4
                    py-3
                    rounded-lg
                    cursor-pointer
                ">

                    <LayoutDashboard size={20} />

                    <span>
                        Overview
                    </span>

                </div>

                <div className="
                    flex
                    items-center
                    gap-3
                    hover:bg-[#1f2630]
                    px-4
                    py-3
                    rounded-lg
                    cursor-pointer
                    transition
                ">

                    <Activity size={20} />

                    <span>
                        Processes
                    </span>

                </div>

                <div className="
                    flex
                    items-center
                    gap-3
                    hover:bg-[#1f2630]
                    px-4
                    py-3
                    rounded-lg
                    cursor-pointer
                    transition
                ">

                    <Cpu size={20} />

                    <span>
                        Performance
                    </span>

                </div>

                <div className="
                    flex
                    items-center
                    gap-3
                    hover:bg-[#1f2630]
                    px-4
                    py-3
                    rounded-lg
                    cursor-pointer
                    transition
                ">

                    <Network size={20} />

                    <span>
                        Network
                    </span>

                </div>

            </div>

        </div>
    );
}

export default Sidebar;