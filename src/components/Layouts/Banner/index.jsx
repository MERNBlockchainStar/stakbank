import React from "react";
import "./index.scss";
import PropTypes from "prop-types";

// ui
import { Button } from "antd";

// images
import CopyIcon from "../../../assets/icons/copy.svg";

const Banner = ({ connected, account }) => {
  return (
    <div className="banner">
      <div className="bannerLeft">
        <h5>{connected ? "Wallet Address" : "You’re Ready to"}</h5>
        <h3>{connected ? account : "Connect & Collect Rewards"}</h3>
      </div>
      <div className="bannerRight">
        {connected ? (
          <Button
            icon={<img className="copyIcon" src={CopyIcon} alt="" />}
            type="primary"
            className="btnConnected btnConnect"
          >
            Copy Address
          </Button>
        ) : (
          <Button type="primary" className="btnConnect">
            Connect to Wallet
          </Button>
        )}
      </div>
    </div>
  );
};

Banner.propTypes = {
  connected: PropTypes.bool,
  account: PropTypes.string
};

export default Banner;
