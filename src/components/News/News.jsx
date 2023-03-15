import React, { useEffect, useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../actions/cryptoNews";
import "./news.css";

const { Text, Title } = Typography;
const { Option } = Select;

function News({ simple }) {
  const isLoading = useSelector((state) => state.app.loading);
  const news = useSelector((state) => state.news.news?.value);
  const coins = useSelector((state) => state.coins.coins?.data?.coins);
  const [filterNews, setFilterNews] = useState(news);
  const [categoryNews, setCategoryNews] = useState("cryptocurrency");
  const dispatch = useDispatch();

  console.log(news);

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

  useEffect(() => {
    // dispatch(getNews(categoryNews));
  }, []);

  return (
    <div className="news">
      <Row gutter={[24, 24]}>
        {!!simple ? (
          <Col span={24}>
            <Select
              showSearch
              className="news__secect"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => setCategoryNews(value)}
              filterOption={(input, option) =>
                option.children.toLoweCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {coins?.map((elem) => (
                <Option value={elem.name}>{elem.name}</Option>
              ))}
            </Select>
          </Col>
        ) : (
          <>
            {news?.map((elem) => (
              <Col key={elem.datePublished} xs={24} sm={12} lg={8}>
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
          </>
        )}
      </Row>
    </div>
  );
}

export default News;
