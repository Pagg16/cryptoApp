import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import { useSelector } from "react-redux";
import Chart from "chart.js/auto";
import "./lineChar.css";
const { Title } = Typography;

function LineChar({ timePeriod, SelectElem, currentPrice, coinName }) {
  const coinHistory = useSelector((state) => state.coins.coinPrice.data);

  const { data, options } = useMemo(() => {
    const arrPrice = [];
    const arrTime = [];

    for (let i = 0; i < coinHistory?.history.length; i++) {
      arrTime.push(
        new Date(coinHistory?.history[i].timestamp * 1000).toLocaleDateString()
      );
      arrPrice.push(coinHistory?.history[i].price);
    }

    const data = {
      labels: arrTime,
      datasets: [
        {
          label: "Price in USD",
          data: arrPrice,
          fill: false,
          backgroundColor: "#0071bd",
          borderColor: "#0071bd",
        },
      ],
    };

    const options = {
      resizeDelay: 100,
      scales: {
        x: {
          reverse: true,
        },
      },
    };

    return { data, options };
  }, [coinHistory]);

  return (
    <div className="line-char">
      <Row className="line-char__header">
        {SelectElem}
        <Title className="line-char__title" level={2}>
          {coinName} Price Chart
        </Title>
        <Col className="line-char__price-container" level={5}>
          <Title level={5} className="line-char__price-char">
            {coinHistory?.change}%
          </Title>
          <Title level={5} className="line-char__current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </div>
  );
}

export default LineChar;
