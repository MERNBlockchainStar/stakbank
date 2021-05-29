import React, { useState } from "react";
import "./index.scss";
import PropTypes from "prop-types";

// icons
import { QuestionCircleOutlined } from "@ant-design/icons";

// ui
import { Button } from "antd";

// components
import { IconSvg } from "../../../common";
import ModalStakeStak from "../ModalStakeStak";
import ModalUnStakeStak from "../ModalUnStakeStak";

// images
import StakedIcon from "../../../assets/icons/staked.svg";
import ApyIcon from "../../../assets/icons/apy.svg";

const YourPosition = ({ connected }) => {
  const [openStakeStak, setOpenStakeStak] = useState(false);
  const [openUnstakeStak, setOpenUnstakeStak] = useState(false);

  const handleToggleStake = () => {
    setOpenStakeStak(!openStakeStak);
  };

  const handleToggleUnstake = () => {
    setOpenUnstakeStak(!openUnstakeStak);
  };

  return (
    <div className="yourPosition">
      <h1>Your position</h1>

      <div className="positionContent">
        <div className="positionItem">
          <div className="positionIcon">
            <IconSvg src={StakedIcon} alt="" />
          </div>
          <div className="detail">
            <h5>
              Your Staked <QuestionCircleOutlined />
            </h5>
            <h2>500.88 STAK</h2>
          </div>
        </div>

        <div className="positionItem">
          <div className="positionIcon">
            <IconSvg src={ApyIcon} alt="" />
          </div>
          <div className="detail">
            <h5>
              APY <QuestionCircleOutlined />
            </h5>
            <h2>265.25 %</h2>
          </div>
        </div>

        <div className="positionItem">
          <div className="positionIcon">
            <IconSvg src={StakedIcon} alt="" />
          </div>
          <div className="detail">
            <h5>
              Total STAK Staked <QuestionCircleOutlined />
            </h5>
            <h2>500.88 STAK</h2>
          </div>
        </div>

        {connected ? (
          <div className="actions">
            <Button
              className="btnStake"
              type="primary"
              block
              onClick={handleToggleStake}
            >
              Stake STAK
            </Button>
            <Button className="btnUnstake" block onClick={handleToggleUnstake}>
              Unstake STAK
            </Button>
          </div>
        ) : (
          <Button
            disabled={!connected}
            className="btnApprove"
            type="primary"
            block
          >
            Approve to deposit STAK
          </Button>
        )}
      </div>

      <ModalStakeStak
        open={openStakeStak}
        onClose={handleToggleStake}
        onSave={handleToggleStake}
      />

      <ModalUnStakeStak
        open={openUnstakeStak}
        onClose={handleToggleUnstake}
        onSave={handleToggleUnstake}
      />
    </div>
  );
};

YourPosition.propTypes = {
  connected: PropTypes.bool,
};

export default YourPosition;
