import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="homepage">
      <Typography.Title level={2} className="homepage__heading">
        Global Crypto Stats
      </Typography.Title>
    </div>
  );
}

export default Homepage;
