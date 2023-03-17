import axios from "axios";
import { hideLoading, showLoading } from "../reduser/appReduser";
import {
  hideLoadingCoins,
  setCoinInfo,
  setCoinPrice,
  setCoins,
  showloadingCoins,
} from "../reduser/coinranking";

const baseUrl = "https://coinranking1.p.rapidapi.com";

const options = {
  method: "GET",
  url: "",
  params: {},
  headers: {
    "X-RapidAPI-Key": "570f0ed2cdmsh30dc44b8e51f7b7p18bb4ajsn19eabb1c5b1f",
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  },
};

export function getCoins(res, rej) {
  const cloneOptions = Object.assign({}, options);
  cloneOptions.url = baseUrl + "/coins";
  cloneOptions.params = {
    referenceCurrencyUuid: "yhjMzLPhuIDl",
    timePeriod: "24h",
    "tiers[0]": "1",
    orderBy: "marketCap",
    orderDirection: "desc",
    limit: "50",
    offset: "0",
  };

  return async (dispatch) => {
    try {
      const response = await axios.request(cloneOptions);

      if (response.status === 200) {
        await dispatch(setCoins(response.data));
        res();
      } else {
        alert("error get coins");
      }
    } catch (e) {
      rej();
      console.log(e);
      alert(e.response?.data.message);
    } finally {
    }
  };
}

export function getCoinInfo(uid, period, res, rej) {
  const cloneOptions = Object.assign({}, options);
  cloneOptions.url = baseUrl + "/coin/" + uid;
  cloneOptions.params = {
    referenceCurrencyUuid: "yhjMzLPhuIDl",
    timePeriod: period,
  };

  return async (dispatch) => {
    try {
      const response = await axios.request(cloneOptions);

      if (response.status === 200) {
        await dispatch(setCoinInfo(response.data));
        res();
      } else {
        alert("error get");
      }
    } catch (e) {
      rej();
      console.log(e);
      alert(e.response?.data.message);
    }
  };
}

export function getCoinPrice(uid, period, res, rej) {
  const cloneOptions = Object.assign({}, options);
  cloneOptions.url = baseUrl + "/coin/" + uid + "/history";
  cloneOptions.params = {
    referenceCurrencyUuid: "yhjMzLPhuIDl",
    timePeriod: period,
  };

  return async (dispatch) => {
    try {
      const response = await axios.request(cloneOptions);

      if (response.status === 200) {
        await dispatch(setCoinPrice(response.data));
        res();
      } else {
        alert("error get");
      }
    } catch (e) {
      rej();
      console.log(e);
      alert(e.response?.data.message);
    }
  };
}
