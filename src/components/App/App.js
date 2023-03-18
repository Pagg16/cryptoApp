import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import { Navbar, Footer, Main } from "../index";
import { useEffect } from "react";
import { getCoins } from "../../actions/coinranking";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../actions/cryptoNews";
import { hideLoading, showLoading } from "../../reduser/appReduser";

function App() {
  const dispatch = useDispatch();
  const typeNews = useSelector((state) => state.news.typeNews);

  useEffect(() => {
    dispatch(showLoading());
    Promise.all([
      new Promise((res, rej) => dispatch(getCoins(res, rej))),
      new Promise((res, rej) => dispatch(getNews(typeNews, res, rej))),
    ]).finally(() => dispatch(hideLoading()));
  }, []);

  return (
    <div className="app">
      <Navbar />
      <div className="app__container">
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;
