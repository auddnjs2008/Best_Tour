import { useState } from "react";

const PostDetail = () => {

    const [number, setNumber] = useState(1);

    const onRightClick = () => {
        if (number === [1, 2, 3].length) setNumber(1);
        else setNumber(prev => prev + 1);
    }

    const onLeftClick = () => {
        if (number === 1) setNumber([1, 2, 3].length);
        else setNumber(prev => prev - 1);
    }

    return (
        <div className="mt-16 pb-20 ">
            <div className="mb-14 text-center">
                <h1 className="mb-5 text-xl font-semibold text-blue-400">안동주</h1>
                <div>경기도 안산시 단원구 고잔동 524-3</div>
            </div>
            <div className="flex relative items-center mb-10 w-[32rem] h-[300px] overflow-hidden ">
                <ul style={{ transform: `translateX(${-1 * (number - 1) * 512}px)` }} className={`flex select-none -translate-x-[${(number - 1) * 512}px]`}>
                    {[1, 2, 3].map(image =>
                        <li className="relative max-w-lg w-[32rem] h-[300px] flex-shrink-0 bg-gray-100">
                            {/* <Image src={image} layout="fill" objectFit="contain"></Image> */}
                            <div className="w-full h-full bg-gray-400"></div>
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
            <p className="p-2 leading-7 select-none ">
                여기는 정말 술 먹기 딱 좋은 안주집입니다. 꼭 오셔야 하구요 여자친구랑 데이트하러 꼭 필수 코스 입니다.
                저는 여기서 밤새 술을 마셨습니다. 안주는 문어찜이 최고입니다. 정말 말이 필요없습니다.
                그래서 사실 저는 밤샐 겁니다. 하루종일 여기서도 저기서도 저기서도 그래서도 아닙니다. 꼬꼮꼬꼬꼬
                꼬고 닭ㅊ 치킨이 먹고 싶은 밤입니다. 하루종일 여기서 꼬꼬딹 먹고싶어요 ㅗㄲ꼬꼬꼬꼬꼮꼬꼬
                꼬꼬꼬꼬꼬 꼬꼬딹 달다거리ㅏ 머니알 ㅓㅣ마ㅓㄴㅇ리ㅏ
            </p>
        </div>
    )

}

export default PostDetail;