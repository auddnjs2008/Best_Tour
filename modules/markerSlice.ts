import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MarkerState {
  storeWindow: boolean;
}

const initialState: MarkerState = {
  storeWindow: false,
};

export const markerSlice = createSlice({
  name: "marker",
  initialState,
  reducers: {
    openStoreWindow: (state) => {
      state.storeWindow = true;
    },
    closeStoreWindow: (state) => {
      state.storeWindow = false;
    },
  },
});

export const { openStoreWindow, closeStoreWindow } = markerSlice.actions;
export default markerSlice.reducer;
