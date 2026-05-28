import {
    LayoutDashboard,
    Activity,
    Cpu,
    Network,
} from "lucide-react";

function Sidebar({
    activeTab,
    setActiveTab
}) {

    const tabs = [
        {
            id: "overview",
            label: "Overview",
            icon: LayoutDashboard
        },
        {
            id: "processes",
            label: "Processes",
            icon: Activity
        },
        {
            id: "performance",
            label: "Performance",
            icon: Cpu
        },
        {
            id: "Analytics",
            label: "Analytics",
            icon: Network
        }
    ];
    // NOTE ANY CHANGE HERE SHOULD ALSO BE ADDED TO THE APP.JSX

    return (

        <div className="
            w-64
            bg-black
            border-r
            border-[#111]
            flex
            flex-col
            p-4
        ">

            <div className="mb-10">

                <h5 className="
                    text-3xl
                    font-bold
                    text-white
                    tracking-wide
                ">
                    Axonic
                </h5>

                <p className="
                    text-sm
                    text-gray-500
                    mt-1
                ">
                    Task Manager
                </p>

            </div>

            <div className="space-y-2">

                {tabs.map((tab) => {

                    const Icon = tab.icon;

                    return (

                        <button
                            key={tab.id}
                            onClick={() =>
                                setActiveTab(tab.id)
                            }
                            className={`
                                w-full
                                flex
                                items-center
                                gap-3
                                px-4
                                py-3
                                rounded-xl
                                transition-all
                                duration-200
                                border

                                ${
                                    activeTab === tab.id
                                    ? `
                                        bg-[#111]
                                        border-cyan-400/30
                                        shadow-[0_0_20px_rgba(34,211,238,0.12)]
                                        text-cyan-300
                                    `
                                    : `
                                        border-transparent
                                        hover:bg-[#0b0b0b]
                                        hover:border-[#1a1a1a]
                                        text-gray-400
                                    `
                                }
                            `}
                        >

                            <Icon size={20} />

                            <span className="font-medium">
                                {tab.label}
                            </span>

                        </button>
                    );
                })}

            </div>

        </div>
    );
}

export default Sidebar;