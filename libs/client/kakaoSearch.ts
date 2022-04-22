import { focusMap } from "@modules/mapSlice";
import { Dispatch } from "react";
import { useDispatch } from "react-redux";

const kakaoSearch = (
  place: string,
  placeId: string,
  dispatch: Dispatch<any>
) => {
  window.kakao.maps.load((result: any) => {
    const places = new window.kakao.maps.services.Places();
    const callback = function (result: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        const data = result.find((item: any) => item.id === placeId);
        dispatch(focusMap(data));
      }
    };

    places.keywordSearch(place, callback);
  });
};

export default kakaoSearch;
