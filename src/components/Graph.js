import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../context/Data";
import { AWSContext } from "../../context/AWSContext";
import Plotly from "../charts/Plotly";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MultiSelect from "../selects/MultiSelect";
import QuerySelect from "../selects/QuerySelect";
import QueryBtn from "../inputs/Button";
import ClearFiltersBtn from "../inputs/Button";
import styled from "styled-components";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getChartData } from "../charts/PlotlyAdaptor";
import * as API from "../../apis";

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

const seedFilters = [
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
];

const Graph = () => {
  const classes = useStyles();

  const [selectedQuery, setSelectedQuery] = useState(""); // Must be "" or index value else MUI out of range warning
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [queries, setQueries] = useState(dataQueries);

  const { seedData, setSeedData, loading, setLoading, error, setError } =
    useContext(DataContext);
  const { cognitoUser } = useContext(AWSContext);

  const selecedFiltesrHandler = event => {
    setSelectedFilters(event.target.value);
  };

  const selectedQueryHandler = event => {
    console.log(event.target.value);
    setSelectedQuery(event.target.value);
  };

  const queryHandler = async selected => {
    console.log(selected);
    let data, req;
    switch (selected) {
      case "All Entries":
        setLoading(true);
        data = await API.getAllSeeds().catch(error => {
          console.log(error?.message);
          setError({ message: error?.message });
        });
        if (data) {
          setSeedData(data);
        }
        setLoading(false);
        break;
      case "My Seed Entries":
        setLoading(true);
        req = { Pk: cognitoUser?.attributes?.sub };
        data = await API.getUsersSeeds(req).catch(error => {
          console.log(error?.message);
          setError({ message: error?.message });
        });
        if (data) {
          setSeedData(data);
        }
        setLoading(false);
        break;
      case "All Earth Seeds":
        console.log("HERE");
        setLoading(true);
        req = { Type: "Earth" };
        data = await API.getAllSeedsByType(req).catch(error => {
          console.log(error?.message);
          setError({ message: error?.message });
        });
        console.log("earth seeds data", data);
        if (data) {
          setSeedData(data);
        }
        setLoading(false);
        break;
      case "All Space Seeds":
        console.log("HERE2222");
        setLoading(true);
        req = { Type: "Space" };
        data = await API.getAllSeedsByType(req).catch(error => {
          console.log(error?.message);
          setError({ message: error?.message });
        });
        console.log("space seeds data", data);
        if (data) {
          setSeedData(data);
        }
        setLoading(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!cognitoUser && queries) {
      let filteredQueries = queries.filter(query => query !== "My Seed Entries");
      setQueries(filteredQueries);
    }
    // eslint-disable-next-line
  }, [cognitoUser]);

  return (
    <div className={classes.root}>
      {error?.message && <Alert severity="error">{error.message}</Alert>}
      <SelectContainer>
        <QuerySelect
          title={"Data Queries"}
          handleChange={selectedQueryHandler}
          selected={selectedQuery}
          items={queries}
          helperText={"Select data query"}
        />
        <MultiSelect
          title={"Seed Filters"}
          selections={seedFilters}
          selectedFilters={selectedFilters}
          handleChange={selecedFiltesrHandler}
          helperText={"Select data filter"}
        />
        <QueryBtn
          size="small"
          title={"Fetch Data"}
          onClickHandler={() => {
            // Index 0 evaluates to false
            if (selectedQuery >= 0) {
              setLoading(true);
              queryHandler(queries[selectedQuery]);
            }
          }}
        />
        <ClearFiltersBtn
          size="small"
          title={"Clear"}
          onClickHandler={() => {
            setSeedData([]);
            setSelectedFilters([]);
            setSelectedQuery("");
          }}
        />
      </SelectContainer>
      <Paper className={classes.paper}>
        <div className={classes.loader}>{loading && <CircularProgress size={60} />}</div>
        <Plotly {...getChartData({ type: "bar", data: seedData })} />
      </Paper>
    </div>
  );
};

export default Graph;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
`;
