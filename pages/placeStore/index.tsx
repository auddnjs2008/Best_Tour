
import KakaoMap from '@components/KakaoMap';
import Layout from '@components/Layout';
import PlaceInfo from '@components/PlaceInfo';
import Search from '@components/Search/Search';
import StoreBox from '@components/StoreBox';
import { RootState } from '@modules/index';

import { NextPage } from 'next';
import { useSelector } from 'react-redux';




const PlaceStore: NextPage = () => {

    const { storeWindow } = useSelector((state: RootState) => state.marker);
    return (
        <Layout>
            <div className="w-full">
                <Search />
                <KakaoMap />
                {storeWindow ? <StoreBox /> : null}
                <PlaceInfo />
            </div>
        </Layout>
    )

}

export default PlaceStore