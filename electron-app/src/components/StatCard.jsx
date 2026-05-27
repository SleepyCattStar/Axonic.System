function StatCard({
    title,
    value,
    color
}) {

    return (

            <div className="
                bg-[#090909]
                border
                border-[#1a1a1a]
                rounded-2xl
                p-4
                shadow-[0_0_25px_rgba(255,255,255,0.03)]
                hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]
                hover:border-cyan-400/30
                transition-all
            ">

            <p className="
                text-gray-400
                text-sm
            ">
                {title}
            </p>

            <h3 className={`
                text-3xl
                font-bold
                mt-2
                ${color}
            `}>
                {value}
            </h3>

        </div>
    );
}

export default StatCard;