function GPUStat({

    label,
    value,
    icon

}) {

    return (

        <div className="
            bg-[#111]
            border border-[#1c1c1c]
            rounded-xl
            p-4
            flex
            flex-col
            gap-2
            min-h-25
        ">

            <div className="
                text-cyan-300
            ">
                {icon}
            </div>

            <p className="
                text-xs
                text-gray-500
            ">
                {label}
            </p>

            <p className="
                text-lg
                font-semibold
                text-white
            ">
                {value}
            </p>

        </div>
    );
}

export default GPUStat;