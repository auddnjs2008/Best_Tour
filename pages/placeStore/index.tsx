
import KakaoMap from '@components/KakaoMap';
import Layout from '@components/Layout';
import PlaceInfo from '@components/PlaceInfo';
import Search from '@components/Search/Search';
import StoreBox from '@components/StoreBox';

import { NextPage } from 'next';



const PlaceStore: NextPage = () => {

    return (
        <Layout>
            <div className="w-full">
                <Search />
                <KakaoMap />
                <StoreBox />
                <PlaceInfo />
            </div>
        </Layout>
    )

}

export default PlaceStore