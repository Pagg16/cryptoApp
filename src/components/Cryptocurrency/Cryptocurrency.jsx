import React, { useEffect, useMemo, useState } from "react";
import millify from "millify";
import { Link, link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useSelector } from "react-redux";

import searchIcon from "../../images/search.png";

import "./cryptocurrency.css";

function Cryptocurrency({ simple }) {
  const [searchThrem, setSearchThrem] = useState("");
  const coins = useSelector((state) => state.coins.coins?.data?.coins);
  const [filterCoins, setFilterCoins] = useState(coins);

  useEffect(() => {
    if (!!simple) {
      return setFilterCoins(arrayTruncation(coins));
    }
    return setFilterCoins(coins);
  }, [coins, simple]);

  function arrayTruncation(arr) {
    const shortArr = [];

    for (let i = 0; i < arr?.length; i++) {
      shortArr.push(arr[i]);
      if (i === simple) break;
    }

    return shortArr;
  }

  return (
    <div className="cryptocurrency">
      {!!!simple && (
        <div className="cryptocurrency__search">
          <img
            src={searchIcon}
            alt="icon-search"
            className="cryptocurrency__search-icon"
          />
          <Input
            value={searchThrem}
            placeholder="Search Cryptocurrency"
            onChange={(e) => {
              const value = e.target.value;
              setSearchThrem(value);
              setFilterCoins(() =>
                coins?.filter((coin) =>
                  coin.name.toLowerCase().includes(value.toLowerCase())
                )
              );
            }}
          ></Input>
        </div>
      )}
      <Row gutter={[32, 32]} className="cryptocurrency__card-container">
        {filterCoins?.map((elem) => {
          return (
            <Col
              key={elem.uuid}
              xs={24}
              sm={12}
              lg={6}
              className="cryptocurrency__card"
            >
              <Link to={`/crypto/:${elem.uuid}`}>
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
                  <p>Price: {millify(elem.price || 0)}</p>
                  <p>Market Cap: {millify(elem.marketCap || 0)}</p>
                  <p>Daily Change: {millify(elem.change || 0)}%</p>
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
