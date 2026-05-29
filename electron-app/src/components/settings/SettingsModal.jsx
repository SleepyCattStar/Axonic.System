import { X } from "lucide-react";

function SettingsModal({

    open,
    onClose

}) {

    if (!open) return null;

    return (

        <div className="
            fixed inset-0
            bg-black/70
            backdrop-blur-sm
            flex
            items-center
            justify-center
            z-50
        ">

            <div className="
                w-125
                bg-[#0b0b0b]
                border border-[#1a1a1a]
                rounded-2xl
                p-6
                space-y-6
            ">

                {/* HEADER */}
                <div className="
                    flex
                    items-center
                    justify-between
                ">

                    <h1 className="
                        text-xl
                        font-semibold
                    ">
                        Settings
                    </h1>

                    <button
                        onClick={onClose}
                        className="
                            text-gray-500
                            hover:text-white
                        "
                    >

                        <X size={20} />

                    </button>

                </div>

                <p className="text-gray-400 text-sm">
                    Alert configuration panel coming next.
                </p>

            </div>

        </div>
    );
}

export default SettingsModal;