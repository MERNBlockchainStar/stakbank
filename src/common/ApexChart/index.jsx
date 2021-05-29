import React, { useState } from "react";
import "./index.scss";

// data
import { chart } from "../../data";
import ReactApexChart from "react-apexcharts";

const ApexChart = (props) => {
  const [selection, setSelection] = useState("one_year");

  const dataChart = {
    series: [
      {
        data: chart,
      },
    ],
    options: {
      chart: {
        id: "area-datetime",
        type: "area",
        height: 350,
        zoom: {
          autoScaleYaxis: true,
        },
      },
      annotations: {
        yaxis: [
          {
            y: 30,
            borderColor: "#999",
            label: {
              show: true,
              text: "$1.5m",
              style: {
                color: "#fff",
                background: "#0F123F",
              },
            },
          },
          {
            y: 35,
            borderColor: "#999",
            label: {
              show: true,
              text: "$1.9m",
              style: {
                color: "#fff",
                background: "#57D5C2",
              },
            },
          },
        ],
        // xaxis: [
        //   {
        //     x: new Date("14 Nov 2012").getTime(),
        //     borderColor: "#999",
        //     yAxisIndex: 0,
        //     label: {
        //       show: true,
        //       text: "Rally",
        //       style: {
        //         color: "#fff",
        //         background: "#775DD0",
        //       },
        //     },
        //   },
        // ],
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
        style: "hollow",
      },
      xaxis: {
        type: "datetime",
        min: new Date("01 Mar 2012").getTime(),
        tickAmount: 6,
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
    },
  };

  const updateData = (timeline) => {
    setSelection(timeline);

    switch (timeline) {
      case "one_month":
        ReactApexChart.exec(
          "area-datetime",
          "zoomX",
          new Date("28 Jan 2013").getTime(),
          new Date("27 Feb 2013").getTime()
        );
        break;
      case "six_months":
        ReactApexChart.exec(
          "area-datetime",
          "zoomX",
          new Date("27 Sep 2012").getTime(),
          new Date("27 Feb 2013").getTime()
        );
        break;
      case "one_year":
        ReactApexChart.exec(
          "area-datetime",
          "zoomX",
          new Date("27 Feb 2012").getTime(),
          new Date("27 Feb 2013").getTime()
        );
        break;
      case "ytd":
        ReactApexChart.exec(
          "area-datetime",
          "zoomX",
          new Date("01 Jan 2013").getTime(),
          new Date("27 Feb 2013").getTime()
        );
        break;
      case "all":
        ReactApexChart.exec(
          "area-datetime",
          "zoomX",
          new Date("23 Jan 2012").getTime(),
          new Date("27 Feb 2013").getTime()
        );
        break;
      default:
    }
  };

  return (
    <div id="chart">
      <div className="toolbar">
        <button
          id="one_month"
          onClick={() => updateData("one_month")}
          className={selection === "one_month" ? "active" : ""}
        >
          1M
        </button>
        &nbsp;
        <button
          id="six_months"
          onClick={() => updateData("six_months")}
          className={selection === "six_months" ? "active" : ""}
        >
          6M
        </button>
        &nbsp;
        <button
          id="one_year"
          onClick={() => updateData("one_year")}
          className={selection === "one_year" ? "active" : ""}
        >
          1Y
        </button>
        &nbsp;
        <button
          id="ytd"
          onClick={() => updateData("ytd")}
          className={selection === "ytd" ? "active" : ""}
        >
          YTD
        </button>
        &nbsp;
        <button
          id="all"
          onClick={() => updateData("all")}
          className={selection === "all" ? "active" : ""}
        >
          ALL
        </button>
      </div>

      <div id="chart-timeline">
        <ReactApexChart
          options={dataChart.options}
          series={dataChart.series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};

export default ApexChart;
