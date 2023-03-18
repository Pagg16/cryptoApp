import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Menu, Typography, Avatar } from "antd";

import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import cryptoIcon from "../../images/crypto.png";
import "./navbar.css";

function Navbar() {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);
  const [activeMenuBts, setActiveMenuBts] = useState(false);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 800) {
      setActiveMenu(false);
      setActiveMenuBts(true);
    } else {
      setActiveMenu(true);
      setActiveMenuBts(false);
    }
  }, [screenSize]);

  function scrollZeroPos() {
    window.scrollTo(0, 0);
  }

  return (
    <div className="navbar">
      <div className="navbar__logo-container">
        <Typography.Title level={2} className="navbar__logo">
          <Link className="navbar__logo-link" to="/">
            Cryptocurrency
            <Avatar
              className="navbar__logo-icon"
              src={cryptoIcon}
              size="large"
            />
          </Link>
        </Typography.Title>
        {activeMenuBts && (
          <Button
            className="navbar__menu-control-container"
            onClick={() => setActiveMenu((state) => !state)}
          >
            <MenuOutlined />
          </Button>
        )}
      </div>
      {activeMenu && (
        <div className="navbar__menu-container">
          <Menu
            className="navbar__menu"
            selectable={false}
            theme="dark"
            onClick={() => {
              scrollZeroPos();
              setActiveMenu((state) => !state);
            }}
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
      )}
    </div>
  );
}

export default Navbar;
