import axios from "axios";
import { hideLoading, showLoading } from "../reduser/appReduser";
import { setNews } from "../reduser/cryptoNews";

const baseUrl = "https://bing-news-search1.p.rapidapi.com/news";

const options = {
  method: "GET",
  url: "",
  params: {},
  headers: {
    "X-BingApis-SDK": "true",
    "X-RapidAPI-Key": "570f0ed2cdmsh30dc44b8e51f7b7p18bb4ajsn19eabb1c5b1f",
    "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
  },
};

export function getNews(category) {
  const cloneOptions = Object.assign({}, options);
  cloneOptions.url = baseUrl + "/search";
  cloneOptions.params = {
    q: category,
    count: "40",
    freshness: "Day",
    textFormat: "Raw",
    safeSearch: "Off",
  };

  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await axios.request(cloneOptions);

      dispatch(setNews(response.data));
    } catch (e) {
      console.log(e);
      alert(e);
    } finally {
      dispatch(hideLoading());
    }
  };
}
