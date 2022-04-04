import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MapState {
  focusPosition: any;
}

const initialState: MapState = {
  focusPosition: { latitude: 0, longitude: 0 },
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    focusMap: (state, action: PayloadAction<any>) => {
      state.focusPosition = action.payload;
    },
  },
});

export const { focusMap } = mapSlice.actions;

export default mapSlice.reducer;
