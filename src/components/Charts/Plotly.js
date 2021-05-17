import React from "react";
import ReactPlotly from "react-plotly.js";
import styled from "styled-components";

const Plotly = () => {
  let height = {
    x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    y: [0, 3, 6, 4, 5, 2, 3, 5, 4],
    name: "Height",
    type: "scatter",
  };
  let stemLength = {
    x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    y: [0, 4, 7, 8, 3, 6, 3, 3, 4],
    name: "Stem Length",
    type: "scatter",
  };
  let leafSize = {
    x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    y: [1, 3, 5, 9, 3, 2, 4, 9, 3],
    name: "Leaf Size",
    type: "scatter",
  };
  let data = [height, stemLength, leafSize];

  return (
    <ReactPlotly
      data={data}
      layout={{
        title: "Seed Growth",
        autosize: true,
        legend: { orientation: "h", xanchor: "center", x: 0.5 },
        margin: {
          l: 35,
          r: 35,
          b: 30,
          t: 60,
          pad: 5,
        },
      }}
      style={{
        width: "100%",
        height: "50%",
      }}
      useResizeHandler={true}
    />
  );
};

export default Plotly;
