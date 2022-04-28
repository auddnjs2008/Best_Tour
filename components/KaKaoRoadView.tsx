import { useEffect, useState } from 'react';

const KakaoRoadView = () => {

    const [roadviewBox, setRoadviewBox] = useState(null);

    useEffect(() => {
        window.kakao.maps.load(() => {
            const container = document.getElementById("roadview");
            const roadview = new window.kakao.maps.Roadview(container);
            setRoadviewBox(roadview);
        });
    }, [])

    useEffect(() => { console.log(roadviewBox) }, [roadviewBox]);

    return (
        <div id="roadview" className="absolute top-0  w-full h-full bg-slate-400"></div>
    )
}

export default KakaoRoadView;