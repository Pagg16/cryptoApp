import { createSlice } from "@reduxjs/toolkit";

const cryptoNews = createSlice({
  name: "coinrankingSlice",
  initialState: {
    news: {},
    typeNews: "cryptocurrency",
  },
  reducers: {
    setNews(state, action) {
      state.news = action.payload;
    },
    typeNewsSet(state, action) {
      state.typeNews = action.payload;
    },
  },
});

export default cryptoNews.reducer;
export const { setNews, typeNewsSet } = cryptoNews.actions;
