import { Space } from "antd";
import Typography from "antd/es/typography/Typography";
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <Typography.Title level={5}>
        Cryptocurrency <br />
        Все права защищены человеком пауком
      </Typography.Title>
      <Space>
        <Link to="/">Home</Link>
        <Link to="/exchanges">Exchange</Link>
        <Link to="/news">News</Link>
      </Space>
    </div>
  );
}

export default Footer;
