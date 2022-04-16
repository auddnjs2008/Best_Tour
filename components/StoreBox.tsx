import useMutation from '@libs/client/useMutation';
import { cls } from '@libs/client/utils';
import { RootState } from '@modules/index';
import { openImageWindow } from '@modules/LikeSlice';
import { closeStoreWindow, selectFile } from '@modules/markerSlice';
import { File, Marker } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import ImagesWindow from './ImagesWindow';



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

const StoreBox = () => {

    const { focusPosition: { y: latitude, x: longitude, place_name, id: place_id } } = useSelector((state: RootState) => state.map);
    const { selectFileInfo } = useSelector((state: RootState) => state.marker);
    const { imageWindow } = useSelector((state: RootState) => state.like);
    const dispatch = useDispatch();
    const [file, setFile] = useState<IFolder>();
    const { handleSubmit, register, watch, resetField } = useForm<IStoreSubmit>();
    const [color, setColor] = useState("");
    const [photoPreview, setPhotoPreview] = useState<string[]>([]);

    const photo = watch("files");

    const [markerSave, { data, loading, error }] = useMutation("/api/markers/create");
    const { data: folderData, mutate } = useSWR("/api/folder/foldersInfo");

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


    const getImageId = async (form: FormData, uploadURL: string) => {
        const { result: { id } } = await (await fetch(uploadURL, { method: "POST", body: form })).json()
        return id;
    }

    const onValid = async ({ name, info, files }: IStoreSubmit) => {
        if (!color) return;
        if (photoPreview && photoPreview.length > 0) {
            let imageStack: any[] = [];
            for (let i = 0; i < photo.length; i++) {
                const { uploadURL } = await (await fetch('/api/files')).json();
                const form = new FormData();
                form.append("file", photo[i], name);
                let result = await (getImageId(form, uploadURL));
                imageStack.push(result);
            }

            const imageString = imageStack.join(" ");
            // api로 저장
            markerSave({ fileId: file!.id, message: info, imageUrls: imageString, latitude, longitude, name: place_name, id: place_id, color });
        } else {

            markerSave({ fileId: file!.id, message: info, imageUrls: "", latitude, longitude, name: place_name, id: place_id, color });
        }
    }

    useEffect(() => {
        //사진 개수 제한 필요
        if (photo && photo.length > 0) {
            if (photo.length > 6) {
                alert("사진은 6장 이하까지 가능합니다.");
                resetField("files");
                return;
            }
            const photoArr = Array.from(photo).map((item: Blob) => URL.createObjectURL(item));
            setPhotoPreview(photoArr);
        }
    }, [photo])


    return (
        <>
            <div className="absolute w-full max-w-lg     bottom-1 z-20 space-y-2 bg-white border-2 border-blue-500 p-3">
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
                                <h5 className="text-xs">개수 {selectFileInfo.markers.length}</h5>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onValid)} className="flex flex-col">
                            <input {...register("name", { required: true, value: place_name })} value={place_name} className="outline-none bg-gray-200 p-2 mb-2" type="text" placeholder="이름" />
                            <input {...register("info", { required: true })} className="outline-none bg-gray-200 p-2 mb-2" type="text" placeholder="설명을 입력해 주세요." />
                            <label className=" text-black bg-yellow-400 mb-7 p-2">
                                이미지를 올려주세요
                                <input {...register("files")} className="hidden" type="file" accept="image/*" multiple={true} />
                            </label>
                            {photoPreview.length > 0 ?
                                <button onClick={onPreviewClick} className="ring-yellow-400 ring-2 p-3 mb-10"> 이미지 미리보기</button> : null}
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
                            <button className=" bg-blue-400 p-2 text-white">완료</button>
                        </form>
                    </div>
                    : <div>

                        <ul onClick={onFileClick} className="h-80  overflow-auto">
                            {folderData?.folders.map((folder: IFolder, index: number) =>
                                <li data-id={index} className="flex items-center border-b-2 p-3 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                    </svg>
                                    <div className="ml-5">
                                        <h1 className="text-base">{folder.name}</h1>
                                        <h5 className="text-xs">개수 {folder.markers.length}</h5>
                                    </div>

                                </li>
                            )}
                        </ul>
                        <button className="w-full border-2 p-2 border-blue-500 text-blue-500">새 폴더 추가하기</button>
                    </div>}
            </div>
            {imageWindow ? <ImagesWindow images={photoPreview} /> : null}
        </>
    )
}

export default StoreBox;