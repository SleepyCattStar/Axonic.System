function ProcessRow({ proc }) {

    return (

        <div className="
            grid grid-cols-12
            items-center

            px-3 py-3
            rounded-lg

            bg-[#0d0d0d]
            hover:bg-[#111]
            transition
        ">

            {/* NAME */}
            <div className="col-span-5">
                <p className="text-sm font-medium truncate">
                    {proc.name}
                </p>
                <p className="text-xs text-gray-500">
                    PID: {proc.pid}
                </p>
            </div>

            {/* CPU */}
            <div className="col-span-2 text-right text-orange-400 font-semibold">
                {proc.cpu_percent}%
            </div>

            {/* RAM */}
            <div className="col-span-2 text-right text-cyan-400 font-semibold">
                {proc.memory_percent}%
            </div>

            {/* ACTION */}
            <div className="col-span-3 flex justify-end gap-3 text-sm">

                <button className="text-red-400 hover:text-red-300">
                    kill
                </button>

            </div>

        </div>
    );
}

export default ProcessRow;