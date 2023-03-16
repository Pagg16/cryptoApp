import React, { useEffect, useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
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
import { getCoinInfo } from "../../actions/coinranking";

const { Title, Text } = Typography;
const { Options } = Select;

function CryptoDetals() {
  const coinInfo = useSelector((state) => state.coins.coinInfo.data?.coin);
  const dispatch = useDispatch();
  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");

  useEffect(() => {
    dispatch(getCoinInfo(coinId, timePeriod));
  }, []);

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

  return <div className="crypto-Detals">Cryptodetals</div>;
}

export default CryptoDetals;
