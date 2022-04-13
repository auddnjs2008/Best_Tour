import { useEffect, useState } from 'react';

interface IImagesWindow {
    images: string[];
}

const ImagesWindow = ({ images }: IImagesWindow) => {

    const [number, setNumber] = useState(1);

    const onRightClick = () => {
        if (number === images.length) setNumber(1);
        else setNumber(prev => prev + 1);
    }

    const onLeftClick = () => {
        if (number === 1) setNumber(images.length);
        else setNumber(prev => prev - 1);
    }

    useEffect(() => {
        console.log(number);
    }, [number]);

    return (
        <div className="w-full h-full  absolute top-0 left-0 bg-orange-100 ">
            <div className="flex relative justify-center items-center  w-full h-full overflow-hidden bg-black">
                <ul className={`flex  -translate-x-[${(number - 1) * 32}rem] `}>
                    <li className="max-w-lg w-[32rem] h-[300px] flex-shrink-0 bg-gray-100"></li>
                    <li className="max-w-lg w-[32rem] h-[300px] flex-shrink-0  bg-green-300"></li>
                    <li className="max-w-lg w-[32rem] h-[300px] flex-shrink-0 bg-blue-300"></li>
                </ul>
                <div onClick={onLeftClick} className="absolute top-1/2 left-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </div>
                <div onClick={onRightClick} className="absolute top-1/2  right-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
                <ul className="w-full h-20 p-2 grid  gap-2  grid-flow-col-dense absolute bottom-5 border-2 ">
                    <li className="w-full h-full bg-white"></li>
                    <li className="w-full h-full bg-white"></li>
                </ul>
            </div>
        </div>
    );
}

export default ImagesWindow;