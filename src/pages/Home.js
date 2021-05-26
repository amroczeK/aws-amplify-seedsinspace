import React from "react";
import styled from "styled-components";
import Plotly from "../components/charts/Plotly";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  lineAndScatterPlot,
  dataLabelsHover,
  groupedBars,
  stackedBars,
} from "../chartMockData";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(0.5),
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Home = () => {
  const classes = useStyles();

  const lineChart = lineAndScatterPlot();
  const dataLabelChart = dataLabelsHover();
  const groupedBarsChart = groupedBars();
  const stackedBarsChart = stackedBars();

  return (
    <Container maxWidth="xl">
      <h1>HOME</h1>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Paper className={classes.paper}>
              <Plotly {...lineChart} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Paper className={classes.paper}>
              <Plotly {...dataLabelChart} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Paper className={classes.paper}>
              <Plotly {...groupedBarsChart} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Paper className={classes.paper}>
              <Plotly {...stackedBarsChart} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Home;

// const Container = styled.div`
//   background: pink;
//   display: flex;
//   position: relative;
//   flex-direction: column;
//   width: 100vw;
//   height: 100%;
//   //max-width: 100%;
//   //padding: 1rem;
// `;
