/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./index.scss";
import { useLocation, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

// data
import { menus } from "../../../data";

// icons
import { MenuOutlined } from "@ant-design/icons";

// ui
import { Menu, Button, Drawer } from "antd";

// components
import { IconSvg } from "../../../common";

const Sidebar = (props) => {
  const { pathname } = useLocation();
  const history = useHistory();

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleMenu = (path) => {
    handleToggle();
    history.push(path);
  };

  return (
    <div className="siderMain">
      <div className="menuMobile" onClick={handleToggle}>
        <MenuOutlined />
      </div>

      <Drawer
        className="drawerSider"
        // title="Basic Drawer"
        placement="left"
        closable={false}
        onClose={handleToggle}
        visible={open}
        key="left"
      >
        <Menu>
          {menus &&
            menus.map((item, i) => (
              <Menu.Item
                className={`${item.className} ${
                  item.path === pathname ? "active" : ""
                }`}
                key={i}
                icon={
                  <IconSvg
                    src={item.path === pathname ? item.active : item.icon}
                    size={20}
                    alt=""
                  />
                }
              >
                <a onClick={() => handleMenu(item.path)}>{item.name || ""}</a>
              </Menu.Item>
            ))}
        </Menu>

        <Button className="btnLogout" type="default" block>
          Logout
        </Button>
      </Drawer>

      <div className="sidebar">
        <Menu>
          {menus &&
            menus.map((item, i) => (
              <Menu.Item
                className={`${item.className} ${
                  item.path === pathname ? "active" : ""
                }`}
                key={i}
                icon={
                  <IconSvg
                    src={item.path === pathname ? item.active : item.icon}
                    size={20}
                    alt=""
                  />
                }
              >
                <Link to={item.path}>{item.name || ""}</Link>
              </Menu.Item>
            ))}
        </Menu>

        <Button className="btnLogout" type="default" block>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
