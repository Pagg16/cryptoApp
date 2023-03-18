import { Space } from "antd";
import Typography from "antd/es/typography/Typography";
import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

import spiderIcon from "../../images/spiderman.png";

function Footer() {
  function scrollZeroPos() {
    window.scrollTo(0, 0);
  }

  return (
    <div className="footer">
      <Typography.Title level={5} className="footer__text">
        Cryptocurrency <br />
        Все права защищены человеком пауком{" "}
        <img
          src={spiderIcon}
          alt="icon-spider"
          className="footer__spider-icon"
        />
      </Typography.Title>
      <Space>
        <Link onClick={scrollZeroPos} to="/">
          Home
        </Link>
        <Link onClick={scrollZeroPos} to="/exchanges">
          Exchange
        </Link>
        <Link onClick={scrollZeroPos} to="/news">
          News
        </Link>
      </Space>
    </div>
  );
}

export default Footer;
