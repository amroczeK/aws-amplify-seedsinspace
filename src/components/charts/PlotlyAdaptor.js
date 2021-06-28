export const getChartData = ({ type, data }) => {
  let dates = [];
  let traces = [];
  let lines = {};

  switch (type) {
    case "scatter":
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
        console.log(each);
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
      break;
    default:
      // code block
      break;
  }
  return { data: traces, title: "Test" };
};
