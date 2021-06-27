import { useState, useContext } from "react";
import { DataContext } from "../context/Data";
import Plotly from "../components/charts/Plotly";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MultiSelect from "../components/selects/MultiSelect";
import ClearFiltersBtn from "../components/inputs/Button";
import styled from "styled-components";
import Alert from "@material-ui/lab/Alert";
import {
  lineAndScatterPlot,
  dataLabelsHover,
  groupedBars,
  stackedBars,
} from "../components/charts/chartMockData";
import { getChartData } from "../components/charts/PlotlyAdaptor";
import {
  getAllSeeds,
  getSeedById,
  addSeedEntry,
  updateSeedEntry,
  deleteSeedEntry,
  getAllSchools,
  addSchoolEntry,
  updateSchoolDetails,
} from "../apis";

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

const selections = [
  "All Seeds",
  "Type",
  "Height",
  "Leaf Count",
  "Leaf Length",
  "Leaf Width",
  "Leaf Colour",
];

const Home = () => {
  const classes = useStyles();

  const [selectedFilters, setSelectedFilters] = useState(["All Seeds"]);

  const { seedData, loading, error } = useContext(DataContext);

  const lineChart = lineAndScatterPlot();
  const dataLabelChart = dataLabelsHover();
  const groupedBarsChart = groupedBars();
  const stackedBarsChart = stackedBars();

  const selecedFiltesrHandler = event => {
    setSelectedFilters(event.target.value);
  };

  return (
    <Container maxWidth="xl">
      <h1>HOME</h1>
      <APIContainer>
        <button onClick={getAllSeeds}>GET SEEDS API CALL</button>
        <button onClick={getSeedById}>GET SEED BY ID</button>
        <button onClick={addSeedEntry}>ADD SEED ENTRY API CALL</button>
        <button onClick={updateSeedEntry}>UPDATE SEED ENTRY API CALL</button>
        <button onClick={deleteSeedEntry}>DELETE SEED ENTRY API CALL</button>
        <button onClick={getAllSchools}>GET SCHOOLS API CALL</button>
        <button onClick={addSchoolEntry}>ADD SCHOOLS ENTRY API CALL</button>
        <button onClick={updateSchoolDetails}>UPDATE SCHOOLS ENTRY API CALL</button>
      </APIContainer>
      <div className={classes.root}>
        {error?.message && <Alert severity="error">{error.message}</Alert>}
        <SelectContainer>
          <MultiSelect
            title={"Seed Filters"}
            selections={selections}
            selectedFilters={selectedFilters}
            onChange={selecedFiltesrHandler}
          />
          <ClearFiltersBtn
            title={"Clear"}
            onClickHandler={() => {
              setSelectedFilters(["All Seeds"]);
            }}
          />
        </SelectContainer>
        <Paper className={classes.paper}>
          <Plotly {...getChartData({ type: "scatter", data: seedData })} />
        </Paper>
        {/* <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Paper className={classes.paper}>
              <Plotly {...getChartData({ type: "scatter", data: seedData })} />
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
        </Grid> */}
      </div>
    </Container>
  );
};

export default Home;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
`;

const APIContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
