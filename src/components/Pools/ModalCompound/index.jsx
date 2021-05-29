import React from "react";
import "./index.scss";

// ui
import { Modal, Button } from "antd";

// images
import RightIcon from "../../../assets/icons/left-arrow-key.svg";

const ModalCompound = ({ open, onSave, onClose }) => {
  return (
    <Modal
      className="modalCompound"
      centered
      title="Compound"
      visible={open}
      onOk={onSave}
      onCancel={onClose}
      footer={null}
    >
      <div className="transfer">
        <div className="boxItem boxLeft">
          <h5>Your Reward</h5>
          <h2>456.02365 JSTAK</h2>

          <div className="iconNext">
            <img src={RightIcon} alt="" />
          </div>
        </div>

        <div className="boxItem boxRight">
          <h5>Compound Value</h5>
          <h2>400 STAK</h2>
        </div>
      </div>

      <Button htmlType="submit" className="btnStake" type="primary" block>
        Stake STAK
      </Button>
    </Modal>
  );
};

export default ModalCompound;
