import React from "react";
import "./index.scss";

import PoolsContent from "../../components/Pools";

const Pools = (props) => {
  return <PoolsContent connected={props.connected} />;
};

export default Pools;
