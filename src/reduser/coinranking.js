import { createSlice } from "@reduxjs/toolkit";

const coinrankingSlice = createSlice({
  name: "coinrankingSlice",
  initialState: {
    coins: {},
    coinInfo: {},
  },
  reducers: {
    setCoins(state, action) {
      state.coins = action.payload;
    },
    setCoinInfo(state, action) {
      state.coinInfo = action.payload;
    },
  },
});

export default coinrankingSlice.reducer;
export const { setCoins, setCoinInfo } = coinrankingSlice.actions;
