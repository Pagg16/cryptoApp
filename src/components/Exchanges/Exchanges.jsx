import React, { useEffect, useMemo, useState } from "react";
import millify from "millify";
import { Select, Typography, Row, Col, Avatar, Collapse } from "antd";
import HTMLReactParser from "html-react-parser";
import "./exchanges.css";
import selectIcons from "../../images/select.png";
import { useDispatch, useSelector } from "react-redux";
import { getexchanges } from "../../actions/coinranking";
import Loader from "../Loader/Loader";

const { Text } = Typography;
const { Option } = Select;

const { Panel } = Collapse;

function Exchanges() {
  const [isLoading, setIsLoading] = useState(true);
  const exchangesCoin = useSelector(
    (state) => state.coins?.exchanges?.data?.exchanges
  );
  const coins = useSelector((state) => state.coins.coins?.data);
  const [exchangCoin, setExchangCoin] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!coins) {
      setIsLoading(true);
      dispatch(getexchanges(coins?.coins[0].uuid, setIsLoading));
    }
  }, [coins, exchangCoin]);

  return (
    <div className="exchanges">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Col span={24} className="exchanges__col">
            <img
              src={selectIcons}
              alt="select-icon"
              className="exchanges__select-icon"
            />
            <Select
              value={exchangCoin}
              showSearch
              className="exchanges__secect"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => setExchangCoin(value)}
              filterOption={(input, option) =>
                option.children.toLoweCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option key={Date.now()} value={""}>
                {coins?.coins[0].name}
              </Option>
              {coins?.coins.map((elem) => (
                <Option key={elem.uuid} value={elem.name}>
                  {elem.name}
                </Option>
              ))}
            </Select>
          </Col>

          <Row>
            <Col span={6}>Exchanges</Col>
            <Col span={6}>24h Trade Volume</Col>
            <Col span={6}>Markets</Col>
            <Col span={6}>Change</Col>
          </Row>
          <Row className="exchanges__row-info">
            {exchangesCoin?.map((exchange) => (
              <Col key={exchange.uuid} span={24}>
                <Collapse>
                  <Panel
                    key={exchange.uuid}
                    showArrow={false}
                    header={
                      <Row key={exchange.uuid}>
                        <Col span={6}>
                          <Text>
                            <strong>{exchange.rank}.</strong>
                          </Text>
                          <Avatar
                            className="exchange-image"
                            src={exchange.iconUrl}
                          />
                          <Text>
                            <strong>{exchange.name}</strong>
                          </Text>
                        </Col>
                        <Col span={6}>${millify(exchange["24hVolume"])}</Col>
                        <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                        <Col span={6}>{millify(exchange.price)}</Col>
                      </Row>
                    }
                  >
                    <a
                      href={exchange.coinrankingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="crypto-detals__coin-link"
                    >
                      {exchange.coinrankingUrl}
                    </a>
                  </Panel>
                </Collapse>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
}

export default Exchanges;
