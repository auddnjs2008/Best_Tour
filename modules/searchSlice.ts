import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SearchState {
  data: any[];
}

const initialState: SearchState = {
  data: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const { searchData } = searchSlice.actions;

export default searchSlice.reducer;
