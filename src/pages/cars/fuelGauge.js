import React from 'react';
import ReactEcharts from "echarts-for-react";

const FuelGauge = props => {

  const getOption = () => {
    return {
      tooltip: {
        formatter: "{a} <br/>{b} : {c}%",
      },
      series: [
        {
          name: "Fuel",
          type: "gauge",
          detail: { formatter: "{value}%" },
          axisLine: {
            lineStyle: {
              color: [
                [0.3, "#02a499"],
                [0.8, "#d6b351"],
                [1, "#ec4561"],
              ],
              width: 20,
            },
          },
          data: [{ value: props.fuel, name: "Fuel" }],
        },
      ],
    };
  };

  return(
    <React.Fragment>
      <ReactEcharts style={{ height: "300px" }} option={getOption()} />
    </React.Fragment>
  )

}

export default FuelGauge;