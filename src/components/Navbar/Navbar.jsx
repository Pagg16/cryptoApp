import React from "react";
import { Link } from "react-router-dom";
import { Button, Menu, Typography, Avatar } from "antd";

import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import userAvatar from "../../images/user-avatar.png";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar__logo-container">
        <Avatar src={userAvatar} size="large" />
        <Typography.Title level={2} className="navbar__logo">
          <Link to="/">Cryptocurrency</Link>
        </Typography.Title>
        <Button className="navbar__menu-control-container"></Button>
        <Menu
          theme="dark"
          forceSubMenuRender={true}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: <Link to="/">Home</Link>,
            },
            {
              key: "2",
              icon: <FundOutlined />,
              label: <Link to="/cryptocurrency">Cryptocurrency</Link>,
            },
            {
              key: "3",
              icon: <MoneyCollectOutlined />,

              label: <Link to="/exchanges">Exchanges</Link>,
            },
            {
              key: "4",
              icon: <BulbOutlined />,
              label: <Link to="/news">News</Link>,
            },
          ]}
        ></Menu>
      </div>
    </div>
  );
}

export default Navbar;
