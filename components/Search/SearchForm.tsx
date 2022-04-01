import useLocalSwr from '@libs/client/useLocalSwr';
import useMap from '@libs/client/useMap';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

interface FormValue {
    place: string;
}


const SearchForm = () => {
    const { register, handleSubmit, resetField, watch } = useForm<FormValue>();
    const mapLoaded = useMap();
    const watchInput = watch("place");
    const { data, mutate } = useLocalSwr("searchData");

    useEffect(() => {
        if (watchInput)
            kakaoSearch(watchInput);
    }, [watchInput]);

    const kakaoSearch = (place: string) => {
        window.kakao.maps.load(() => {
            const places = new window.kakao.maps.services.Places();
            const callback = function (result: any, status: any) {
                if (status === window.kakao.maps.services.Status.OK) {
                    mutate(result);
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




    return (
        <form onSubmit={handleSubmit(onValid)} className=" flex content-center ">
            <input className=" w-full mx-auto border-2 p-3 rounded-md outline-none shadow-lg "  {...register("place", { required: true })} type="text" placeholder="Search.." />
        </form>
    )
}

export default SearchForm;