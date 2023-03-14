import { Layout } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Homepage,
  Cryptocurrency,
  Exchanges,
  CryptoDetals,
  News,
} from "../index";

function Main() {
  return (
    <div className="main">
      <Layout>
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
