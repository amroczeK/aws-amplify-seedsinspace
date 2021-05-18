export const lineAndScatterPlot = () => {
  let height = {
    x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    y: [0, 3, 6, 4, 5, 2, 3, 5, 4],
    name: "Height",
    type: "scatter",
    mode: "markers",
  };
  let stemLength = {
    x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    y: [0, 4, 7, 8, 3, 6, 3, 3, 4],
    name: "Stem Length",
    type: "scatter",
    mode: "line",
  };
  let leafSize = {
    x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    y: [1, 3, 5, 9, 3, 2, 4, 9, 3],
    name: "Leaf Size",
    type: "scatter",
    mode: "lines+markers",
  };
  return {
    data: [height, stemLength, leafSize],
  };
};

export const dataLabelsHover = () => {
  let height = {
    x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    y: [0, 3, 6, 4, 5, 2, 3, 5, 4],
    text: ["H-1", "H-2", "H-3", "H-4", "H-5", "H-6", "H-7", "H-8", "H-9"],
    name: "Height",
    type: "scatter",
    mode: "markers",
    marker: { size: 12 },
  };
  let stemLength = {
    x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    y: [0, 4, 7, 8, 3, 6, 3, 3, 4],
    name: "Stem Length",
    type: "scatter",
    mode: "markers",
    marker: { size: 12 },
  };
  let leafSize = {
    x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    y: [1, 3, 5, 9, 3, 2, 4, 9, 3],
    name: "Leaf Size",
    type: "scatter",
    mode: "markers",
    marker: { size: 12 },
  };
  return {
    data: [height, stemLength, leafSize],
  };
};

export const groupedBars = () => {
  let school1 = {
    x: ["height", "stem length", "leaf size"],
    y: [2, 3, 6],
    name: "School 1",
    type: "bar",
  };
  let school2 = {
    x: ["height", "stem length", "leaf size"],
    y: [0, 4, 7],
    name: "School 2",
    type: "bar",
  };
  let school3 = {
    x: ["height", "stem length", "leaf size"],
    y: [1, 3, 5],
    name: "School 3",
    type: "bar",
  };
  return {
    data: [school1, school2, school3],
    layout: {
      barmode: "group",
    },
  };
};

export const stackedBars = () => {
  let school1 = {
    x: ["height", "stem length", "leaf size"],
    y: [2, 3, 6],
    name: "School 1",
    type: "bar",
  };
  let school2 = {
    x: ["height", "stem length", "leaf size"],
    y: [0, 4, 7],
    name: "School 2",
    type: "bar",
  };
  let school3 = {
    x: ["height", "stem length", "leaf size"],
    y: [1, 3, 5],
    name: "School 3",
    type: "bar",
  };
  return {
    data: [school1, school2, school3],
    layout: {
      barmode: "stack",
    },
  };
};
