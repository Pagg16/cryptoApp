import axios from "axios";
import { hideLoading, showLoading } from "../reduser/appReduser";
import { setCoins } from "../reduser/coinranking";

const baseUrl = "https://coinranking1.p.rapidapi.com";

const options = {
  method: "GET",
  url: "",
  params: {
    referenceCurrencyUuid: "yhjMzLPhuIDl",
    timePeriod: "24h",
    "tiers[0]": "1",
    orderBy: "marketCap",
    orderDirection: "desc",
    limit: "50",
    offset: "0",
  },
  headers: {
    "X-RapidAPI-Key": "570f0ed2cdmsh30dc44b8e51f7b7p18bb4ajsn19eabb1c5b1f",
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  },
};

export function getCoins() {
  const cloneOptions = Object.assign({}, options);
  cloneOptions.url = baseUrl + "/coins";

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
