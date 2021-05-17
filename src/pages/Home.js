import React from "react";
import styled from "styled-components";
import Plotly from "../components/charts/Plotly";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1.5),
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <Container>
      <h1>HOME</h1>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Plotly />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Plotly />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Plotly />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Plotly />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  background: pink;
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100vw;
  height: 100%;
  //max-width: 100%;
  //padding: 1rem;
`;
