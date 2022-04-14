import { configureStore } from "@reduxjs/toolkit";

import searchReducer from "./searchSlice";
import mapReducer from "./mapSlice";
import likeReducer from "./LikeSlice";
import markerReducer from "./markerSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    map: mapReducer,
    like: likeReducer,
    marker: markerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
