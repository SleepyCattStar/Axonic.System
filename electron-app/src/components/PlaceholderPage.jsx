function PlaceholderPage({ title }) {

    return (

        <div className="
            flex
            flex-col
            items-center
            justify-center
            h-full
            text-gray-500
        ">

            <div className="text-8xl mb-4">
                🙂
            </div>

            <h2 className="
                text-3xl
                font-semibold
            ">
                {title}
            </h2>

        </div>
    );
}

export default PlaceholderPage;