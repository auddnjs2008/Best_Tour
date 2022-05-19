import { focusMap } from "@modules/mapSlice";
import { Dispatch } from "react";

const kakaoSearch = (
  place: string,
  placeId: string | null,
  dispatch: Dispatch<any>,
  map: any
) => {
  window.kakao.maps.load((result: any) => {
    const places = new window.kakao.maps.services.Places();
    const callback = function (result: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        const data = placeId
          ? result.find((item: any) => item.id === placeId)
          : result[0];
        dispatch(focusMap(data));
      }
    };

    places.keywordSearch(place, callback);
  });
};

export default kakaoSearch;
