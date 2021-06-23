export const getChartData = ({ type, data }) => {
  let chartData = {};
  let dates = [];
  let traces = [];
  let lines = {};
  
  switch (type) {
    case "scatter":
      lines = {
        Height: { y: [] },
        Leaf_Count: { y: [] },
        Leaf_Length: { y: [] },
        Leaf_Width: { y: [] },
      };
      data.forEach(each => {
        console.log(each);
        dates.push(each.createdAt);
        lines.Height.y.push(each.height);
        lines.Leaf_Count.y.push(each.leaf_count);
        lines.Leaf_Length.y.push(each.leaf_length);
        lines.Leaf_Width.y.push(each.leaf_width);
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
      return { data: traces, title: "Test" };
    //break;
    default:
      // code block
      break;
  }
};
