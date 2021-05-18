import React from "react";
import ReactPlotly from "react-plotly.js";
import styled from "styled-components";

const Plotly = ({ data, layout, title }) => {
  return (
    <ReactPlotly
      data={data}
      layout={{
        title: title || "Seed Growth",
        autosize: true,
        legend: { orientation: "h", xanchor: "center", x: 0.5 },
        margin: {
          l: 35,
          r: 35,
          b: 30,
          t: 60,
          pad: 5,
        },
        ...layout,
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
