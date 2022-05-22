
import useMap from '@libs/client/useMap';
import { RootState } from '@modules/index';
import { focusMap } from '@modules/mapSlice';
import { searchData } from '@modules/searchSlice';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';

interface FormValue {
    place: string;
}

interface ISearchForm {
    inputFocus: boolean;
    setInputFocus: Dispatch<SetStateAction<boolean>>
}

const SearchForm = ({ inputFocus, setInputFocus }: ISearchForm) => {
    const { register, handleSubmit, resetField, watch } = useForm<FormValue>();
    const mapLoaded = useMap();
    const watchInput = watch("place");
    const dispatch = useDispatch();
    const { focusPosition: { place_name, x, y } } = useSelector((state: RootState) => state.map);


    useEffect(() => {
        if (!watchInput) {
            dispatch(searchData([]));
            return;
        }
        kakaoSearch(watchInput);
    }, [watchInput]);

    const kakaoSearch = (place: string) => {
        window.kakao.maps.load(() => {
            const places = new window.kakao.maps.services.Places();
            const callback = function (result: any, status: any) {
                if (status === window.kakao.maps.services.Status.OK) {
                    dispatch(searchData(result));
                }
            }

            places.keywordSearch(place, callback);
        });
    }

    const onValid = (data: FormValue) => {
        if (!mapLoaded) return;
        const { place } = data;
        //검색기록  기능 api 작성 필요
        kakaoSearch(place);
        resetField("place");
    }

    const onFocus = () => {
        setInputFocus(true);
    }

    const onClick = () => {
        setInputFocus(false);
        resetField("place");
    }

    const onClearFocus = () => {
        dispatch(focusMap({ x, y }));
        resetField("place");
        setInputFocus(false);
    }


    return (
        <form onSubmit={handleSubmit(onValid)} className="realtive max-w-lg w-full mx-auto flex content-center ">
            <input onFocus={onFocus} className=" w-full mx-auto border-2 border-yellow-400 p-3 rounded-md outline-none shadow-lg px-16 "  {...register("place", { required: true })} type="text" placeholder="Search.." />
            {inputFocus ?
                <button onClick={onClick} className="absolute left-5  translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button> : null
            }
            {place_name ?
                <button onClick={onClearFocus} className="absolute right-5 translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button> : null
            }
        </form>
    )
}

export default SearchForm;