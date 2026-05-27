function StatCard({
    title,
    value,
    color
}) {

    return (

        <div className="
            bg-[#080808]
            border
            border-[#161616]
            rounded-lg
            p-1  
            transition-all
            duration-300
            hover:border-cyan-400/20
            hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]
        ">

            <p className="
                text-gray-500
                text-sm
                uppercase
                tracking-wider
            ">
                {title}
            </p>

            <h2 className={`
                text-4xl
                font-bold
                mt-3
                ${color}
            `}>
                {value}
            </h2>

        </div>
    );
}

export default StatCard;