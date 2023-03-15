import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReduser from "./appReduser";
import coinranking from "./coinranking";
import cryptoNews from "./cryptoNews";

const rootReduser = combineReducers({
  coins: coinranking,
  app: appReduser,
  news: cryptoNews,
});

export const store = configureStore({ reducer: rootReduser });
