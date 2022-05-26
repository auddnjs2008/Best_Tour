import useMap from '@libs/client/useMap';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@modules/index';
import { focusMap } from "@modules/mapSlice";
import useSWR from 'swr';
import { File, Marker } from '@prisma/client';
import kakaoSearch from '@libs/client/kakaoSearch';
import MarkerController from './MarkerController';


interface IKaKaoMap {
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


const KakaoMap = ({ markers }: IKaKaoMap) => {

    const { focusPosition: { x, y } } = useSelector((state: RootState) => state.map);
    const [map, setMap] = useState(null);
    const centerMarker = useRef<any>(null);
    const dispatch = useDispatch();
    const [selectMarkers, setSelectMarkers] = useState<Marker[] | undefined>(markers);



    const mapLoaded = useMap();

    const makeMarker = ({ latitude: lat, longitude: long, color, name, placeId }: Marker, map: any) => {
        const marker = new window.kakao.maps.Marker({
            map,
            position: new window.kakao.maps.LatLng(lat, long)
        })

        const markerImage = new window.kakao.maps.MarkerImage(
            `/marker/${markerColor[color]}.png`,
            new window.kakao.maps.Size(25, 25), new window.kakao.maps.Point(13, 34)
        );
        window.kakao.maps.event.addListener(marker, "click", () => {
            kakaoSearch(name, placeId, dispatch, map);
            const position = new window.kakao.maps.LatLng(lat, long);
            (map as any).setLevel(3);
            (map as any).setCenter(position);
            centerMarker.current.setPosition(position);

        })
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
                    level: 20
                }
                const map = new window.kakao.maps.Map(container, options);
                centerMarker.current = new window.kakao.maps.Marker({ map });
                centerMarker.current.setPosition(
                    new window.kakao.maps.LatLng(latitude, longitude)
                );
                setMap(map);

                selectMarkers?.forEach((marker) => makeMarker(marker, map));
            })
        });

    }, [mapLoaded, selectMarkers]);

    useEffect(() => {

        if (map) {

            const position = new window.kakao.maps.LatLng(y, x);
            (map as any).setLevel(3);
            (map as any).setCenter(position);
            centerMarker.current.setPosition(position);
        }
    }, [x, y])

    useEffect(() => {
        setSelectMarkers(markers)
    }, [markers])


    return <div className="mx-auto fixed top-0" id="map" style={{ width: "510px", height: "100%" }}>
        <MarkerController markers={markers ? markers : []} setSelectMarkers={setSelectMarkers} />
    </div>

}

export default KakaoMap;