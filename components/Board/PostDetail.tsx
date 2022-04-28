import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from "react";
import useSWR from 'swr';
import { PostWithUser } from './PostBox';


interface IPostResponse {
    ok: boolean;
    post: PostWithUser;
}

const PostDetail = () => {

    const [number, setNumber] = useState(1);
    const router = useRouter();
    const { data } = useSWR<IPostResponse>(`/api/post/postInfo?id=${router.query.id ? router.query.id : ""}`);


    const onRightClick = () => {
        if (number === data?.post.imageUrls.split(" ").length) setNumber(1);
        else setNumber(prev => prev + 1);
    }

    const onLeftClick = () => {
        if (number === 1) setNumber(data?.post.imageUrls ? data?.post.imageUrls.split(" ").length : 1);
        else setNumber(prev => prev - 1);
    }

    return (
        <div className="mt-16 pb-20 ">
            <div className="mb-14 text-center">
                <h1 className="mb-5 text-xl font-semibold text-blue-400">{data?.post.placeName}</h1>
                <div>{data?.post.address}</div>
            </div>
            <div className="flex relative items-center mb-10 w-[32rem] h-[300px] overflow-hidden ">
                <ul style={{ transform: `translateX(${-1 * (number - 1) * 512}px)` }} className={`flex select-none -translate-x-[${(number - 1) * 512}px]`}>
                    {data?.post.imageUrls.split(" ").map(image =>
                        <li className="relative max-w-lg w-[32rem] h-[300px] flex-shrink-0 bg-gray-100">
                            <Image src={`https://imagedelivery.net/gVd53M-5CbHwtF6A9rt30w/${image}/public`} layout="fill" objectFit="contain"></Image>
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
                {data?.post.Message}
            </p>
        </div>
    )

}

export default PostDetail;