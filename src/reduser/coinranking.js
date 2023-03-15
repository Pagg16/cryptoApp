import { createSlice } from "@reduxjs/toolkit";

const coinrankingSlice = createSlice({
  name: "coinrankingSlice",
  initialState: {
    coins: {},
  },
  reducers: {
    setCoins(state, action) {
      state.coins = action.payload;
    },
  },
});

export default coinrankingSlice.reducer;
export const { setCoins } = coinrankingSlice.actions;
