
import KakaoMap from '@components/KakaoMap';
import Layout from '@components/Layout';
import PlaceInfo from '@components/PlaceInfo';
import Search from '@components/Search/Search';
import StoreBox from '@components/StoreBox';
import { RootState } from '@modules/index';
import { GetServerSideProps, NextPage } from 'next';
import { useSelector } from 'react-redux';
import useSWR, { SWRConfig } from "swr";
import { withIronSessionSsr } from 'iron-session/next';
import client from '@libs/server/client';
import { File, Marker, User } from '@prisma/client';
import { useEffect } from 'react';



interface MarkerWithFile extends Marker {
    file: File
}

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


// const Page: NextPage<{ markers: MarkerWithFile[] }> = ({ markers }) => {
//     return (
//         <SWRConfig
//             value={{
//                 fallback: {
//                     "/api/markers/allMark": {
//                         ok: true,
//                         markers
//                     }
//                 }
//             }}
//         >
//             <PlaceStore />
//         </SWRConfig>

//     )
// }

// export const getServerSideProps = withIronSessionSsr(async function ({ req, res }) {

//     const markers = await client.marker.findMany({
//         where: {
//             userId: (req.session as any).user.id,
//         },
//         include: {
//             file: true,
//         }
//     });


//     return {
//         props: {
//             markers: JSON.parse(JSON.stringify(markers))
//         }
//     }

// }, {
//     cookieName: "besttoursession",
//     password: process.env.SESSION_KEY!,
// })

export default PlaceStore;