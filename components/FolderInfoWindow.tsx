import useMutation from '@libs/client/useMutation';
import { closeWindow } from '@modules/LikeSlice';
import { focusMap } from '@modules/mapSlice';
import { openStoreWindow, selectFile } from '@modules/markerSlice';
import { File, Marker } from '@prisma/client';
import { withCoalescedInvoke } from 'next/dist/lib/coalesced-function';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useSWR from 'swr';


interface FileWithMarker extends File {
    markers: Marker[]
}

interface FixMarkInfo {
    message: null | string;
    imageUrls: null | string;
    color: null | string;
}

interface IFolderInfoWindow {
    folderInfo: FileWithMarker;
    setFolderInfo: React.Dispatch<React.SetStateAction<FileWithMarker | null>>;
    onFileInfoCloseClick: () => void;
}

const FolderInfoWindow = ({ folderInfo, setFolderInfo, onFileInfoCloseClick }: IFolderInfoWindow) => {

    const dispatch = useDispatch();
    const router = useRouter();

    const [semiInfoWindowIndex, setSemiInfoWindowIndex] = useState(-1);
    const [alarmWindow, setAlarmWindow] = useState(false);
    const [delMutate] = useMutation("/api/markers/delete");
    const { mutate: allMarkMutate } = useSWR("/api/markers/allMark");


    const getPlaceInfo = (name: string, semiInfo: FixMarkInfo | null = null) => {
        const places = new window.kakao.maps.services.Places();
        const callback = function (result: any, status: any) {
            if (status === window.kakao.maps.services.Status.OK) {
                if (semiInfo) {
                    dispatch(focusMap({ ...result[0], message: semiInfo.message, imageUrls: semiInfo.imageUrls, color: semiInfo.color }));
                } else {
                    dispatch(focusMap({ ...result[0] }));
                }
            }
        }
        places.keywordSearch(name, callback);

    }

    const deleteFolder = () => {
        console.log(folderInfo);
    }

    const deleteMarker = (index: number) => {
        const placeId = folderInfo.markers[index].placeId;
        const markers = [...folderInfo.markers];
        allMarkMutate((prev: any) => ({ ok: true, markers: prev.markers.filter((marker: any) => marker.placeId !== placeId) }), false);
        delMutate({ placeId });
        markers.splice(index, 1);
        setFolderInfo({ ...folderInfo, markers });
        setSemiInfoWindowIndex(-1);
    }

    const fixMarker = (index: number) => {
        let marker = { ...folderInfo.markers[index] };
        //storeBox 와 관련해서 데이터 수정해줘야 함  focusMap 필요
        //x:longitude , y:latitude, place_name, id 
        getPlaceInfo(marker.name, { message: marker.message, imageUrls: marker.imageUrls, color: marker.color });
        dispatch(selectFile(folderInfo));
        dispatch(openStoreWindow());
        dispatch(closeWindow());

    }

    const onMarkerClick = (e: React.MouseEvent<HTMLElement>) => {
        const target = (e.target as any).closest("li");
        const semiBtn = (e.target as any).closest("#semi");
        const delBtn = (e.target as any).closest("#delete");
        const fixBtn = (e.target as any).closest("#fix");
        const { dataset: { id } } = target;

        if (delBtn) {
            deleteMarker(parseInt(id));
            return;
        }

        if (fixBtn) {

            fixMarker(parseInt(id));
            return;
        }

        if (semiBtn) {
            setSemiInfoWindowIndex(semiInfoWindowIndex === parseInt(id) ? -1 : parseInt(id));
            return;
        }
        if (target) {

            const marker = folderInfo.markers[parseInt(id)];
            router.pathname !== "/placeStore" ? setTimeout(() => getPlaceInfo(marker.name), 500) : getPlaceInfo(marker.name);
            onFileInfoCloseClick();
            dispatch(closeWindow());
            if (router.pathname !== "/placeStore") router.push("/placeStore");
        }
    }

    return (
        <div className="absolute w-full h-[99%] max-w-lg     bottom-1 z-20 space-y-2 bg-white border-2 border-blue-500 p-3">
            <header className="mb-10">
                <div className="mb-5  flex justify-between items-center">
                    <button onClick={onFileInfoCloseClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div className=" w-16 flex justify-between items-center">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                        </button>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className=" text-center">
                    <h1 className="text-2xl font-semibold">{folderInfo.name}</h1>
                    <p className="text-sm">{folderInfo.info}</p>
                    <button className="flex absolute top-14 right-5 border-2 border-blue-500 p-1 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        삭제
                    </button>
                </div>
            </header>
            <ul onClick={onMarkerClick} className="w-full h-[70%]   overflow-auto">
                {folderInfo.markers.map((marker, index) =>
                    <li data-id={index} key={marker.id} className="w-full cursor-pointer grid grid-cols-[35px_1fr_30px] items-center border-t-[0.7px] p-3">
                        <div className={`bg-[${marker.color}] mr-5 text-white  w-6 h-6 rounded-full flex justify-center items-center`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-base">{marker.name}</div>
                            <p className="text-xs">{marker.message}</p>
                        </div>
                        <button id="semi" className="">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </button>
                        {index === semiInfoWindowIndex ?
                            <div className="flex justify-around mt-3 border-2 max-w-lg w-[28rem]">
                                <div id="fix" className="w-1/2 text-center hover:bg-yellow-400">수정</div>
                                <div id="delete" className="w-1/2 text-center hover:bg-yellow-400">삭제</div>
                            </div>
                            : null}
                    </li>)}
            </ul>
            <div className="w-full h-full fixed -top-2 left-0 bg-slate-500">
                <div>알람창입니다.</div>
            </div>
        </div>
    )
}

export default FolderInfoWindow;