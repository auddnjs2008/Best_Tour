import { File, Marker } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import FolderCreateBox from './FolderCreateBox';
import FolderInfoWindow from './FolderInfoWindow';


interface FileWithMarker extends File {
    markers: Marker[]
}

interface IFoldersResult {
    ok: boolean;
    folders: FileWithMarker[];
}

const LikeWindow = () => {

    const { data } = useSWR<IFoldersResult>("/api/folder/foldersInfo");
    const [createFolder, setCreateFolder] = useState(false);
    const [folderInfo, setFolderInfo] = useState<FileWithMarker | null>(null);
    const onCloseFolderCreate = () => {
        setCreateFolder(false);
    }

    const onOpenFolderCreate = () => {
        setCreateFolder(true);
    }

    const onFileClick = (e: React.MouseEvent<HTMLElement>) => {
        const target = (e.target as any).closest("li");
        if (target) {
            const { dataset: { id } } = target;
            setFolderInfo(data?.folders[parseInt(id)]!);
        }
    }

    const onFileInfoCloseClick = () => {
        setFolderInfo(null);
    }

    useEffect(() => {
        console.log(folderInfo);
    }, [folderInfo])

    return (
        <>
            <div className="absolute w-full max-w-lg bottom-16 z-20 space-y-2 bg-white border-2 border-blue-500 p-3">
                <button className="w-full flex justify-center align-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                </button>
                <div className="flex justify-between w-full ">
                    <div>폴더 {data?.folders?.length}</div>
                    <div className="flex ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        <span>편집하기</span>
                    </div>
                </div>
                <ul onClick={onFileClick}>
                    {data?.folders.map((folder, index) =>
                        <li data-id={index} key={folder.id} className="flex cursor-pointer items-center border-b-2 p-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                            </svg>
                            <div className="ml-5">
                                <h1 className="text-base">{folder.name}</h1>
                                <h5 className="text-xs">개수 {folder.markers.length}</h5>
                            </div>
                            <p className="ml-5 text-sm">{folder.info}</p>
                        </li>
                    )}
                </ul>
                <button onClick={onOpenFolderCreate} className="w-full border-2 p-2 border-blue-500 text-blue-500">새 폴더 추가하기</button>
            </div>
            {createFolder ? <FolderCreateBox onCloseFolderCreate={onCloseFolderCreate} /> : null}
            {folderInfo ? <FolderInfoWindow onFileInfoCloseClick={onFileInfoCloseClick} folderInfo={folderInfo} /> : null}
        </>
    )
}

export default LikeWindow;