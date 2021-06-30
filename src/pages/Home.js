import { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/Data";
import { UserContext } from "../context/User";
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

const dataQueries = [
  "All Entries",
  "My Seed Entries",
  "All Space Seeds",
  "All Earth Seeds",
  "All Space Seeds",
];

const Home = () => {
  const classes = useStyles();

  const [selectedQuery, setSelectedQuery] = useState(""); // Must be "" or index value else MUI out of range warning
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { seedData, setSeedData } = useContext(DataContext);
  const { cognitoUser } = useContext(UserContext);

  useEffect(() => {
    console.log("user", cognitoUser);
  }, [cognitoUser]);

  const selecedFiltesrHandler = event => {
    setSelectedFilters(event.target.value);
  };

  const selectedQueryHandler = event => {
    console.log(event.target.value);
    setSelectedQuery(event.target.value);
  };

  const queryHandler = async selected => {
    console.log(selected);
    let data;
    switch (selected) {
      case "All Entries":
        setLoading(true);
        data = await API.getAllSeeds().catch(error => {
          console.log(error);
          setError(error);
        });
        if (data) {
          setSeedData(data);
        }
        setLoading(false);
        break;
      case "My Seed Entries":
        setLoading(true);
        let sub = cognitoUser.attributes.sub;
        data = await API.getUsersSeedEntries(sub).catch(error => {
          console.log(error);
          setError(error);
        });
        if (data) {
          setSeedData(data);
        }
        setLoading(false);
        break;
      case "All Earth Seeds":
        setLoading(true);
        data = await API.getSeedsByType({ Type: "Earth" }).catch(error => {
          console.log(error);
          setError(error);
        });
        if (data) {
          setSeedData(data);
        }
        setLoading(false);
        break;
      case "All Space Seeds":
        setLoading(true);
        data = await API.getSeedsByType({ Type: "Space" }).catch(error => {
          console.log(error);
          setError(error);
        });
        if (data) {
          setSeedData(data);
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
        <APIContainer>
          <button onClick={API.getAllSeeds}>GET ALL SEEDS API</button>
          <button
            onClick={() => {
              let req = {
                Pk: cognitoUser.attributes.sub,
                Sk: "2021-06-27_Earth_Seed_1",
              };
              API.getSeed(req);
            }}
          >
            GET SEED API
          </button>
          <button
            onClick={() => {
              let req = {
                Pk: cognitoUser.attributes.sub,
              };
              API.getUsersSeeds(req);
            }}
          >
            GET USERS SEEDS API
          </button>
          <button
            onClick={() => {
              let req = {
                Pk: cognitoUser.attributes.sub,
                Sk: "2021-06-27_Earth",
              };
              API.getSeedsByFilter(req);
            }}
          >
            GET SEEDS BY FILTER
          </button>
          <button
            onClick={() => {
              let req = {
                Date: "2021-06-27",
                Type: "Space",
                SeedNumber: 2,
                Height: 3,
                LeafCount: 3,
                LeafLength: 3,
                LeafWidth: 4,
                LeafColour: "Green",
                StemLength: 4,
                Temperature: 15,
                Humidity: 8,
                PhLevel: 3,
                WaterVolume: 70,
              };
              API.addSeed(req);
            }}
          >
            ADD SEED API CALL
          </button>
          <button
            onClick={() => {
              let req = {
                Pk: cognitoUser.attributes.sub,
                Sk: "2021-06-27_Earth_1",
              };
              API.updateSeed(req);
            }}
          >
            UPDATE SEED API CALL
          </button>
          <button
            onClick={() => {
              let req = {
                Pk: cognitoUser.attributes.sub,
                Sk: "2021-06-27_Earth_1",
              };
              API.deleteSeed(req);
            }}
          >
            DELETE SEED API CALL
          </button>
          <button onClick={API.getAllSchools}>GET SCHOOLS API CALL</button>
          <button onClick={API.addSchoolEntry}>ADD SCHOOLS ENTRY API CALL</button>
          <button
            onClick={() => API.updateSchoolDetails(null, cognitoUser.attributes.sub)}
          >
            UPDATE SCHOOLS ENTRY API CALL
          </button>
        </APIContainer>
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
                // Index 0 evaluates to false
                if (selectedQuery >= 0) {
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
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
`;

const APIContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
