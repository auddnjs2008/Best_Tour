import useMutation from '@libs/client/useMutation';
import { cls } from '@libs/client/utils';
import { RootState } from '@modules/index';
import { closeWindow } from '@modules/LikeSlice';
import { focusMap } from '@modules/mapSlice';
import { RecentSearch } from '@prisma/client';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';


interface ISearchInfo {
    setInputFocus: Dispatch<SetStateAction<boolean>>
}

interface ISearchesResponse {
    ok: boolean;
    searches: RecentSearch[];
}

const SearchInfo = ({ setInputFocus }: ISearchInfo) => {

    const data = useSelector((state: RootState) => state.search.data);
    const dispatch = useDispatch();

    const [createSearch] = useMutation("/api/recentSearch/create");
    const { data: searchesData } = useSWR<ISearchesResponse>("/api/recentSearch/getInfo");

    const [recentSearch, setRecentSearch] = useState(true);

    const onKindClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).tagName === "SPAN") {
            const text = (e.target as HTMLElement).innerText;
            text === "최근검색" ? setRecentSearch(true) : setRecentSearch(false);
        }
    }

    const onClick = (e: React.MouseEvent<HTMLUListElement>) => {
        if (e.currentTarget === e.target) return;
        const target = (e.target as Element).closest("li");
        const { id } = target as any;
        if (data.length > 0 || searchesData!.searches.length > 0) {
            dispatch(focusMap(data.length > 0 ? data[id] : searchesData!.searches[id]));
            dispatch(closeWindow());
            setInputFocus(false);
            createSearch(data.length > 0 ? data[id] : searchesData!.searches[id]);
        }

    }

    return (
        <div className="absolute max-w-lg z-30 top-16 w-full mx-auto h-[100vh] overflow-scroll scrollbar-hide  bg-white ">
            <div>
                <div onClick={onKindClick} className="p-3">
                    <span className={cls("  mr-5 cursor-pointer", recentSearch ? "text-lg font-bold" : "text-sm text-gray-600")}>최근검색</span>
                    <span className={cls("cursor-pointer", recentSearch ? "text-sm text-gray-600" : "font-bold text-lg")}>즐겨찾기만</span>
                </div>
            </div>
            <ul onClick={onClick}>
                {data && data.length !== 0 ?
                    data.map((item: any, index) =>
                        <li id={String(index)} key={item.id} className="text-base cursor-pointer border-t p-3 flex content-center items-center">{item.place_name}</li>)
                    :
                    searchesData?.searches.map((item, index) =>
                        <li id={String(index)} key={index} className={cls(!item.isMarker && !recentSearch ? "hidden" : "border-t", "text-base cursor-pointer  p-3 flex content-center items-center")}>
                            {item.isMarker ?
                                <div className="rounded-full w-7 h-7 flex justify-center items-center border-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                                :
                                recentSearch ?
                                    <div className="rounded-full w-7 h-7">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    :
                                    null

                            }
                            {recentSearch ?
                                <span className="ml-5">{item.place_name}</span>
                                :
                                (item.isMarker ? <span className="ml-5">{item.place_name}</span> : null)
                            }
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default SearchInfo;