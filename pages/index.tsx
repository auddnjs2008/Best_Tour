
import KakaoMap from '@components/KakaoMap';
import Layout from '@components/Layout';
import PlaceInfo from '@components/PlaceInfo';
import Search from '@components/Search/Search';
import StoreBox from '@components/StoreBox';
import { RootState } from '@modules/index';
import { GetServerSideProps, NextPage } from 'next';
import { useSelector } from 'react-redux';
import useSWR from "swr";
import { Marker } from '@prisma/client';



export interface IallMarkResult {
    ok: boolean;
    markers: Marker[]
}



const PlaceStore: NextPage = () => {

    const { storeWindow } = useSelector((state: RootState) => state.marker);
    const { data: markerData, mutate: markersMutate } = useSWR<IallMarkResult>("/api/markers/allMark");


    return (
        <Layout>
            <div className="w-full">
                <Search />
                <KakaoMap markers={markerData?.ok ? markerData?.markers : []} />
                {storeWindow ? <StoreBox markersMutate={markersMutate} /> : null}
                <PlaceInfo />
            </div>
        </Layout>
    )

}


export default PlaceStore;