import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LikeState {
  likeWindow: boolean;
  imageWindow: boolean;
}

const initialState: LikeState = {
  likeWindow: false,
  imageWindow: false,
};

export const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    toggleWindow: (state) => {
      state.likeWindow = !state.likeWindow;
    },
    closeWindow: (state) => {
      state.likeWindow = false;
    },
    closeImageWindow: (state) => {
      state.imageWindow = false;
    },
    openImageWindow: (state) => {
      state.imageWindow = true;
    },
  },
});

export const { toggleWindow, closeWindow, closeImageWindow, openImageWindow } =
  likeSlice.actions;

export default likeSlice.reducer;
