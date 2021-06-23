import React from "react";
import ReactPlotly from "react-plotly.js";

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
          pad: 1,
        },
        ...layout,
      }}
      style={{
        width: "100%",
      }}
      useResizeHandler={true}
    />
  );
};

export default Plotly;
