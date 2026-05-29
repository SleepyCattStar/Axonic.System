import {
    Cpu,
    Thermometer,
    MemoryStick
} from "lucide-react";
import React from "react";
import GPUStat from "./GPUStat";

function GPUCard({

    gpu

}) {

    return (

        <div className="
            bg-[#0d0d0d]
            border border-[#1a1a1a]
            rounded-2xl
            p-6
            space-y-6
        ">

            {/* HEADER */}
            <div>

                <h2 className="
                    text-2xl
                    font-bold
                    text-white
                ">
                    GPU Performance
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

            {/* GPU AVAILABLE */}
            {
                gpu?.available ? (

                    <>

                        {/* GRID */}
                        <div className="
                            grid
                            grid-cols-2
                            gap-5
                        ">

                            <GPUStat
                                label="GPU Usage"
                                value={`${gpu.gpu_usage}%`}
                                icon={<Cpu size={20} />}
                            />

                            <GPUStat
                                label="VRAM Usage"
                                value={`${gpu.vram_usage}%`}
                                icon={<MemoryStick size={20} />}
                            />

                            <GPUStat
                                label="Temperature"
                                value={`${gpu.temperature}°C`}
                                icon={<Thermometer size={20} />}
                            />

                            <GPUStat
                                label="VRAM Used"
                                value={`${gpu.memory_used_mb} MB`}
                                icon={<MemoryStick size={20} />}
                            />

                        </div>

                        {/* EXTRA INFO */}
                        <div className="
                            bg-[#111]
                            border border-[#1c1c1c]
                            rounded-xl
                            p-4
                            text-sm
                            text-gray-400
                            space-y-2
                        ">

                            <div className="
                                flex
                                justify-between
                            ">

                                <span>
                                    Total VRAM
                                </span>

                                <span className="text-white">
                                    {gpu.memory_total_mb} MB
                                </span>

                            </div>

                            <div className="
                                flex
                                justify-between
                            ">

                                <span>
                                    GPU Type
                                </span>

                                <span className="text-cyan-300">
                                    {gpu.type}
                                </span>

                            </div>

                        </div>

                    </>

                ) : (

                    <div className="
                        h-55
                        flex
                        items-center
                        justify-center
                        text-gray-500
                    ">

                        GPU monitoring unavailable

                    </div>
                )
            }

        </div>
    );
}

export default React.memo(GPUCard);