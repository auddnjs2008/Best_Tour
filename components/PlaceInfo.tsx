import useMutation from '@libs/client/useMutation';
import { RootState } from '@modules/index';
import { openImageWindow } from '@modules/LikeSlice';
import { openStoreWindow } from '@modules/markerSlice';
import { Marker } from '@prisma/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import ImagesWindow from './ImagesWindow';


export interface IPlaceResponse {
    ok: boolean;
    marker?: Marker;
}

const PlaceInfo = () => {

    const { focusPosition: { id, place_name, address_name, x, y, category_name } } = useSelector((state: RootState) => state.map);
    const { imageWindow } = useSelector((state: RootState) => state.like);
    const dispatch = useDispatch();
    const [infoToggle, setInfoToggle] = useState(false);

    const { data, mutate } = useSWR<IPlaceResponse>(`/api/markers/markInfo?placeId=${id}`);

    const [del] = useMutation("/api/markers/delete");


    const makeImageUrls = (urlString: string) => {
        let urlArr = urlString.split(" ").map(url => `https://imagedelivery.net/gVd53M-5CbHwtF6A9rt30w/${url}/public`);
        return urlArr;
    }

    const onMarkerStoreClick = () => {
        if (data?.ok) {
            //삭제를 해줘야 한다. 
            del({ placeId: id });
        } else {
            dispatch(openStoreWindow());
        }
        mutate(prev => ({ ...prev, ok: !prev?.ok }), false);
    }


    const onImageBoxClick = () => {
        dispatch(openImageWindow());
    }

    const onInfoToggleClick = () => {
        setInfoToggle(prev => !prev);
    }


    const getCategory = (name: string) => {
        const nameArr = name.split("> ");
        return nameArr[nameArr.length - 1];
    }

    useEffect(() => {
        if (infoToggle === true) {
            mutate();
        }
    }, [infoToggle])



    return (
        place_name ?
            <>
                <div className="absolute bottom-20 p-3 z-10 bg-white max-w-lg w-full border-2 border-blue-500">
                    <button onClick={onInfoToggleClick} className="w-full flex justify-center ">
                        {infoToggle ?
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                            </svg>}
                    </button>
                    <div className="flex items-center mb-3" >
                        <h1 className="text-xl mr-3">{place_name}</h1>
                        <h3 className="text-sm">{getCategory(category_name)}</h3>
                    </div>
                    <div className="text-sm">{address_name}</div>
                    <ul className="flex p-3 border-2  mt-3  justify-around">
                        <li className="cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </li>
                        <li className="cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                        </li>
                        <li onClick={onMarkerStoreClick} className={data?.ok ? "cursor-pointer text-blue-500" : "cursor-pointer"}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                        </li>
                    </ul>
                    {infoToggle ?
                        <div className="mt-5">
                            <div onClick={onImageBoxClick} className="w-full mb-5 grid grid-cols-3 grid-rows-2 border-2 h-[230px]">
                                {data?.marker?.imageUrls.split(" ").map((item, index) => <div key={index} className="relative bg-gray-400 w-full border-2" >
                                    <Image layout="fill" src={`https://imagedelivery.net/gVd53M-5CbHwtF6A9rt30w/${item}/public`} />
                                </div>)}
                            </div>
                            <div>{data?.marker?.message}</div>
                        </div>
                        : null}

                </div >
                {data?.marker?.imageUrls && imageWindow ? <ImagesWindow images={makeImageUrls(data?.marker?.imageUrls!)} /> : null}
            </> : null
    )
}

export default PlaceInfo;