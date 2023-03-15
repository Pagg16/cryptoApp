import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReduser from "./appReduser";
import coinranking from "./coinranking";

const rootReduser = combineReducers({
  coins: coinranking,
  app: appReduser,
});

export const store = configureStore({ reducer: rootReduser });
