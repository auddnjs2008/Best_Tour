import useMap from '@libs/client/useMap';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@modules/index';
import { focusMap } from "@modules/mapSlice";
import useSWR from 'swr';
import { Marker } from '@prisma/client';




interface IallMarkResult {
    ok: boolean;
    markers: Marker[]
}

interface ImarkerColor {
    [index: string]: string
}

const markerColor: ImarkerColor = {
    "#FF3D00": "빨강",
    "#E67E33": "주황",
    "#F1C40F": "노랑",
    "#2ECC71": "초록",
    "#1ABC9C": "청록",
    "#3498DB": "파랑",
    "#9B59B6": "보라",
    "#000000": "검정"

}


const KakaoMap = () => {

    const { focusPosition: { x, y } } = useSelector((state: RootState) => state.map);
    const [map, setMap] = useState(null);
    const centerMarker = useRef<any>(null);

    const { data: markerData } = useSWR<IallMarkResult>("/api/markers/allMark");

    const data = [[33.450701, 126.570667], [33.450701, 126.550667]];
    const mapLoaded = useMap();

    const makeMarker = (lat: number, long: number, map: any, color: string) => {
        const marker = new window.kakao.maps.Marker({
            map,
            position: new window.kakao.maps.LatLng(lat, long)
        })

        const markerImage = new window.kakao.maps.MarkerImage(
            `/marker/${markerColor[color]}.png`,
            new window.kakao.maps.Size(20, 20), new window.kakao.maps.Point(13, 34)
        );
        marker.setImage(markerImage);
    }


    useEffect(() => {

        if (!mapLoaded) return;
        window.kakao.maps.load(() => {
            const container = document.getElementById("map");
            navigator.geolocation.getCurrentPosition((position) => {
                const { coords: { latitude, longitude } } = position;

                const options = {
                    center: new window.kakao.maps.LatLng(latitude, longitude),
                    level: 5
                }
                const map = new window.kakao.maps.Map(container, options);
                centerMarker.current = new window.kakao.maps.Marker({ map });
                setMap(map);
                markerData?.markers.forEach(({ latitude, longitude, color }) => makeMarker(latitude, longitude, map, color));
            })
        });

    }, [mapLoaded]);

    useEffect(() => {

        if (map) {
            (map as any).panTo(new window.kakao.maps.LatLng(y, x));
            (map as any).setLevel(3);
            centerMarker.current.setPosition(new window.kakao.maps.LatLng(y, x));
        }
    }, [x, y])




    return <div className="mx-auto mt-5" id="map" style={{ width: "500px", height: "400px" }}></div>

}

export default KakaoMap;