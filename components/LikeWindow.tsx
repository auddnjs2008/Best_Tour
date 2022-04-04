
const LikeWindow = () => {

    return (
        <div className="absolute w-full max-w-lg bottom-16 z-20 space-y-2 bg-white border-2 border-blue-500 p-3">
            <button className="w-full flex justify-center align-middle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
            </button>
            <div className="flex justify-between w-full ">
                <div>폴더 1</div>
                <div className="flex ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <span>편집하기</span>
                </div>
            </div>
            <ul>
                {[1].map(item =>
                    <li className="flex items-center border-b-2 p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                        </svg>
                        <div className="ml-5">
                            <h1 className="text-base">기본폴더</h1>
                            <h5 className="text-xs">개수 11/500</h5>
                        </div>

                    </li>
                )}
            </ul>
            <button className="w-full border-2 p-2 border-blue-500 text-blue-500">새 폴더 추가하기</button>
        </div>
    )
}

export default LikeWindow;