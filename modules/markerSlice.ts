import { File, Marker } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FileWithMarkers extends File {
  markers: Marker[];
}

export interface MarkerState {
  storeWindow: boolean;
  selectFileInfo: FileWithMarkers | null;
  filterMarkersInfo: Marker[] | null;
}

const initialState: MarkerState = {
  storeWindow: false,
  selectFileInfo: null,
  filterMarkersInfo: null,
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
    setfilterMarkers: (state, action: PayloadAction<Marker[]>) => {
      state.filterMarkersInfo = action.payload;
    },
  },
});

export const {
  openStoreWindow,
  closeStoreWindow,
  selectFile,
  setfilterMarkers,
} = markerSlice.actions;
export default markerSlice.reducer;
