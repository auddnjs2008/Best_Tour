import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ImagesWindow from './ImagesWindow';



interface IStoreSubmit {
    name: string;
    info: string;
    files: FileList;
}


const StoreBox = () => {

    const [file, setFile] = useState(true);
    const { handleSubmit, register, watch } = useForm<IStoreSubmit>();
    const [color, setColor] = useState("");
    const [photoPreview, setPhotoPreview] = useState<string[]>([]);
    const [prephotoWindow, setPrePhotoWindow] = useState(false);
    const photo = watch("files");

    const onFileClick = (e: React.MouseEvent<HTMLElement>) => {
        const target = (e.target as any).closest("li");
        if (target) {
            //setFile("이름");
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
        setPrePhotoWindow(true);
    }

    const onValid = async (data: IStoreSubmit) => {
        if (!color) return;
        const { uploadURL } = await (await fetch('/api/files')).json();
        const form = new FormData();
    }

    useEffect(() => {
        if (photo && photo.length > 0) {
            const photoArr = Array.from(photo).map((item: Blob) => URL.createObjectURL(item));
            setPhotoPreview(photoArr);
        }
    }, [photo])


    return (
        <div className="absolute w-full max-w-lg     bottom-1 z-20 space-y-2 bg-white border-2 border-blue-500 p-3">
            <button >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {file ?
                <div className="">
                    <div className="flex items-center p-3 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                        </svg>
                        <div className="ml-5">
                            <h1 className="text-base">기본폴더</h1>
                            <h5 className="text-xs">개수 11/500</h5>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onValid)} className="flex flex-col">
                        <input {...register("name", { required: true })} className="outline-none bg-gray-200 p-2 mb-2" type="text" placeholder="이름" />
                        <input {...register("info", { required: true })} className="outline-none bg-gray-200 p-2 mb-2" type="text" placeholder="설명을 입력해 주세요." />
                        <label className=" text-black bg-yellow-400 mb-7 p-2">
                            이미지를 올려주세요
                            <input {...register("files")} className="hidden" type="file" accept="image/*" multiple={true} />
                        </label>
                        {photoPreview.length > 0 ?
                            <button onClick={onPreviewClick} className="ring-yellow-400 ring-2 p-3 mb-10"> 이미지 미리보기</button> : null}
                        <ul onClick={onColorClick} className="flex space-x-2 mb-20">
                            <li data-id="#FF3D00" className="rounded-full w-7 h-7 bg-[#FF3D00]"></li>
                            <li data-id="#E67E33" className="rounded-full w-7 h-7 bg-[#E67E22]"></li>
                            <li data-id="#F1C40F" className="rounded-full w-7 h-7 bg-[#F1C40F]"></li>
                            <li data-id="#2ECC71" className="rounded-full w-7 h-7 bg-[#2ECC71]"></li>
                            <li data-id="#1ABC9C" className="rounded-full w-7 h-7 bg-[#1ABC9C]"></li>
                            <li data-id="#3498DB" className="rounded-full w-7 h-7 bg-[#3498DB]"></li>
                            <li data-id="#9B59B6" className="rounded-full w-7 h-7 bg-[#9B59B6]"></li>
                            <li data-id="#000000" className="rounded-full w-7 h-7 bg-[#000000]"></li>
                        </ul>
                        <button className=" bg-blue-400 p-2 text-white">완료</button>
                    </form>
                    {prephotoWindow ? <ImagesWindow images={["d", "d", "d"]} /> : null}
                </div>
                : <div>

                    <ul onClick={onFileClick} className="h-80  overflow-auto">
                        {[1, 2, 3, 4, 5, 6].map(item =>
                            <li className="flex items-center border-b-2 p-3 cursor-pointer">
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
                </div>}
        </div>
    )
}

export default StoreBox;