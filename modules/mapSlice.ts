import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type positionType = { latitude: number; longitude: number };

export interface MapState {
  focusPosition: positionType;
}

const initialState: MapState = {
  focusPosition: { latitude: 0, longitude: 0 },
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    focusMap: (state, action: PayloadAction<positionType>) => {
      state.focusPosition = action.payload;
    },
  },
});

export const { focusMap } = mapSlice.actions;

export default mapSlice.reducer;
