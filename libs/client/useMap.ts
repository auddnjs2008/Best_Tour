import { useEffect, useState } from "react";

export default function useMap() {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.async = true;

    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services`;
    mapScript.addEventListener("load", () => setMapLoaded(true));
    document.head.appendChild(mapScript);

    return () =>
      mapScript.removeEventListener("load", () => setMapLoaded(true));
  }, []);

  return mapLoaded;
}
