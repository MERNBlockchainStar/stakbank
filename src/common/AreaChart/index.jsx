import React, { useState, useEffect } from "react";
import { Area } from "@ant-design/charts";

const AreaChart = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    asyncFetch();
  }, []);
  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  var config = {
    data: data,
    xField: "Date",
    yField: "scales",
    xAxis: { tickCount: 5 },
    areaStyle: function areaStyle() {
      return { fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff" };
    },
  };
  return <Area {...config} />;
};
export default AreaChart;
