import { File, Marker } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FileWithMarkers extends File {
  markers: Marker[];
}

export interface MarkerState {
  storeWindow: boolean;
  selectFileInfo: FileWithMarkers | null;
}

const initialState: MarkerState = {
  storeWindow: false,
  selectFileInfo: null,
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
    selectFile: (state, action: PayloadAction<FileWithMarkers>) => {
      state.selectFileInfo = action.payload;
    },
  },
});

export const { openStoreWindow, closeStoreWindow, selectFile } =
  markerSlice.actions;
export default markerSlice.reducer;
