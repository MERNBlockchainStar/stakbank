/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./index.scss";
import * as yup from "yup";
import { useFormik } from "formik";
import PropTypes from "prop-types";

// icons
import { QuestionCircleOutlined } from "@ant-design/icons";

// ui
import { Modal, Button, Input, Row, Col } from "antd";

// images
import WalletIcon from "../../../assets/icons/wallet.svg";

const ModalUnStakeStak = ({ open, onClose, onSave }) => {
  const validationSchema = yup.object({
    amount: yup.string("").required("Enter an Amount"),
  });

  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    formik.resetForm({});
    return () => {
      formik.resetForm({});
    };
  }, []);

  return (
    <Modal
      className="modalStakeStak"
      centered
      title="UNStake STAK"
      visible={open}
      onOk={onSave}
      onCancel={onClose}
      footer={null}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="total">
          <div className="iconWallet">
            <img src={WalletIcon} alt="" />
          </div>
          <div className="detail">
            <h4>Total Balance</h4>
            <h3>456.02</h3>
          </div>
        </div>

        <div className="amountInput">
          {formik.errors && formik.touched && (
            <p className="textError">{formik.errors.amount}</p>
          )}
          <Input
            className={`${
              formik.errors && formik.touched && formik.errors.amount
                ? "hasError"
                : ""
            }`}
            placeholder="Enter an Amount…"
            type="text"
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            suffix={
              <Button
                type="primary"
                className="btnMax"
                icon={<QuestionCircleOutlined />}
              >
                Max (STAK)
              </Button>
            }
          />

          <Row>
            <Col md={12}>
              <p className="minAmount">
                Your Staked:{" "}
                <span>
                  100.23 <strong>STAK</strong>
                </span>
              </p>
            </Col>
            <Col md={12}>
              <p className="deposit">Withdraw Fee: 0%</p>
            </Col>
          </Row>
        </div>

        <Button htmlType="submit" className="btnStake" type="primary" block>
          Unstake STAK
        </Button>
      </form>
    </Modal>
  );
};

ModalUnStakeStak.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
};

export default ModalUnStakeStak;
