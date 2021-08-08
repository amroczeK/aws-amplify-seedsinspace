import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../context/Data";
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
  const [schoolsData, setSchoolsData] = useState(0);
  const [selectedSchool, setSelectedSchool] = useState(0);
  const [schools, setSchools] = useState(["Loading..."]);
  const [info, setInfo] = useState(null);
  const [graphTitle, setGraphTitle] = useState(null);

  const { seedData, setSeedData, loading, setLoading, error, setError } =
    useContext(DataContext);

  const selectedTypeHandler = event => {
    setSelectedType(event.target.value);
  };

  const selectedSchoolHandler = event => {
    setSelectedSchool(event.target.value);
  };

  const dateChangeHandler = ({ startDate, endDate }) => {
    setDate({ startDate, endDate });
  };

  const checkedHandler = () => {
    setChecked(!checked);
  };

  const dateFilterHandler = req => {
    if (!checked && date) {
      if (!date.startDate || !date.endDate) {
        setInfo("Please select a valid start date and end date.");
        setLoading(false);
        return null;
      }
      req.startDate = date.startDate?.format("YYYY-MM-DD");
      req.endDate = date.endDate?.format("YYYY-MM-DD");
      return req;
    }
  };

  const onFilterQueryHandler = async () => {
    setGraphTitle(`${seedTypes[selectedType]} Seeds`);
    if (error) setError(null);
    if (info) setInfo(null);
    setLoading(true);
    let data;
    if (selectedType <= 0) {
      let Pk = schoolsData[schools[selectedSchool]]?.Sk.replace("SCHOOL#", "");
      let req = { Pk };
      req = dateFilterHandler(req);
      if (!req) return;
      data = await API.getSeedsByFilter(req).catch(error => {
        setError({ message: error?.message || error });
      });
    } else {
      let Pk = schoolsData[schools[selectedSchool]]?.Sk.replace("SCHOOL#", "");
      let req = { Type: seedTypes[selectedType], Pk };
      req = dateFilterHandler(req);
      if (!req) return;
      data = await API.getSeedsByTypeAndSortKey(req).catch(error => {
        setError({ message: error?.message });
      });
    }
    if (!data?.length)
      setInfo("No data for the date range selected, try querying different dates.");
    setSeedData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (schools[0] === "Loading...") {
      API.getAllSchools()
        .then(res => {
          let array = [];
          let community = {};
          res.forEach(({ SchoolName, ...rest }) => {
            array.push(SchoolName);
            community[SchoolName] = rest;
          });
          setSchoolsData(community);
          setSchools(array);
        })
        .catch(error => {
          setError({ message: error?.message || error });
        });
    }
    // eslint-disable-next-line
  }, [schools]);

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
      <FilterContainer>
        <Select
          title={"Community"}
          value={selectedSchool}
          handleChange={selectedSchoolHandler}
          items={schools}
        />
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
        <ButtonContainer>
          <QueryBtn title={"Fetch Data"} onClickHandler={onFilterQueryHandler} />
          <ClearFiltersBtn
            title={"Clear"}
            onClickHandler={() => {
              setInfo(null);
              setError(null);
              setLoading(false);
              setSeedData([]);
            }}
          />
        </ButtonContainer>
      </FilterContainer>
      {info && (
        <AlertContainer>
          <Alert severity="info">{info}</Alert>
        </AlertContainer>
      )}
      {error?.message && (
        <AlertContainer>
          <Alert severity="error">{error.message}</Alert>
        </AlertContainer>
      )}
      <Paper className={classes.paper}>
        {loading && (
          <div className={classes.loader}>
            {loading && <CircularProgress size={60} />}
          </div>
        )}
        <Plotly
          {...getChartData({
            type: "bar",
            data: seedData,
            title: graphTitle || "Seeds",
          })}
        />
      </Paper>
    </div>
  );
};

export default Graph;

const FilterContainer = styled.div`
  max-width: 1200px;
  min-width: 300px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  p {
    font-size: 0.75rem;
    margin: 0px;
    margin-bottom: 2px;
  }
  padding: 0.25rem;
  @media (max-width: 840px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 1rem;
  }
`;

const DateRangeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AlertContainer = styled.div`
  padding: 0.5rem 0rem 0.5rem 0rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
