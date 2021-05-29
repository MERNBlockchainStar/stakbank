import React, { useState } from "react";
import PropTypes from "prop-types";
import "react-circular-progressbar/dist/styles.css";
import "./index.scss";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

// ui
import { Card, Button, Row, Col } from "antd";

// components
import ModalCompound from "../ModalCompound";

const StackPool = ({ connected }) => {
  const [openCompound, setOpenCompound] = useState(false);

  const percentage = 70;

  const handleToggleCompound = () => {
    setOpenCompound(!openCompound);
  };

  return (
    <Card className="stackPool" bordered={true} title="STACK POOL">
      <div className="detail">
        {/* <h2>STAK - ETH LP</h2> */}
        <div className="viewProgress">
          <CircularProgressbarWithChildren strokeWidth={3} value={percentage}>
            <div className="progressInfo">
              <div className="info">
                <h2>0.00</h2>
                <h3>JSTAK</h3>
              </div>
            </div>
          </CircularProgressbarWithChildren>
        </div>

        <div className="rewards">
          <Row>
            <Col sm={12} xs={24}>
              <div className="rewardItem boderRight">
                <h4>Your Reward</h4>
                <h2>0.00 JSTAK</h2>
              </div>
            </Col>
            <Col sm={12} xs={24}>
              <div className="rewardItem">
                <h4>Total Reward Pools</h4>
                <h2>6,123,272 JSTAK</h2>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="actions">
        <Row gutter={30}>
          <Col xs={12}>
            <Button
              block
              disabled={!connected}
              onClick={handleToggleCompound}
              className="btnCompound"
            >
              Compound
            </Button>
          </Col>
          <Col xs={12}>
            <Button
              block
              type="primary"
              disabled={!connected}
              className="btnClaim"
            >
              Claim Reward
            </Button>
          </Col>
        </Row>
      </div>

      <ModalCompound
        open={openCompound}
        onClose={handleToggleCompound}
        onSave={handleToggleCompound}
      />
    </Card>
  );
};

StackPool.propTypes = {
  connected: PropTypes.bool,
};

export default StackPool;
