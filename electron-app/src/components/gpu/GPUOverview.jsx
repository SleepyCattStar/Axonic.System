import {
    Cpu,
    Thermometer,
    MemoryStick
} from "lucide-react";

import GPUStat from "./GPUStat";

function GPUOverview({

    gpu

}) {

    return (

        <div className="
            bg-[#080808]
            border border-[#171717]
            rounded-2xl
            p-5
            space-y-5
        ">

            {/* HEADER */}
            <div>

                <h2 className="
                    text-lg
                    font-semibold
                    text-white
                ">
                    GPU Stats
                </h2>

                <p className="
                    text-sm
                    text-gray-500
                    mt-1
                ">
                    {
                        gpu?.available
                        ? gpu.name
                        : "GPU unavailable"
                    }
                </p>

            </div>

            {/* CONTENT */}
            {
                gpu?.available ? (

                    <div className="
                        grid
                        grid-cols-2
                        gap-4
                    ">

                        <GPUStat
                            label="Usage"
                            value={`${gpu.gpu_usage}%`}
                            icon={<Cpu size={18} />}
                        />

                        <GPUStat
                            label="VRAM"
                            value={`${gpu.vram_usage}%`}
                            icon={<MemoryStick size={18} />}
                        />

                        <GPUStat
                            label="Temperature"
                            value={`${gpu.temperature}°C`}
                            icon={<Thermometer size={18} />}
                        />

                        <GPUStat
                            label="Memory Used"
                            value={`${gpu.memory_used_mb} MB`}
                            icon={<MemoryStick size={18} />}
                        />

                    </div>

                ) : (

                    <div className="
                        h-40
                        flex
                        items-center
                        justify-center
                        text-gray-500
                        text-sm
                    ">

                        No GPU detected

                    </div>
                )
            }

        </div>
    );
}

export default GPUOverview;