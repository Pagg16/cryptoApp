import axios from "axios";
import { hideLoading, showLoading } from "../reduser/appReduser";
import { setCoinInfo, setCoinPrice, setCoins } from "../reduser/coinranking";

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

export function getCoins() {
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
    dispatch(showLoading());
    try {
      const response = await axios.request(cloneOptions);

      if (response.status === 200) {
        dispatch(setCoins(response.data));
      } else {
        alert("error get");
      }
    } catch (e) {
      console.log(e);
      alert(e.response?.data.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export function getCoinInfo(uid, period) {
  const cloneOptions = Object.assign({}, options);
  cloneOptions.url = baseUrl + "/coin/" + uid;
  cloneOptions.params = {
    referenceCurrencyUuid: "yhjMzLPhuIDl",
    timePeriod: period,
  };

  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await axios.request(cloneOptions);

      if (response.status === 200) {
        dispatch(setCoinInfo(response.data));
      } else {
        alert("error get");
      }
    } catch (e) {
      console.log(e);
      alert(e.response?.data.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export function getCoinPrice(uid, period) {
  const cloneOptions = Object.assign({}, options);
  cloneOptions.url = baseUrl + "/coin/" + uid + "/history";
  cloneOptions.params = {
    referenceCurrencyUuid: "yhjMzLPhuIDl",
    timePeriod: period,
  };

  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await axios.request(cloneOptions);

      if (response.status === 200) {
        dispatch(setCoinPrice(response.data));
      } else {
        alert("error get");
      }
    } catch (e) {
      console.log(e);
      alert(e.response?.data.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}
