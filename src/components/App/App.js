import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import { Navbar, Footer, Main } from "../index";
import { useEffect } from "react";
import { getCoins } from "../../actions/coinranking";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../actions/cryptoNews";

function App() {
  const dispatch = useDispatch();
  const typeNews = useSelector((state) => state.news.typeNews);

  useEffect(() => {
    dispatch(getCoins());
    dispatch(getNews(typeNews));
  }, []);

  return (
    <div className="app">
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
