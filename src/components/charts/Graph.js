import { useContext } from "react";
import { DataContext } from "../../context/Data";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Plotly from "./Plotly";
import { getChartData } from "./PlotlyAdaptor";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    //padding: theme.spacing(0.5),
  },
  paper: {
    position: "relative",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  loader: {
    display: "flex",
    position: "absolute",
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
}));

const Graph = () => {
  const classes = useStyles();

  const { seedData, loading, graphTitle } = useContext(DataContext);

  return (
    <div className={classes.root}>
      {loading && (
        <div className={classes.loader}>{loading && <CircularProgress size={60} />}</div>
      )}
      <Plotly
        {...getChartData({
          type: "bar",
          data: seedData,
          title: graphTitle || "My seeds",
        })}
      />
    </div>
  );
};

export default Graph;
