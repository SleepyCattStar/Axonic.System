import { useState } from "react";

import {
    Settings,
    ChevronUp,
    User
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
                onClick={() =>
                    setOpen(prev => !prev)
                }
                className="
                    w-full
                    bg-[#0d0d0d]
                    border border-[#1a1a1a]
                    hover:border-cyan-400/20
                    rounded-2xl
                    p-3
                    transition-all
                    flex
                    items-center
                    justify-between
                "
            >

                {/* LEFT */}
                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    {/* AVATAR */}
                    <div className="
                        w-11
                        h-11
                        rounded-full
                        bg-gradient-to-br
                        from-cyan-400
                        to-blue-500
                        flex
                        items-center
                        justify-center
                        shadow-[0_0_15px_rgba(34,211,238,0.2)]
                    ">

                        <User
                            size={20}
                            className="text-black"
                        />

                    </div>

                    {/* TEXT */}
                    <div className="
                        flex
                        flex-col
                        items-start
                    ">

                        <span className="
                            text-xs
                            text-gray-500
                        ">
                            Hello,
                        </span>

                        <span className="
                            text-sm
                            font-bold
                            text-cyan-300
                            tracking-wide
                        ">
                            {username}
                        </span>

                    </div>

                </div>

                {/* RIGHT ICON */}
                <ChevronUp
                    size={18}
                    className={`
                        text-gray-500
                        transition-transform
                        duration-200

                        ${
                            open
                            ? "rotate-180"
                            : ""
                        }
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
                    bg-[#0b0b0b]
                    border border-[#1a1a1a]
                    rounded-2xl
                    p-2
                    shadow-2xl
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
                            gap-3
                            px-4
                            py-3
                            rounded-xl
                            hover:bg-[#111]
                            transition-all
                            text-gray-300
                        "
                    >

                        <Settings size={18} />

                        <span>
                            Settings
                        </span>

                    </button>

                </div>
            )}

        </div>
    );
}

export default UserMenu;