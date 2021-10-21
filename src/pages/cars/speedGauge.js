import React from 'react';
import ReactEcharts from "echarts-for-react";

const SpeedGauge = props => {

  const getOption = () => {
    return {
      tooltip: {
        formatter: "{a} <br/>{b} : {c}%",
      },
      series: [
        {
          name: "Speed",
          max: 200,
          type: "gauge",
          detail: { formatter: "{value}" },
          axisLine: {
            lineStyle: {
              color: [
                [0.4, "#02a499"],
                [0.6, "#d6b351"],
                [1, "#ec4561"],
              ],
              width: 20,
            },
          },
          data: [{ value: props.speed, name: "speed" }],
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

export default SpeedGauge;