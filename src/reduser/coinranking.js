import { createSlice } from "@reduxjs/toolkit";

const coinrankingSlice = createSlice({
  name: "coinrankingSlice",
  initialState: {
    coins: {},
    coinInfo: {},
    coinPrice: {},
    loading: false,
    exchanges: {},
  },
  reducers: {
    setCoins(state, action) {
      state.coins = action.payload;
    },
    setCoinInfo(state, action) {
      state.coinInfo = action.payload;
    },
    setCoinPrice(state, action) {
      state.coinPrice = action.payload;
    },
    showloadingCoins(state) {
      state.loading = true;
    },
    hideLoadingCoins(state) {
      state.loading = false;
    },
    setExchanges(state, action) {
      state.exchanges = action.payload;
    },
  },
});

export default coinrankingSlice.reducer;
export const {
  setCoins,
  setCoinInfo,
  setCoinPrice,
  showloadingCoins,
  hideLoadingCoins,
  setExchanges,
} = coinrankingSlice.actions;
