import { useState } from "react";

import {
    Settings,
    ChevronUp
} from "lucide-react";

function UserMenu({
    username,
    onOpenSettings
}) {

    const [open, setOpen] =
        useState(false);

    return (

        <div className="relative">

            {/* USER BUTTON */}
            <button
                onClick={() => setOpen(!open)}
                className="
                    w-full
                    flex
                    items-center
                    justify-between
                    px-3
                    py-3
                    rounded-xl
                    bg-[#0d0d0d]
                    border border-[#1a1a1a]
                    hover:border-cyan-400/20
                    transition-all
                "
            >

                <div className="text-left">

                    <p className="text-xs text-gray-500">
                        Hello,
                    </p>

                    <p className="font-medium capitalize">
                        {username}
                    </p>

                </div>

                <ChevronUp
                    size={18}
                    className={`
                        transition-transform
                        ${open ? "rotate-180" : ""}
                    `}
                />

            </button>

            {/* DROPDOWN */}
            {open && (

                <div className="
                    absolute
                    bottom-16
                    left-0
                    w-full
                    bg-[#111111]
                    border border-[#1f1f1f]
                    rounded-xl
                    shadow-xl
                    overflow-hidden
                    z-50
                ">

                    <button
                        onClick={() => {

                            onOpenSettings();
                            setOpen(false);
                        }}
                        className="
                            w-full
                            flex
                            items-center
                            gap-2
                            px-4
                            py-3
                            hover:bg-[#181818]
                            transition-all
                        "
                    >

                        <Settings size={16} />

                        Settings

                    </button>

                </div>
            )}

        </div>
    );
}

export default UserMenu;