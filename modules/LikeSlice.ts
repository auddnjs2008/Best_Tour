import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LikeState {
  likeWindow: boolean;
}

const initialState: LikeState = {
  likeWindow: false,
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
  },
});

export const { toggleWindow, closeWindow } = likeSlice.actions;

export default likeSlice.reducer;
