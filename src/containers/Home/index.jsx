import React from "react";
import "./index.scss";

import HomeContent from "../../components/Home";

const Home = (props) => {
  return <HomeContent connected={props.connected} poolInfo={props.poolInfo} />;
};

export default Home;
