import useMap from '@libs/client/useMap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { RootState } from '@modules/index';




const KakaoMap = () => {

    const { focusPosition: { latitude, longitude } } = useSelector((state: RootState) => state.map);
    const [map, setMap] = useState(null);
    const dispatch = useDispatch();
    const data = [[33.450701, 126.570667], [33.450701, 126.550667]];
    const mapLoaded = useMap();
    const makeMarker = (lat: number, long: number, map: any) => {
        const marker = new window.kakao.maps.Marker({
            map,
            position: new window.kakao.maps.LatLng(lat, long)
        })

        const markerImage = new window.kakao.maps.MarkerImage(
            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
            new window.kakao.maps.Size(31, 35), new window.kakao.maps.Point(13, 34)
        );
        marker.setImage(markerImage);
    }

    useEffect(() => {

        if (!mapLoaded) return;
        window.kakao.maps.load(() => {
            const container = document.getElementById("map");
            const options = {
                center: new window.kakao.maps.LatLng(latitude, longitude),
                level: 5
            }
            const map = new window.kakao.maps.Map(container, options);
            setMap(map);
            data.forEach(([lat, long]) => makeMarker(lat, long, map));
        });

    }, [mapLoaded]);

    useEffect(() => {
        if (map) {

            (map as any).panTo(new window.kakao.maps.LatLng(latitude, longitude));
        }
    }, [latitude, longitude])




    return <div id="map" style={{ width: "400px", height: "400px" }}></div>
}

export default KakaoMap;