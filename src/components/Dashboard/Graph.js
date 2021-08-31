import { useContext, useEffect } from "react";
import { DataContext } from "../../context/Data";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Plotly from "../charts/Plotly";
import { getChartData } from "../charts/PlotlyAdaptor";

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

  // Reset seed data on component mount because data in in API context shared by multiple components
  // e.g. for scenario where user loads data on All Seeds page, then logs in and navigates to Dashboard
  // Seed data is already populated by previous data when not logged in and vice versa when you logout and navigate to All Seeds
  // Also when you nagivate to another page, seed data should be reset
  useEffect(() => {
    //if (seedData?.length) setSeedData(null);
    // eslint-disable-next-line
  }, []); // Only do this on component mount, no dependencies required

  return (
    <div className={classes.root}>
      {loading && (
        <div className={classes.loader}>{loading && <CircularProgress size={60} />}</div>
      )}
      <Plotly
        {...getChartData({
          type: "bar",
          data: seedData,
          title: graphTitle || "My Seeds",
        })}
      />
    </div>
  );
};

export default Graph;
