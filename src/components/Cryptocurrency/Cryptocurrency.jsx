import React from "react";
import millify from "millify";
import { Link, link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useSelector } from "react-redux";

import "./cryptocurrency.css";

function Cryptocurrency() {
  const isLoading = useSelector((state) => state.app.loading);
  const coins = useSelector((state) => state.coins.coins?.data?.coins);

  return (
    <div className="cryptocurrency">
      <Row gutter={[32, 32]} className="cryptocurrency__card-container">
        {coins.map((elem) => {
          console.log(elem);
          return (
            <Col
              key={elem.uuid}
              xs={24}
              sm={12}
              lg={6}
              className="cryptocurrency__card"
            >
              <Link to={`/crypto/${elem.uuid}`}>
                <Card
                  title={`${elem.rank}. ${elem.name}`}
                  extra={
                    <img
                      src={elem.iconUrl}
                      alt="icon"
                      className="cryptocurrency__card-image"
                    />
                  }
                  hoverable
                >
                  <p>Price: {millify(elem.price)}</p>
                  <p>Market Cap: {millify(elem.marketCap)}</p>
                  <p>Daily Change: {millify(elem.change)}%</p>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Cryptocurrency;
