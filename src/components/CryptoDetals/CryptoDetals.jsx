import React, { useEffect, useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Select, Typography, Row, Col } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getCoinInfo, getCoinPrice } from "../../actions/coinranking";
import LineChar from "../LineChar/LineChar";
import { hideLoadingCoins, showloadingCoins } from "../../reduser/coinranking";
import Loader from "../Loader/Loader";

import "./cryptoDetals.css";

const { Title, Text } = Typography;
const { Option } = Select;

function CryptoDetals() {
  const isLoading = useSelector((state) => state.coins.loading);
  const coinInfo = useSelector((state) => state.coins.coinInfo.data?.coin);
  const dispatch = useDispatch();
  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  const coinId = useParams().coinId.slice(1);
  const [timePeriod, setTimePeriod] = useState("7d");

  useEffect(() => {
    dispatch(showloadingCoins());
    Promise.all([
      new Promise((res, rej) =>
        dispatch(getCoinInfo(coinId, timePeriod, res, rej))
      ),
      new Promise((res, rej) =>
        dispatch(getCoinPrice(coinId, timePeriod, res, rej))
      ),
    ]).finally(() => dispatch(hideLoadingCoins()));
  }, [timePeriod]);

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${coinInfo?.price && millify(coinInfo?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: coinInfo?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${coinInfo?.volume && millify(coinInfo?.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${coinInfo?.marketCap && millify(coinInfo?.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        coinInfo?.allTimeHigh?.price && millify(coinInfo?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: coinInfo?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: coinInfo?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: coinInfo?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${coinInfo?.supply?.total && millify(coinInfo?.supply?.total)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        coinInfo?.supply?.circulating && millify(coinInfo?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  const SelectElem = (
    <Select
      defaultValue={timePeriod}
      className="crypto-detals__select-timeperiod"
      placeholder="Select Time Period"
      onChange={(value) => setTimePeriod(value)}
    >
      {time.map((date, index) => (
        <Option key={index} value={date}>
          {date}
        </Option>
      ))}
    </Select>
  );

  return (
    <div className="crypto-detals">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Col className="crypto-detals__coin-detail-container">
            <Col className="crypto-detals__coin-heading-container">
              <Title level={2} className="crypto-detals__coin-name">
                {coinInfo?.name} Price
              </Title>
              <p>
                {coinInfo?.name} Live price US dollars. View value statistics,
                marker cap and supply.
              </p>
            </Col>
            <LineChar
              timePeriod={timePeriod}
              SelectElem={SelectElem}
              currentPrice={millify(+coinInfo?.price || 0)}
              coinName={coinInfo?.name}
            />
            <div className="crypto-detals__other-info-container">
              <Col className="crypto-detals__stats-container">
                <Col className="crypto-detals__coin-value-statistics">
                  <Col className="crypto-detals__coin-value-heading">
                    <Title
                      level={3}
                      className="crypto-detals__coin-detailes-heading"
                    >
                      {coinInfo?.name} Value Statistics
                    </Title>
                    <p>An overvi showing the stats of {coinInfo?.name}</p>
                  </Col>
                </Col>
                {stats.map(({ title, value, icon }) => (
                  <Col className="crypto-detals__coin-stats" key={title}>
                    <Col className="crypto-detals__coin-stats-name">
                      <Text>{icon}</Text>
                      <Text>{title}</Text>
                    </Col>
                    <Text className="crypto-detals__stats">{value}</Text>
                  </Col>
                ))}
              </Col>

              <Col className="crypto-detals__other-info">
                <Col className="crypto-detals__coin-value-statistics">
                  <Col className="crypto-detals__coin-value-heading">
                    <Title
                      level={3}
                      className="crypto-detals__coin-detailes-heading"
                    >
                      Other Statistics
                    </Title>
                    <p>An overvi showing the stats of all cryptocurrencies</p>
                  </Col>
                </Col>
                {genericStats.map(({ title, value, icon }, index) => (
                  <Col className="crypto-detals__coin-stats" key={index}>
                    <Col className="crypto-detals__coin-stats-name">
                      <Text>{icon}</Text>
                      <Text>{title}</Text>
                    </Col>
                    <Text className="crypto-detals__stats">{value}</Text>
                  </Col>
                ))}
              </Col>
            </div>
            <Col className="crypto-detals__coin-dash-link">
              <Row className="crypto-detals__coin-desc">
                <Title level={3} className="crypto-detals__coin-detals-heading">
                  What is {coinInfo?.name}
                  {coinInfo?.description}
                </Title>
              </Row>
              <Col className="crypto-detals__coin-links">
                <Title
                  level={3}
                  className="crypto-detals__coin-detals-subtitle"
                >
                  {coinInfo?.name} Links
                </Title>
                {coinInfo?.links.map((link, index) => (
                  <Row className="crypto-detals__coin-row" key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="crypto-detals__coin-link"
                    >
                      <h5 className="crypto-detals__link-name">{link.type}</h5>
                      {link.name}
                    </a>
                  </Row>
                ))}
              </Col>
            </Col>
          </Col>
        </>
      )}
    </div>
  );
}

export default CryptoDetals;
