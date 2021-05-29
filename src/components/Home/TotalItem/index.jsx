import React from "react";
import "./index.scss";
import PropTypes from "prop-types";

// components
import { IconSvg } from "../../../common";

const TotalItem = (props) => {
  return (
    <div className={`totalItem ${props.active ? "active" : ""}`}>
      <div className="viewIcon">
        <IconSvg src={props.icon} alt="" size={28} />
      </div>
      <div className="detail">
        <h5>{props.title}</h5>
        <h3>
          {props.value} {props.sub && <span>{props.sub}</span>}
        </h3>
      </div>
    </div>
  );
};

TotalItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  icon: PropTypes.any.isRequired,
};

export default TotalItem;
