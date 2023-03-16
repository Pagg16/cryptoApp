import React, { useEffect, useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../actions/cryptoNews";
import "./news.css";
import { typeNewsSet } from "../../reduser/cryptoNews";

const { Text, Title } = Typography;
const { Option } = Select;

function News({ simple }) {
  const isLoading = useSelector((state) => state.app.loading);
  const news = useSelector((state) => state.news.news?.value);
  const coins = useSelector((state) => state.coins.coins?.data?.coins);
  const typeNews = useSelector((state) => state.news.typeNews);
  const [filterNews, setFilterNews] = useState(news);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!simple) {
      return setFilterNews(arrayTruncation(news));
    }
    return setFilterNews(news);
  }, [news, simple]);

  function arrayTruncation(arr) {
    const shortArr = [];

    for (let i = 0; i < arr?.length; i++) {
      shortArr.push(arr[i]);
      if (i === simple) break;
    }

    return shortArr;
  }

  return (
    <div className="news">
      <Row gutter={[24, 24]}>
        {!!!simple && (
          <Col span={24}>
            <Select
              value="Cryptocurrency"
              showSearch
              className="news__secect"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => {
                dispatch(typeNewsSet(value));
                dispatch(getNews(value));
              }}
              filterOption={(input, option) =>
                option.children.toLoweCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option
                key={Date.now()}
                value={typeNews.charAt(0).toUpperCase() + typeNews.slice(1)}
              >
                Cryptocurrency
              </Option>
              {coins?.map((elem) => (
                <Option key={elem.uuid} value={elem.name}>
                  {elem.name}
                </Option>
              ))}
            </Select>
          </Col>
        )}

        {filterNews?.map((elem, index) => (
          <Col key={index} xs={24} sm={12} lg={8}>
            <Card hoverable className="news__news-card">
              <a href={elem.url} target="_blank" rel="noreferrer">
                <div className="news__image-container">
                  {!!elem.image?.thumbnail?.contentUrl && (
                    <img
                      src={elem.image?.thumbnail?.contentUrl}
                      alt="icon-news"
                      className="news__card-image"
                    />
                  )}
                  <Title className="news__title" level={4}>
                    {elem.name}
                  </Title>
                </div>
                <p>
                  {elem.description.length > 100
                    ? `${elem.description.substring(0, 100)}...`
                    : elem.description}
                </p>
                <div>
                  <div>
                    {!!elem.provider[0]?.image?.thumbnail?.contentUrl && (
                      <Avatar
                        src={elem.provider[0]?.image?.thumbnail?.contentUrl}
                      ></Avatar>
                    )}
                    <Text>
                      {moment(elem.datePublished).startOf("ss").fromNow()}
                    </Text>
                  </div>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default News;
