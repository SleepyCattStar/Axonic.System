import ProcessRow from "./ProcessRow";

function ProcessList({ processes }) {

    return (

        <div className="
            bg-[#161b22]
            border
            border-[#2a2f3a]
            rounded-xl
            p-4
            flex-1
            overflow-y-auto
        ">

            <h2 className="
                text-xl
                font-semibold
                mb-4
            ">
                Active Processes
            </h2>

            {processes.map((proc) => (

                <ProcessRow
                    key={proc.pid}
                    proc={proc}
                />
            ))}

        </div>
    );
}

export default ProcessList;