import { RootState } from '@modules/index';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


interface IKakaoRoadView {
    setRoadview: Dispatch<SetStateAction<boolean>>
}

const KakaoRoadView = ({ setRoadview }: IKakaoRoadView) => {

    const [roadviewBox, setRoadviewBox] = useState(null);
    const { focusPosition, focusPosition: { y, x, place_name, place_url, address_name } } = useSelector((state: RootState) => state.map);

    console.log(focusPosition);
    const onClose = () => {
        setRoadview(false);
    }

    useEffect(() => {
        window.kakao.maps.load(() => {
            const container = document.getElementById("roadview");
            const roadview = new window.kakao.maps.Roadview(container);
            setRoadviewBox(roadview);
        });
    }, [])

    useEffect(() => {
        if (!roadviewBox || !focusPosition) return;

        const position = new window.kakao.maps.LatLng(y, x);
        const roadviewClient = new window.kakao.maps.RoadviewClient();

        let content = '<div  class="overlay_info">';
        content += `<a href="${place_url}" target="_blank"><strong>${place_name}</strong></a>`;
        content += ' <div class="desc">';
        content += `<span class="address">${address_name}</span>`;
        content += ' </div>';
        content += '</div>';

        roadviewClient.getNearestPanoId(position, 50, function (panoId: any) {
            (roadviewBox as any).setPanoId(panoId, position);
        })

        window.kakao.maps.event.addListener(roadviewBox, "init", () => {

            const rvCustomOverlay = new window.kakao.maps.CustomOverlay({
                position,
                content
            })
            rvCustomOverlay.setMap(roadviewBox);

            const projection = (roadviewBox as any).getProjection();

            const viewPoint = projection.viewpointFromCoords(rvCustomOverlay.getPosition(), rvCustomOverlay.getAltitude());

            (roadviewBox as any).setViewpoint(viewPoint);

        })

    }, [roadviewBox]);

    return (
        <div>
            <div id="roadview" className=" z-20 fixed left-0 top-0 w-[100vw] h-[100vh] bg-slate-400">
            </div>
            <button onClick={onClose} className="absolute z-50 right-5 top-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    )
}

export default KakaoRoadView;