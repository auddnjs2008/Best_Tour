import useMutation from '@libs/client/useMutation';
import { RootState } from '@modules/index';
import { closeWindow } from '@modules/LikeSlice';
import { focusMap } from '@modules/mapSlice';
import { RecentSearch } from '@prisma/client';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
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

    const onClick = (e: React.MouseEvent<HTMLUListElement>) => {
        if (e.currentTarget === e.target) return;
        const target = (e.target as Element).closest("li");
        const { id } = target as any;
        if (data && data.length) {
            dispatch(focusMap(data[id]));
            dispatch(closeWindow());
            setInputFocus(false);
            createSearch({ name: data[id].place_name, latitude: data[id].y, longitude: data[id].x, placeId: data[id].id });
        }
    }

    return (
        <div className="absolute z-30 top-14 w-full mx-auto h-[80vh] overflow-scroll scrollbar-hide  bg-white ">
            <div>
                <div className="p-3">
                    <span className="text-lg font-bold mr-5">최근검색</span>
                    <span className="text-sm text-gray-600">즐겨찾기만</span>
                </div>
            </div>
            <ul onClick={onClick}>
                {data && data.length !== 0 ?
                    data.map((item: any, index) => <li id={String(index)} key={item.id} className="text-base cursor-pointer border-t p-3 flex content-center items-center">{item.place_name}</li>) :
                    searchesData?.searches.map((item, index) =>
                        <li id={String(index)} key={index} className="text-base cursor-pointer border-t p-3 flex content-center items-center">
                            <div className="rounded-full w-7 h-7  bg-blue-400 mr-4" />
                            <span>{item.name}</span>
                        </li>
                    )}
            </ul>
        </div>
    )
}

export default SearchInfo;