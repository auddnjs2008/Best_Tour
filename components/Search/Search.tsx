import useLocalSwr from '@libs/client/useLocalSwr';
import { useState } from 'react';
import useSWR from 'swr';
import SearchForm from './SearchForm';
import SearchRecord from './SearchRecord';

const Search = () => {
    const { data, mutate } = useLocalSwr("searchData");

    return (
        <div className="max-w-lg border-2 mx-auto">
            <SearchForm />
            <SearchRecord />
        </div>
    )
}

export default Search;