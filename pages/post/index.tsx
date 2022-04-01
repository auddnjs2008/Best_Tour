
import KakaoMap from '@components/KakaoMap';
import Search from '@components/Search/Search';

import { NextPage } from 'next';



const Postes: NextPage = () => {

    return (
        <div className="">
            <Search />
            <div className="flex">
                <KakaoMap latitude={33.450701} longitude={126.570667} />
            </div>
        </div>
    )

}

export default Postes