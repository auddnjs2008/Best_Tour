import useMap from '@libs/client/useMap';
import useMutation from '@libs/client/useMutation';
import useUser from '@libs/client/useUser';
import client from '@libs/server/client';
import { focusMap } from '@modules/mapSlice';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import useSWR from 'swr';
import { PostWithUser } from './PostBox';
import ReplyBox from './ReplyBox';


interface IPostResponse {
    // ok: boolean;
    post: PostWithUser;
}

const PostDetail = ({ post }: IPostResponse) => {

    const [number, setNumber] = useState(1);
    const { user } = useUser();
    const mapLoaded = useMap();
    const router = useRouter();
    const dispatch = useDispatch();
    // const { data } = useSWR<IPostResponse>(`/api/post/postInfo?id=${router.query.id ? router.query.id : ""}`);
    const [delMutate, { data: delData }] = useMutation("/api/post/delete");


    const onDelClick = () => {
        delMutate({ boardId: post.id });
    }


    const onRightClick = () => {
        if (number === post.imageUrls.split(" ").length) setNumber(1);
        else setNumber(prev => prev + 1);
    }

    const onLeftClick = () => {
        if (number === 1) setNumber(post.imageUrls ? post.imageUrls.split(" ").length : 1);
        else setNumber(prev => prev - 1);
    }

    const onMoveMapClick = () => {
        if (!mapLoaded) return;
        window.kakao.maps.load(() => {
            const places = new window.kakao.maps.services.Places();
            const callback = function (result: any, status: any) {
                if (status === window.kakao.maps.services.Status.OK) {
                    // 전송을 해줘야 한다.

                    if (result.length === 1) {
                        setTimeout(() => { dispatch(focusMap(result[0])); }, 500);

                    } else {
                        const realPlace = result.find((item: any) =>
                            item.road_address_name === post.address || item.address_name === post.address);
                        if (!realPlace) {
                            alert("등록된 장소가 없습니다.");
                            return;
                        }
                        setTimeout(() => { dispatch(focusMap(realPlace)); }, 3000);
                    }
                    router.push("/placeStore");

                } else {
                    alert("장소를 발견하지 못했습니다. 주소나 이름을 다시 써주세요");
                }
            };

            places.keywordSearch(post.placeName, callback);
        });
    }

    useEffect(() => {
        if (!delData) return;
        if (delData.ok) {
            router.push("/placeBoard");
        } else {
            alert("삭제하는데 실패하였습니다.");
        }
    }, [delData])


    if (router.isFallback) {
        return <div>
            <header className="z-20 bg-white fixed max-w-lg w-full top-0 text-center border-2 p-3 border-yellow-400">Loading...</header>
        </div>
    }

    return (
        <div>
            <header className="z-20 bg-white fixed max-w-lg w-full top-0 text-center border-2 p-3 border-yellow-400">{post.title}</header>
            <div className="mt-16 pb-20 ">
                <div className="mb-14 text-center relative">
                    <div>
                        <h1 className="mb-5 text-xl font-semibold text-blue-400">{post.placeName}</h1>
                        <div>{post.address}</div>
                    </div>
                    <div className="flex justify-end mt-2">
                        <button onClick={onMoveMapClick} className=" flex border-2 rounded-md p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            지도보기
                        </button>
                        {user?.id === post.userId ?
                            <button onClick={onDelClick} className="flex items-center border-2 p-2 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-red-500 h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                삭제
                            </button>
                            : null
                        }
                    </div>
                </div>
                {post.imageUrls ?
                    <div className="flex relative items-center mb-10 w-[32rem] h-[300px] overflow-hidden ">
                        <ul style={{ transform: `translateX(${-1 * (number - 1) * 512}px)` }} className={`flex select-none -translate-x-[${(number - 1) * 512}px]`}>
                            {post.imageUrls.split(" ").map((image, index) =>
                                <li key={index} className="relative max-w-lg w-[32rem] h-[300px] flex-shrink-0 bg-gray-100">
                                    <Image src={`https://imagedelivery.net/gVd53M-5CbHwtF6A9rt30w/${image}/public`} layout="fill" objectFit="contain"></Image>

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
                    :
                    null}
                <p className="p-2 leading-7 select-none ">
                    {post.Message}
                </p>
            </div>
            <ReplyBox />
        </div>
    )

}







export default PostDetail;