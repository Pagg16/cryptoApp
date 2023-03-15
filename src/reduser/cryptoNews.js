import { createSlice } from "@reduxjs/toolkit";

const cryptoNews = createSlice({
  name: "coinrankingSlice",
  initialState: {
    news: {},
  },
  reducers: {
    setNews(state, action) {
      state.news = action.payload;
    },
  },
});

export default cryptoNews.reducer;
export const { setNews } = cryptoNews.actions;
