import { cls } from '@libs/client/utils';
import { File, Marker } from '@prisma/client';
import React, { Dispatch, SetStateAction, useState } from 'react';
import useSWR from 'swr';



interface IMarkerController {
    markers: Marker[];
    setSelectMarkers: Dispatch<SetStateAction<Marker[] | undefined>>
}
interface IFolderResponse {
    ok: boolean;
    folders: File[]
}

const MarkerController = ({ markers, setSelectMarkers }: IMarkerController) => {

    const [isColor, setIsColor] = useState(true);
    const [color, setColor] = useState("");
    const [folderId, setFolderId] = useState("");
    const [openWindow, setOpenWindow] = useState(false);

    const { data } = useSWR<IFolderResponse>("/api/folder/foldersInfo");


    const getFilterMarkers = (isFile: boolean, keyword: string) => {
        let result;
        if (isFile) {
            result = markers.filter(marker => marker.fileId === +keyword);
        } else {
            result = markers.filter(marker => marker.color === keyword);
        }
        return result;
    }


    const onHeaderClick = (e: React.MouseEvent<HTMLHeadElement>) => {

        if ((e.target as HTMLElement).tagName === "DIV") {

            const title = (e.target as HTMLElement).innerText;
            title === "색깔" ? setIsColor(true) : setIsColor(false);

        }
    }


    const onColorClick = (e: React.MouseEvent<HTMLUListElement>) => {

        if ((e.target as HTMLElement).tagName === "LI") {
            const { dataset: { id } } = (e.target as HTMLElement);
            if (id !== color) {
                setColor(id!);
                const filterMarkers = getFilterMarkers(false, id ? id : "");
                setSelectMarkers(filterMarkers);
            } else {
                setColor("");
                setSelectMarkers(markers);
            }
            setFolderId("");
        }
    }

    const onFolderClick = (e: React.MouseEvent<HTMLUListElement>) => {
        if ((e.target as HTMLElement).tagName === "LI") {
            const { dataset: { fileid } } = (e.target as HTMLElement);
            if (fileid !== folderId) {
                setFolderId(fileid ? fileid : "");
                const filterMarkers = getFilterMarkers(true, fileid ? fileid : "");
                setSelectMarkers(filterMarkers);
            } else {
                setFolderId("");
                setSelectMarkers(markers);
            }
            setColor("");
        }
    }

    const onWindowToggle = () => {
        setOpenWindow(prev => !prev);
    }

    return (
        <div className="absolute top-0 right-0 z-30 p-1 border-2 border-blue-400 bg-white">
            <button className="w-full flex justify-center items-center" onClick={onWindowToggle}>
                {openWindow ?
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>}
            </button>
            {openWindow ?
                <>
                    <header onClick={onHeaderClick} className="flex mb-2 justify-center  items-center text-sm cursor-pointer">
                        <div className={cls("mr-2", isColor ? "text-base font-semibold" : "")}>색깔</div>
                        <div className={cls(isColor ? "" : "text-base font-semibold")}>파일</div>
                    </header>
                    <div className=" flex justify-center items-center p-2">
                        {isColor ?
                            <ul onClick={onColorClick} className=" space-y-1">
                                <li data-id="#FF3D00" className={cls("rounded-full w-5 h-5 bg-[#FF3D00]", color === "#FF3D00" ? "ring-[#FF3D00] ring-2 border-2 border-white" : "")}></li>
                                <li data-id="#E67E33" className={cls("rounded-full w-5 h-5 bg-[#E67E33]", color === "#E67E33" ? "ring-[#E67E33] ring-2 border-2 border-white" : "")}></li>
                                <li data-id="#F1C40F" className={cls("rounded-full w-5 h-5 bg-[#F1C40F]", color === "#F1C40F" ? "ring-[#F1C40F] ring-2 border-2 border-white" : "")}></li>
                                <li data-id="#2ECC71" className={cls("rounded-full w-5 h-5 bg-[#2ECC71]", color === "#2ECC71" ? "ring-[#2ECC71] ring-2 border-2 border-white" : "")}></li>
                                <li data-id="#1ABC9C" className={cls("rounded-full w-5 h-5 bg-[#1ABC9C]", color === "#1ABC9C" ? "ring-[#1ABC9C] ring-2 border-2 border-white" : "")}></li>
                                <li data-id="#3498DB" className={cls("rounded-full w-5 h-5 bg-[#3498DB]", color === "#3498DB" ? "ring-[#3498DB] ring-2 border-2 border-white" : "")}></li>
                                <li data-id="#9B59B6" className={cls("rounded-full w-5 h-5 bg-[#9B59B6]", color === "#9B59B6" ? "ring-[#9B59B6] ring-2 border-2 border-white" : "")}></li>
                                <li data-id="#000000" className={cls("rounded-full w-5 h-5 bg-[#000000]", color === "#000000" ? "ring-[#000000] ring-2 border-2 border-white" : "")}></li>
                            </ul>
                            :
                            <ul onClick={onFolderClick} className="text-sm font-semibold">
                                {data?.folders.map(folder =>
                                    <li data-fileId={folder.id} className={cls("cursor-pointer", +folderId === folder.id ? "text-yellow-400" : "")}>{folder.name}</li>
                                )}
                            </ul>
                        }
                    </div>
                </>
                :
                <div className="text-sm">필터</div>
            }
        </div>
    )


}

export default MarkerController;