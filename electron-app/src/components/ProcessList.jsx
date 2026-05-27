import ProcessRow from "./ProcessRow";

function ProcessList({ processes }) {

    return (

        <div className="
            flex
            flex-col
            gap-2
            overflow-y-auto
            h-full
            pr-2
        ">

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