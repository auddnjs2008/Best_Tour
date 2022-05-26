import { cls } from '@libs/client/utils';
import { closeImageWindow } from '@modules/LikeSlice';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface IImagesWindow {
    images: string[];
}

const ImagesWindow = ({ images }: IImagesWindow) => {

    const [number, setNumber] = useState(1);
    const dispatch = useDispatch();


    const onCloseClick = () => {
        dispatch(closeImageWindow());
    }
    const onRightClick = () => {
        if (number === images.length) setNumber(1);
        else setNumber(prev => prev + 1);
    }

    const onLeftClick = () => {
        if (number === 1) setNumber(images.length);
        else setNumber(prev => prev - 1);
    }

    const onImageClick = (e: React.MouseEvent<HTMLElement>) => {
        const target = (e.target as any).closest("li");
        if (target) {
            const { dataset: { id } } = target;
            setNumber(parseInt(id));
        }
    }


    return (
        <div className="w-full h-full z-40  fixed top-0 left-0  ">
            <div className="flex relative justify-center items-center  w-full h-full bg-[rgba(0,0,0,0.9)]">
                <button onClick={onCloseClick} className="absolute top-10 right-10  text-white ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="flex relative items-center mb-20 w-[32rem] h-[300px] overflow-hidden bg-yellow-300">
                    <ul style={{ transform: `translateX(${-1 * (number - 1) * 512}px)` }} className={`flex select-none -translate-x-[${(number - 1) * 512}px]`}>
                        {images.map((image, index) =>
                            <li key={index} className="relative max-w-lg w-[32rem] h-[300px] flex-shrink-0 bg-gray-100">
                                <Image src={image} layout="fill" objectFit="contain"></Image>
                            </li>
                        )}

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
                </div>
                <ul onClick={onImageClick} className="select-none w-full h-20 p-2 grid  justify-center gap-10  grid-flow-col absolute bottom-5  ">
                    {images.map((image, index) =>
                        <li key={index} data-id={index + 1} className={cls("relative w-[70px] h-full bg-white", index + 1 === number ? "border-2 border-blue-400" : "")}>
                            <Image src={image} layout="fill" />
                        </li>
                    )}

                </ul>
            </div>
        </div>
    );
}

export default ImagesWindow;