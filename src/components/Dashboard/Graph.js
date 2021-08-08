import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../context/Data";
import { AWSContext } from "../../context/AWSContext";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Select from "../selects/Select";
import QueryBtn from "../inputs/Button";
import ClearFiltersBtn from "../inputs/Button";
import DateRangeSelect from "../inputs/DateRangeSelect";
import styled from "styled-components";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import Plotly from "../charts/Plotly";
import { getChartData } from "../charts/PlotlyAdaptor";
import * as API from "../../apis";
import Checkbox from "../inputs/Checkbox";
import moment from "moment";

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

const seedTypes = ["All", "Earth", "Space"];

const Graph = () => {
  const classes = useStyles();

  const [date, setDate] = useState({ startDate: moment(), endDate: moment() });
  const [checked, setChecked] = useState(false);
  const [selectedType, setSelectedType] = useState(0);

  const { seedData, setSeedData, loading, setLoading, error, setError } =
    useContext(DataContext);
  const { cognitoUser } = useContext(AWSContext);

  const selectedTypeHandler = event => {
    setSelectedType(event.target.value);
  };

  const dateChangeHandler = ({ startDate, endDate }) => {
    setDate({ startDate, endDate });
  };

  const checkedHandler = () => {
    setChecked(!checked);
  };

  const onFilterQueryHandler = async () => {
    if (selectedType <= 0) {
      await onMountQueryHandler();
    } else {
      setLoading(true);
      let req = { Type: seedTypes[selectedType], Pk: cognitoUser?.attributes?.sub };
      if (!checked && date) {
        req.startDate = date.startDate.format("YYYY-MM-DD");
        req.endDate = date.endDate.format("YYYY-MM-DD");
      }
      let data = await API.getSeedsByTypeAndSortKey(req).catch(error => {
        setError({ message: error?.message || error });
      });
      setSeedData(data);
      setLoading(false);
    }
  };

  const onMountQueryHandler = async () => {
    setLoading(true);
    let req = { Pk: cognitoUser?.attributes?.sub };
    if (!checked && date) {
      req.startDate = date.startDate.format("YYYY-MM-DD");
      req.endDate = date.endDate.format("YYYY-MM-DD");
    }
    let data = await API.getSeedsByFilter(req).catch(error => {
      setError({ message: error?.message || error });
    });
    if (data) {
      setSeedData(data);
    }
    setLoading(false);
  };

  // Reset seed data on component mount because data in in API context shared by multiple components
  // e.g. for scenario where user loads data on All Seeds page, then logs in and navigates to Dashboard
  // Seed data is already populated by previous data when not logged in and vice versa when you logout and navigate to All Seeds
  // Also when you nagivate to another page, seed data should be reset
  useEffect(() => {
    if (seedData?.length) setSeedData(null);
    // eslint-disable-next-line
  }, []); // Only do this on component mount, no dependencies required

  return (
    <div className={classes.root}>
      {error?.message && <Alert severity="error">{error.message}</Alert>}
      <SelectContainer>
        <Select
          title={"Type"}
          value={selectedType}
          handleChange={selectedTypeHandler}
          items={seedTypes}
        />
        <DateRangeContainer>
          <p>Dates</p>
          <DateRangeSelect
            date={date}
            dateChangeHandler={dateChangeHandler}
            disabled={checked}
          />
        </DateRangeContainer>
        <Checkbox name={"All dates"} checked={checked} checkedHandler={checkedHandler} />
        <QueryBtn title={"Fetch Data"} onClickHandler={onFilterQueryHandler} />
        <ClearFiltersBtn
          title={"Clear"}
          onClickHandler={() => {
            setLoading(false);
            setSeedData([]);
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
  gap: 0.75rem;
  p {
    font-size: 0.75rem;
    margin: 0px;
  }
  padding: 0.25rem;
`;

const DateRangeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
