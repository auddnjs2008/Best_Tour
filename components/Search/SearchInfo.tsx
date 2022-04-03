import { RootState } from '@modules/index';
import { focusMap } from '@modules/mapSlice';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


interface ISearchInfo {
    setInputFocus: Dispatch<SetStateAction<boolean>>
}

const SearchInfo = ({ setInputFocus }: ISearchInfo) => {

    const data = useSelector((state: RootState) => state.search.data);
    const dispatch = useDispatch();
    const onClick = (e: React.MouseEvent<HTMLUListElement>) => {
        if (e.currentTarget === e.target) return;
        const target = (e.target as Element).closest("li");
        const { id } = target as any;
        if (data && data.length) {
            const { x, y } = data[id];
            dispatch(focusMap({ latitude: y, longitude: x }));
            setInputFocus(false);
        }
    }



    return (
        <div className="max-w-lg mx-auto h-[100vh] overflow-scroll scrollbar-hide  bg-white z-10">
            <div>
                <div className="p-3">
                    <span className="text-lg font-bold mr-5">최근검색</span>
                    <span className="text-sm text-gray-600">즐겨찾기만</span>
                </div>
            </div>
            <ul onClick={onClick}>
                {data && data.length !== 0 ?
                    data.map((item: any, index) => <li id={String(index)} key={item.id} className="text-base cursor-pointer border-t p-3 flex content-center items-center">{item.place_name}</li>) :
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) =>
                        <li id={String(index)} key={index} className="text-base cursor-pointer border-t p-3 flex content-center items-center">
                            <div className="rounded-full w-7 h-7  bg-blue-400 mr-4" />
                            <span>{item}</span>
                        </li>
                    )}
            </ul>
        </div>
    )
}

export default SearchInfo;