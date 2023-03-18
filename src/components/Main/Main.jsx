import { Layout } from "antd";
import React, { useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import {
  Homepage,
  Cryptocurrency,
  Exchanges,
  CryptoDetals,
  News,
} from "../index";
import "./main.css";

function Main() {
  return (
    <div className="main">
      <Layout className="main__container">
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/cryptocurrency" element={<Cryptocurrency />} />
          <Route exact path="/exchanges" element={<Exchanges />} />
          <Route exact path="/crypto/:coinId" element={<CryptoDetals />} />
          <Route exact path="/news" element={<News />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default Main;
