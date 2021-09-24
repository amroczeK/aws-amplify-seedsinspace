export const getChartData = ({ type, data, title }) => {
  if (data?.length) {
    switch (type) {
      case "scatter": {
        let dates = [];
        let traces = [];
        let lines = {};

        lines = {
          Height: { y: [] },
          Stem_Length: { y: [] },
          Leaf_Count: { y: [] },
          Leaf_Length: { y: [] },
          Leaf_Width: { y: [] },
          Leaf_Colour: { y: [] },
          Ph_Level: { y: [] },
          Humidity: { y: [] },
          Temperature: { y: [] },
          Water_Volume: { y: [] },
        };
        (data || []).forEach((each, idx) => {
          dates.push(idx);
          lines.Height.y.push(each.Height);
          lines.Stem_Length.y.push(each.StemLength);
          lines.Leaf_Count.y.push(each.LeafCount);
          lines.Leaf_Length.y.push(each.LeafLength);
          lines.Leaf_Width.y.push(each.LeafWidth);
          lines.Leaf_Colour.y.push(each.LeafColour);
          lines.Ph_Level.y.push(each.PhLevel);
          lines.Humidity.y.push(each.Humidity);
          lines.Temperature.y.push(each.Temperature);
          lines.Water_Volume.y.push(each.WaterVolume);
        });

        // Set up traces for each entity
        for (const [key, value] of Object.entries(lines)) {
          traces.push({
            type: "scatter",
            mode: "markers",
            x: dates,
            y: value.y,
            name: key,
          });
        }
        return { data: traces, title: title || "Scatter Chart" };
      }
      case "bar": {
        let traceData = [];

        let legend = {
          Height: "Height (mm)",
          LeafCount: "Leaf Count",
          LeafWidth: "Leaf Width (mm)",
          LeafLength: "Leaf Length (mm)",
          StemLength: "Stem Length (mm)",
          Temperature: "Temperature (C)",
          Humidity: "Humidity (%)",
          WaterVolume: "Water Volume (mL)",
          PhLevel: "Ph Level",
        };

        data.forEach((entry, idx) => {
          let xValues = [];
          let yValues = [];
          for (const [key, value] of Object.entries(entry)) {
            if (legend[key]) {
              xValues.push(legend[key]);
              yValues.push(value);
            }
          }
          let name = data[idx].Date + " " + data[idx].Sk.match(/(\w{5}_\w{4}_\d*)/gim); // E.g. 2021-06-27 Space_Seed_1
          let trace = {
            type: "bar",
            name,
            x: xValues,
            y: yValues,
          };
          traceData.push(trace);
        });
        return {
          data: traceData,
          title: title || "Bar Chart",
          layout: { barmode: "group" },
        };
      }
      default:
        // code block
        break;
    }
  } else {
    return { data, title: "No data" };
  }
};
