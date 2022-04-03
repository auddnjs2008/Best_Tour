
import useMap from '@libs/client/useMap';
import { searchData } from '@modules/searchSlice';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';

interface FormValue {
    place: string;
}

interface ISearchForm {
    setInputFocus: Dispatch<SetStateAction<boolean>>
}

const SearchForm = ({ setInputFocus }: ISearchForm) => {
    const { register, handleSubmit, resetField, watch } = useForm<FormValue>();
    const mapLoaded = useMap();
    const watchInput = watch("place");
    const dispatch = useDispatch();



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




    return (
        <form onSubmit={handleSubmit(onValid)} className="max-w-lg mx-auto flex content-center ">
            <input onFocus={onFocus} className=" w-full mx-auto border-2 p-3 rounded-md outline-none shadow-lg "  {...register("place", { required: true })} type="text" placeholder="Search.." />
        </form>
    )
}

export default SearchForm;