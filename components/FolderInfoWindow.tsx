import { File, Marker } from '@prisma/client';


interface FileWithMarker extends File {
    markers: Marker[]
}

interface IFolderInfoWindow {
    folderInfo: FileWithMarker;
    onFileInfoCloseClick: () => void;
}

const FolderInfoWindow = ({ folderInfo, onFileInfoCloseClick }: IFolderInfoWindow) => {

    return (
        <div className="absolute w-full h-[99%] max-w-lg     bottom-1 z-20 space-y-2 bg-white border-2 border-blue-500 p-3">
            <header className="mb-10">
                <div className="mb-5 border-2 flex justify-between items-center">
                    <button onClick={onFileInfoCloseClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div className=" w-16 flex justify-between items-center">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path stroke-linecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                        </button>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="border-2 text-center">
                    <h1 className="text-2xl font-semibold">{folderInfo.name}</h1>
                    <p className="text-sm">{folderInfo.info}</p>
                </div>
            </header>
            <ul>
                {[{ name: "a", id: 1, message: "asdf" }, { name: "a", id: 1, message: "asdf" }, { name: "a", id: 1, message: "asdf" }].map(marker =>
                    <li key={marker.id}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path stroke-linecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        </div>
                        <div>
                            <div>{marker.name}</div>
                            <p>{marker.message}</p>
                        </div>
                    </li>)}
            </ul>
        </div>
    )
}

export default FolderInfoWindow;