import { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/Data";
import Plotly from "../components/charts/Plotly";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MultiSelect from "../components/selects/MultiSelect";
import Select from "../components/selects/Select";
import QueryBtn from "../components/inputs/Button";
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
import * as API from "../apis";
import Table from "./Tables";

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

const dataQueries = ["All Entries", "My Seed Entries"];

const Home = () => {
  const classes = useStyles();

  const [selectedQuery, setSelectedQuery] = useState(""); // Must be "" or index value else MUI out of range warning
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { seedData, setSeedData } = useContext(DataContext);

  const selecedFiltesrHandler = event => {
    setSelectedFilters(event.target.value);
  };

  const selectedQueryHandler = event => {
    setSelectedQuery(event.target.value);
  };

  const queryHandler = async selected => {
    switch (selected) {
      case "All Entries":
        console.log(selected);
        break;
      case "My Seed Entries":
        console.log(selected);
        const data = await API.getUsersSeedEntries().catch(error => {
          console.log(error);
          setError(error);
        });
        if (data && !error) {
          setSeedData(JSON.parse(data.body));
        }
        setLoading(false);
        break;
      default:
        break;
    }
  };

  return (
    <Container maxWidth="xl">
      <DataContainer>
        {/* <APIContainer>
        <button onClick={API.getAllSeeds}>GET SEEDS API CALL</button>
        <button onClick={API.getSeedById}>GET SEED BY ID</button>
        <button onClick={API.addSeedEntry}>ADD SEED ENTRY API CALL</button>
        <button onClick={API.updateSeedEntry}>UPDATE SEED ENTRY API CALL</button>
        <button onClick={API.deleteSeedEntry}>DELETE SEED ENTRY API CALL</button>
        <button onClick={API.getAllSchools}>GET SCHOOLS API CALL</button>
        <button onClick={API.addSchoolEntry}>ADD SCHOOLS ENTRY API CALL</button>
        <button onClick={API.updateSchoolDetails}>UPDATE SCHOOLS ENTRY API CALL</button>
      </APIContainer> */}
        <div className={classes.root}>
          {error?.message && <Alert severity="error">{error.message}</Alert>}
          <SelectContainer>
            <Select
              title={"Data Queries"}
              handleChange={selectedQueryHandler}
              selected={selectedQuery}
              items={dataQueries}
              helperText={"Select data query"}
            />
            <MultiSelect
              title={"Seed Filters"}
              selections={selections}
              selectedFilters={selectedFilters}
              handleChange={selecedFiltesrHandler}
              helperText={"Select data filter"}
            />
            <QueryBtn
              title={"Fetch Data"}
              onClickHandler={() => {
                if (selectedQuery) {
                  setLoading(true);
                  queryHandler(dataQueries[selectedQuery]);
                }
              }}
            />
            <ClearFiltersBtn
              title={"Clear"}
              onClickHandler={() => {
                setSeedData([]);
                setSelectedFilters([]);
                setSelectedQuery("");
              }}
            />
          </SelectContainer>
          <Paper className={classes.paper}>
            <Plotly {...getChartData({ type: "bar", data: seedData })} />
            {/* <Plotly {...lineAndScatterPlot()} /> */}
          </Paper>
          <Table />
        </div>
      </DataContainer>
    </Container>
  );
};

export default Home;

const DataContainer = styled.div`
  margin-top: 3rem;
  position: relative;
  height: 100%;
`

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
`;

const APIContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
