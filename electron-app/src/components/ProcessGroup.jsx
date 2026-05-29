import { useState } from "react";
import ProcessRow from "./ProcessRow";
import React from "react";

function ProcessGroup({ group }) {

    const [open, setOpen] = useState(false);

    return (

        <div className="mb-2">

            {/* GROUP HEADER (MUST MATCH TABLE GRID) */}
            <div
                onClick={() => setOpen(!open)}
                className="
                    grid grid-cols-12
                    items-center
                    px-3 py-3
                    rounded-lg
                    bg-[#0d0d0d]
                    hover:bg-[#111]
                    cursor-pointer
                "
            >

                {/* NAME */}
                <div className="col-span-5">
                    <p className="font-semibold">
                        {group.name}
                    </p>

                    <p className="text-xs text-gray-500">
                        {group.processes.length} processes
                    </p>
                </div>

                {/* CPU */}
                <div className="col-span-3 text-right text-orange-400 font-semibold">
                    {group.total_cpu.toFixed(1)}%
                </div>

                {/* RAM */}
                <div className="col-span-3 text-right text-cyan-400 font-semibold">
                    {group.total_ram.toFixed(1)}%
                </div>

                {/* TOGGLE */}
                <div className="col-span-1 text-right text-gray-500">
                    {open ? "▼" : "▶"}
                </div>

            </div>

            {/* CHILD ROWS */}
            {open && (
                <div className="mt-2 space-y-2 pl-4">

                    {group.processes.map(proc => (
                        <ProcessRow
                            key={proc.pid}
                            proc={proc}
                        />
                    ))}

                </div>
            )}

        </div>
    );
}

export default React.memo(ProcessGroup);