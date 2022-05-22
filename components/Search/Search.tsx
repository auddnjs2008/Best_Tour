
import useLocalSwr from '@libs/client/useLocalSwr';
import { useEffect, useState } from 'react';
import SearchForm from './SearchForm';
import SearchInfo from './SearchInfo';


const Search = () => {

    const [inputFocus, setInputFocus] = useState(false);

    const onClick = (e: any) => {
        if (e.currentTarget !== e.target) return;
        setInputFocus(false);
    }


    return (
        <div onClick={onClick} className="w-full  mx-auto relative  z-20">
            <SearchForm inputFocus={inputFocus} setInputFocus={setInputFocus} />
            {inputFocus ? <SearchInfo setInputFocus={setInputFocus} /> : null}
        </div>
    )
}

export default Search;