import Plotly from "../charts/Plotly";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getChartData } from "../charts/PlotlyAdaptor";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(0.5),
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

const Graph = ({ data, loading }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.loader}>{loading && <CircularProgress size={60} />}</div>
        <Plotly {...getChartData({ type: "bar", data })} />
      </Paper>
    </div>
  );
};

export default Graph;
