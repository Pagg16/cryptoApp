import React, { useEffect } from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { getCoins } from "../../actions/coinranking";
import { useDispatch, useSelector } from "react-redux";

const { Title } = Typography;

function Homepage() {
  const isLoading = useSelector((state) => state.app.loading);
  const coins = useSelector((state) => state.coins.coins?.data);
  const dispatch = useDispatch();

  console.log(coins);

  useEffect(() => {
    // dispatch(getCoins());
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="homepage">
      <Typography.Title level={2} className="homepage__heading">
        Global Crypto Stats
      </Typography.Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={coins?.stats?.totalCoins || 0}
          />
          <Statistic
            title="Total Exchanges"
            value={millify(coins?.stats?.totalExchanges || 0)}
          />
          <Statistic
            title="Total Market Cap"
            value={millify(coins?.stats?.totalMarketCap || 0)}
          />
          <Statistic
            title="Total 24h volume"
            value={millify(coins?.stats?.total24hVolume || 0)}
          />
          <Statistic
            title="Total Markets"
            value={millify(coins?.stats?.totalMarkets || 0)}
          />
        </Col>
      </Row>
      <div className="homepage__heading-container">
        <Title level={2} className="homepage__heading-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className="homepage__heading-show-more">
          <Link to="/cryptocurrency">Show more</Link>
        </Title>
      </div>
      <div className="homepage__heading-container">
        <Title level={2} className="homepage__heading-title">
          Lasted Crypto News
        </Title>
        <Title level={3} className="homepage__heading-show-more">
          <Link to="/news">Show more</Link>
        </Title>
      </div>
    </div>
  );
}

export default Homepage;