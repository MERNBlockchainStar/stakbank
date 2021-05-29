import React, { useState } from "react";
import "./index.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// icons
import { CloseOutlined } from "@ant-design/icons";
// ui
import { Layout, Button, Popover } from "antd";

// images
import Logo from "../../../assets/icons/logo.svg";
import UserLogo from "../../../assets/images/user.png";
import MetamaskLogo from "../../../assets/icons/metamask.svg";

const { Header } = Layout;

const HeaderPage = ({ onConnect, connected,  balance}) => {
  const [open, setOpen] = useState(false);

  const onToggleWallet = () => {
    setOpen(!open);
  };

  const handleVisibleChange = (open) => {
    setOpen(open);
  };

  const onClose = () => {
    onToggleWallet();
  };

  return (
    <Header className="header">
      <div className="mainMenu">
        <Link to="/" className="logo">
          <img src={Logo} alt="" />
        </Link>
      </div>

      <div className="rightMenu">
        {connected ? (
          <div className="userInfo">
            <img src={UserLogo} alt="" />
            <div className="detail">
              <h4>Wallet Balance</h4>
              <h2>{balance} ETH</h2>
            </div>
          </div>
        ) : (
          <Popover
            visible={open}
            placement="bottomRight"
            onVisibleChange={handleVisibleChange}
            title={
              <div className="popupHeader">
                <h3>CONNECT TO A WALLET</h3>
                <CloseOutlined className="btnClose" onClick={onClose} />
              </div>
            }
            content={
              <div className="popupBody">
                <div className="metamaskIcon">
                  <img src={MetamaskLogo} alt="" />
                </div>
                <div className="detail">
                  <div className="description">
                    <h2>Metamask</h2>
                    <p>Ethereum Wallet</p>
                  </div>
                  <Button
                    type="primary"
                    className="btnConnect"
                    onClick={() => onConnect()}
                  >
                    Connect
                  </Button>
                </div>
              </div>
            }
            trigger="click"
          >
            <Button type="link" onClick={onToggleWallet}>
              + Connect to a Wallet
            </Button>
          </Popover>
        )}
      </div>
    </Header>
  );
};

HeaderPage.propTypes = {
  onConnect: PropTypes.func,
  connected: PropTypes.bool,
  balance: PropTypes.string
};

export default HeaderPage;
