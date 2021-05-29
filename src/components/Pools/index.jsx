import React from "react";
import "./index.scss";

// ui
import { Row, Col } from "antd";

// components
import StackPool from "./StackPool";
import YourPosition from "./YourPosition";

const PoolsContent = (props) => {
  return (
    <div className="poolsContent">
      <Row gutter={22}>
        <Col lg={16} xs={24}>
          <StackPool connected={props.connected} />
        </Col>
        <Col lg={8} xs={24}>
          <YourPosition connected={props.connected} />
        </Col>
      </Row>
    </div>
  );
};

export default PoolsContent;
