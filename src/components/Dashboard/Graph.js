import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../context/Data";
import { AWSContext } from "../../context/AWSContext";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MultiSelect from "../selects/MultiSelect";
import Select from "../selects/Select";
import QueryBtn from "../inputs/Button";
import ClearFiltersBtn from "../inputs/Button";
import DateRange from "../inputs/DateRange";
import styled from "styled-components";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import Plotly from "../charts/Plotly";
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

const seedTypes = ["All", "Earth", "Space"];

const Graph = () => {
  const classes = useStyles();

  const [selectedQuery, setSelectedQuery] = useState(""); // Must be "" or index value else MUI out of range warning
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedType, setSelectedType] = useState(0);

  const { seedData, setSeedData, loading, setLoading, error, setError } =
    useContext(DataContext);
  const { cognitoUser } = useContext(AWSContext);

  const selecedFiltesrHandler = event => {
    setSelectedFilters(event.target.value);
  };

  const selectedTypeHandler = event => {
    setSelectedType(event.target.value);
  };

  const onFilterQueryHandler = async () => {
    if (selectedType <= 0) {
      await onMountQueryHandler();
    } else {
      setLoading(true);
      let req = { Type: seedTypes[selectedType], Pk: cognitoUser?.attributes?.sub };
      let data = await API.getSeedsByTypeAndSortKey(req).catch(error => {
        console.log(error?.message);
        setError({ message: error?.message });
      });
      setSeedData(data);
      setLoading(false);
    }
  };

  const onMountQueryHandler = async () => {
    setLoading(true);
    let req = { Pk: cognitoUser?.attributes?.sub };
    let data = await API.getUsersSeeds(req).catch(error => {
      console.log(error?.message);
      setError({ message: error?.message });
    });
    if (data) {
      setSeedData(data);
    }
    setLoading(false);
  };

  // Load users seeds on component render
  useEffect(() => {
    if (!seedData.length) onMountQueryHandler();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      {error?.message && <Alert severity="error">{error.message}</Alert>}
      {/* <Card>
        <CardContent>
          <Typography variant="h6">
            Seed Filters
          </Typography>
        </CardContent>
      </Card> */}
      <SelectContainer>
        <Select
          title={"Type"}
          value={selectedType}
          handleChange={selectedTypeHandler}
          items={seedTypes}
        />
        <DateRange />
        {/* <MultiSelect
          title={"Seed Filters"}
          selections={seedFilters}
          selectedFilters={selectedFilters}
          handleChange={selecedFiltesrHandler}
          helperText={"Select data filter"}
        /> */}
        <QueryBtn
          title={"Fetch Data"}
          // onClickHandler={() => {
          //   // Index 0 evaluates to false
          //   if (selectedQuery >= 0) {
          //     setLoading(true);
          //   }
          // }}
          onClickHandler={onFilterQueryHandler}
        />
        <ClearFiltersBtn
          title={"Clear"}
          onClickHandler={() => {
            setLoading(false);
            setSeedData([]);
            setSelectedFilters([]);
            setSelectedQuery("");
          }}
        />
      </SelectContainer>
      <Paper className={classes.paper}>
        {loading && (
          <div className={classes.loader}>
            {loading && <CircularProgress size={60} />}
          </div>
        )}
        <Plotly {...getChartData({ type: "bar", data: seedData, title: "My Seeds" })} />
      </Paper>
    </div>
  );
};

export default Graph;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
`;
