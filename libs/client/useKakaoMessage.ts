import { useEffect, useState } from "react";

export default function useKaKaoMessage() {
  const [messageLoaded, setMessageLoaded] = useState(false);

  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.async = true;

    mapScript.src = `https://developers.kakao.com/sdk/js/kakao.js`;
    mapScript.addEventListener("load", () => setMessageLoaded(true));
    document.head.appendChild(mapScript);
    return () =>
      mapScript.removeEventListener("load", () => setMessageLoaded(true));
  }, []);

  return messageLoaded;
}
