
import KakaoMap from '@components/KakaoMap';
import Search from '@components/Search/Search';

import { NextPage } from 'next';



const Postes: NextPage = () => {

    return (
        <div className="">
            <Search />
            <div className="flex">
                <KakaoMap />
            </div>
        </div>
    )

}

export default Postes