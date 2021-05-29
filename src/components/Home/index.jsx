import React from "react";
import "./index.scss";

// data
import { totalCards } from "../../data";

// ui
import { Row, Col, Button } from "antd";

// components
import TotalItem from "./TotalItem";
import {
  IconSvg,
  // AreaChart,
  ApexChart,
} from "../../common";

// images
import HarvetIcon from "../../assets/icons/potted-plant.svg";
import DepositIcon from "../../assets/icons/deposit.svg";

const HomeContent = (props) => {
  return (
    <div className="homeContent">
      <div className="totalInfo">
        <Row gutter={22}>
          {totalCards &&
            totalCards.map((item, i) => (
              <Col lg={8} xs={24} key={i}>
                <TotalItem
                  active={i === 0 ? true : false}
                  icon={item.icon}
                  title={item.title}
                  value={props.poolInfo == null ? item.value : (i === 0? props.poolInfo.stakingFunds:( i === 1? props.poolInfo.rewardSupply : props.poolInfo.maturityAPY))}
                  sub={item.sub}
                />
              </Col>
            ))}
        </Row>
      </div>

      <div className="statisticInfo">
        <Row>
          <Col lg={16} xs={24}>
            <div className="contentLeft">
              <div className="title">
                <h3>STACK PRICE</h3>
              </div>

              <Row>
                <Col md={12} xs={24}>
                  <div className="totalBox">
                    <p>
                      Total Supply: <span>$1,00,000,000</span>
                    </p>
                  </div>
                </Col>
                <Col md={12} xs={24}>
                  <div className="totalBox br-none">
                    <p>
                      Total Value Locked: <span>$5,00,000,0000</span>
                    </p>
                  </div>
                </Col>
              </Row>

              <div className="viewChart">
                {/* <AreaChart /> */}
                <ApexChart />
              </div>
            </div>
          </Col>
          <Col lg={8} xs={24}>
            <div className="contentRight">
              <div className="title">
                <h3>Farms & Staking</h3>
              </div>

              <div className="walletInfo">
                <div className="walletBox">
                  <IconSvg src={HarvetIcon} alt="" size={26} />
                  <h2>
                    {props.connected ? "120.20" : "0.00"} <span>($0.00)</span>
                  </h2>
                  <h3>JSTAK to Harvest</h3>
                </div>

                <div className="walletBox bb-none">
                  <IconSvg src={DepositIcon} alt="" size={24} />
                  <h2>
                    {props.connected ? "46.00" : "0.00"} <span>($0.00)</span>
                  </h2>
                  <h3>Your Staked</h3>
                </div>

                <Button
                  className="btnWallet"
                  disabled={!props.connected}
                  type="default"
                  block
                >
                  Unlock Wallet
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HomeContent;
