import { createSlice } from "@reduxjs/toolkit";

const appReduser = createSlice({
  name: "coinrankingSlice",
  initialState: {
    loading: false,
  },
  reducers: {
    showLoading(state) {
      state.loading = true;
    },
    hideLoading(state) {
      state.loading = false;
    },
  },
});

export default appReduser.reducer;
export const { showLoading, hideLoading } = appReduser.actions;
