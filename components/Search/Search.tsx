
import useLocalSwr from '@libs/client/useLocalSwr';
import useMutation from '@libs/client/useMutation';
import { RootState } from '@modules/index';
import { closeWindow } from '@modules/LikeSlice';
import { focusMap } from '@modules/mapSlice';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import SearchForm from './SearchForm';
import SearchInfo, { ISearchesResponse } from './SearchInfo';


const Search = () => {

    const [inputFocus, setInputFocus] = useState(false);
    const [keyIndex, setKeyIndex] = useState(0); // -2 일경우 엔터를 누른 케이스 이다. 
    const [recentSearch, setRecentSearch] = useState(true);
    const [length, setLength] = useState(0);
    const [enter, setEnter] = useState(false);
    const data = useSelector((state: RootState) => state.search.data);


    const { data: searchesData } = useSWR<ISearchesResponse>("/api/recentSearch/getInfo");
    const [createSearch] = useMutation("/api/recentSearch/create");

    const dispatch = useDispatch();

    const onClick = (e: any) => {
        if (e.currentTarget !== e.target) return;
        setInputFocus(false);
    }

    const onKeyClick = useCallback((e: any) => {
        const { key } = e;
        if (key === "ArrowDown") {
            setKeyIndex(prev => prev + 1);
        } else if (key === "ArrowUp") {
            setKeyIndex(prev => prev - 1);
        } else if (key === "Enter") {
            setEnter(true);
        }
    }, []);

    useEffect(() => {
        const newLength = data.length ? data.length : !recentSearch ? searchesData?.searches.filter(item => item.isMarker).length
            : searchesData?.searches.length;
        if (!newLength) return;
        setLength(newLength);
        setKeyIndex(0);

    }, [data, searchesData, recentSearch])


    useEffect(() => {
        if (keyIndex === -1) {
            setKeyIndex(length - 1);
        } else if (keyIndex === length) {
            setKeyIndex(0);
        }

    }, [keyIndex]);

    useEffect(() => {
        if (enter) {
            if (data.length > 0 || (searchesData && searchesData.searches.length > 0)) {
                const newData = data.length > 0 ? data[keyIndex] : recentSearch ? searchesData!.searches[keyIndex] :
                    searchesData!.searches.filter(item => item.isMarker)[keyIndex];
                dispatch(focusMap(newData));
                dispatch(closeWindow());
                setInputFocus(false);
                createSearch(newData);
                setTimeout(() => { setEnter(false) }, 1000);


            }
        }
    }, [enter]);

    useEffect(() => {

        window.removeEventListener("keydown", onKeyClick);

        if (inputFocus) {
            window.addEventListener("keydown", onKeyClick,);

        } else {
            window.removeEventListener("keydown", onKeyClick);
        }
    }, [inputFocus, length])


    return (
        <div onClick={onClick} className="w-full  mx-auto relative  z-20">
            <SearchForm inputFocus={inputFocus} setInputFocus={setInputFocus} />
            {inputFocus ? <SearchInfo recentSearch={recentSearch} setRecentSearch={setRecentSearch} keyIndex={keyIndex} setInputFocus={setInputFocus} /> : null}

        </div>
    )
}

export default Search;