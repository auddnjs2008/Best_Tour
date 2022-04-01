
const SearchRecord = () => {

    return (
        <div className="w-full h-[100vh] overflow-scroll scrollbar-hide  bg-white z-10">
            <div>
                <div className="p-3">
                    <span className="text-lg font-bold mr-5">최근검색</span>
                    <span className="text-sm text-gray-600">즐겨찾기만</span>
                </div>
            </div>
            <ul>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) =>
                    <li key={index} className="text-base border-t p-3 flex content-center items-center">
                        <div className="rounded-full w-7 h-7  bg-blue-400 mr-4" />
                        <span>{item}</span>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default SearchRecord;