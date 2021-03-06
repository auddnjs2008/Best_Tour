import useMutation from '@libs/client/useMutation';
import { cls } from '@libs/client/utils';
import { RootState } from '@modules/index';
import { openImageWindow, toggleWindow } from '@modules/LikeSlice'
import { closeStoreWindow, selectFile } from '@modules/markerSlice';
import { Marker } from '@prisma/client';
import { IallMarkResult } from 'pages';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import useSWR, { KeyedMutator, useSWRConfig, } from 'swr';
import FolderCreateBox from './FolderCreateBox';
import ImagesWindow from './ImagesWindow';
import { IPlaceResponse } from './PlaceInfo';




interface IStoreSubmit {
    name: string;
    info: string;
    files: FileList;
}

interface IFolder {
    id: number;
    name: string;
    userId: string;
    markers: Marker[];
}
interface IStoreBox {
    markersMutate: KeyedMutator<IallMarkResult>
}



const StoreBox = ({ markersMutate }: IStoreBox) => {

    const { focusPosition: { y: latitude, x: longitude, place_name, id: place_id, message, imageUrls, color: initColor } } = useSelector((state: RootState) => state.map);
    const { selectFileInfo } = useSelector((state: RootState) => state.marker);
    const { imageWindow } = useSelector((state: RootState) => state.like);
    const dispatch = useDispatch();
    const { handleSubmit, register, watch, resetField, setValue } = useForm<IStoreSubmit>();
    const [color, setColor] = useState("");
    const [createFolder, setCreateFolder] = useState(false);
    const [photoPreview, setPhotoPreview] = useState<string[]>([]);
    const [imageLoad, setImageLoad] = useState(false);

    const photo = watch("files");



    const [markerSave, { data, loading, error }] = useMutation("/api/markers/create");
    const { data: folderData, mutate } = useSWR("/api/folder/foldersInfo");
    const { data: markerData, mutate: markerMutate } = useSWR<IPlaceResponse>(`/api/markers/markInfo?placeId=${place_id}`);


    const [deletePhotos] = useMutation("/api/delImages");

    const onCloseClick = () => {
        dispatch(closeStoreWindow());
    }

    const onFileClick = (e: React.MouseEvent<HTMLElement>) => {
        const target = (e.target as any).closest("li");
        if (target) {
            const { dataset: { id } } = target;
            const file = folderData.folders[parseInt(id)];
            dispatch(selectFile(file));
        }
    }

    const onColorClick = (e: React.MouseEvent<HTMLElement>) => {
        const target = (e.target as any).closest("li");
        if (target) {
            const { dataset: { id } } = target;
            setColor(id);
        }
    }
    const onPreviewClick = () => {
        dispatch(openImageWindow());
    }

    const onCloseFolderCreate = () => {
        setCreateFolder(false);
    }

    const onFolderCreateClick = () => {
        setCreateFolder(true);
    }


    const getImageId = (form: FormData, uploadURL: string) => {
        return fetch(uploadURL, { method: "POST", body: form }).then(res => res.json());
    }

    const delImages = async () => {

        const imageIds = imageUrls.split(" ");
        deletePhotos({ imageIds });

    }

    const onValid = async ({ name, info, files }: IStoreSubmit) => {
        if (!color || loading || imageLoad) return;
        // ?????? photoPreview ??? blob??? ???????????? ?????? ????????? ?????? ??? ????????? ????????? ?????? ?????????
        if (imageUrls && photoPreview[0].includes("blob")) {
            await delImages();
        }

        let imageString = "";

        if (photoPreview && photoPreview.length > 0) {
            setImageLoad(true);
            let fetchArr: any[] = [];
            for (let i = 0; i < photo.length; i++) {
                const fetchItem = fetch('/api/files').then(res => res.json());
                fetchArr.push(fetchItem);
            }
            const datas = await Promise.all(fetchArr);
            const idFetches: any[] = [];
            datas.forEach((data, i) => {
                const form = new FormData();
                form.append("file", photo[i], name);
                idFetches.push(getImageId(form, data.uploadURL));
            })

            imageString = (await Promise.all(idFetches)).map(item => item.result.id).join(" ");
            setImageLoad(false);
            // api??? ??????
        }
        const saveData = { fileId: selectFileInfo!.id, message: info, imageUrls: imageString, latitude, longitude, name: place_name, id: place_id, color };
        markerSave(saveData);
        markerMutate({
            ok: true,
            marker:
            {
                id: 1, userId: 1, message: info, name: place_name, color,
                latitude, longitude, placeId: place_id, createdAt: new Date, updatedAt: new Date,
                fileId: selectFileInfo!.id, imageUrls: imageString
            }
        }, false);

        markersMutate((prev: any) => ({
            ok: true,
            markers: [...prev?.markers!,
            {
                id: 1, userId: 1, message: info, name: place_name, color,
                latitude, longitude, placeId: place_id, createdAt: new Date, updatedAt: new Date,
                fileId: selectFileInfo!.id, imageUrls: imageString
            }]
        }), false);
    }


    useEffect(() => {
        //?????? ?????? ?????? ??????
        if (photo && photo.length > 0) {


            if (photo.length > 4) {
                alert("????????? 4??? ???????????? ???????????????.");
                resetField("files");
                return;
            }
            const photoArr = Array.from(photo).map((item: Blob) => URL.createObjectURL(item));

            setPhotoPreview(photoArr);
        }
    }, [photo])




    useEffect(() => {

        if (initColor) {
            setColor(initColor);
        }
    }, [initColor]);

    useEffect(() => {
        if (imageUrls) {
            const fixedUrls = imageUrls.split(" ").map((url: string) => `https://imagedelivery.net/gVd53M-5CbHwtF6A9rt30w/${url}/public`)
            setPhotoPreview(fixedUrls);

        }
    }, [imageUrls]);


    useEffect(() => {
        if (data?.ok) {
            dispatch(closeStoreWindow());
        }
    }, [data])

    useEffect(() => {
        if (createFolder === false) {
            mutate();
        }
    }, [createFolder])

    useEffect(() => {
        if (place_name) {
            setValue("name", place_name);
        }
        if (message) {
            setValue("info", message);
        }
    }, [place_name, message])

    return (
        <>
            <div className="fixed w-full max-w-lg  bottom-1 z-40 space-y-2 bg-white border-2 border-blue-500 p-3">
                <button onClick={onCloseClick} >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {selectFileInfo ?
                    <div className="">
                        <div className="flex items-center p-3 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                            </svg>
                            <div className="ml-5">
                                <h1 className="text-base">{selectFileInfo.name}</h1>
                                <h5 className="text-xs">?????? {selectFileInfo.markers.length}</h5>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onValid)} className="flex flex-col">
                            <input {...register("name", { required: true })} className="outline-none bg-gray-200 p-2 mb-2" type="text" placeholder="??????" />
                            <input {...register("info", { required: true })} className="outline-none bg-gray-200 p-2 mb-2" type="text" placeholder="????????? ????????? ?????????." />
                            <label className=" text-black bg-yellow-400 mb-7 p-2">
                                ???????????? ???????????????
                                <input {...register("files")} className="hidden" type="file" accept="image/*" multiple={true} />
                            </label>
                            {photoPreview.length > 0 ?
                                <button type="button" onClick={onPreviewClick} className="ring-yellow-400 ring-2 p-3 mb-10"> ????????? ????????????</button>
                                :
                                null
                            }
                            <ul onClick={onColorClick} className="flex space-x-2 mb-20">
                                <li data-id="#FF3D00" className={cls("rounded-full w-7 h-7 bg-[#FF3D00]", color === "#FF3D00" ? "ring-[#FF3D00] ring-2 border-2 border-white" : "")}></li>
                                <li data-id="#E67E33" className={cls("rounded-full w-7 h-7 bg-[#E67E33]", color === "#E67E33" ? "ring-[#E67E33] ring-2 border-2 border-white" : "")}></li>
                                <li data-id="#F1C40F" className={cls("rounded-full w-7 h-7 bg-[#F1C40F]", color === "#F1C40F" ? "ring-[#F1C40F] ring-2 border-2 border-white" : "")}></li>
                                <li data-id="#2ECC71" className={cls("rounded-full w-7 h-7 bg-[#2ECC71]", color === "#2ECC71" ? "ring-[#2ECC71] ring-2 border-2 border-white" : "")}></li>
                                <li data-id="#1ABC9C" className={cls("rounded-full w-7 h-7 bg-[#1ABC9C]", color === "#1ABC9C" ? "ring-[#1ABC9C] ring-2 border-2 border-white" : "")}></li>
                                <li data-id="#3498DB" className={cls("rounded-full w-7 h-7 bg-[#3498DB]", color === "#3498DB" ? "ring-[#3498DB] ring-2 border-2 border-white" : "")}></li>
                                <li data-id="#9B59B6" className={cls("rounded-full w-7 h-7 bg-[#9B59B6]", color === "#9B59B6" ? "ring-[#9B59B6] ring-2 border-2 border-white" : "")}></li>
                                <li data-id="#000000" className={cls("rounded-full w-7 h-7 bg-[#000000]", color === "#000000" ? "ring-[#000000] ring-2 border-2 border-white" : "")}></li>
                            </ul>
                            <button className=" bg-blue-400 p-2 text-white">{imageLoad || loading ? "loading..." : "??????"}</button>
                        </form>
                    </div>
                    : <div>

                        <ul onClick={onFileClick} className="h-80  overflow-auto">
                            {folderData?.folders.map((folder: IFolder, index: number) =>
                                <li key={index} data-id={index} className="flex items-center border-b-2 p-3 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                    </svg>
                                    <div className="ml-5">
                                        <h1 className="text-base">{folder.name}</h1>
                                        <h5 className="text-xs">?????? {folder.markers.length}</h5>
                                    </div>

                                </li>
                            )}
                        </ul>
                        <button onClick={onFolderCreateClick} className="w-full border-2 p-2 border-blue-500 text-blue-500">??? ?????? ????????????</button>
                    </div>}
            </div>
            {imageWindow ? <ImagesWindow images={photoPreview} /> : null}
            {createFolder ? <FolderCreateBox onCloseFolderCreate={onCloseFolderCreate} /> : null}
        </>
    )
}

export default StoreBox;