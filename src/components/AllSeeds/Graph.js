import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../context/Data";
import { AWSContext } from "../../context/AWSContext";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MultiSelect from "../selects/MultiSelect";
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

  const { seedData, setSeedData, loading, setLoading, error, setError } =
    useContext(DataContext);
  const { cognitoUser } = useContext(AWSContext);

  const selectedTypeHandler = event => {
    setSelectedType(event.target.value);
  };

  const selectedSchoolHandler = event => {
    setSelectedSchool(event.target.value);
  };

  const dateChangeHandler = ({ startDate, endDate }) => {
    console.log(startDate.format("YYYY-MM-DD"), endDate);
    setDate({ startDate, endDate });
  };

  const checkedHandler = () => {
    setChecked(!checked);
  };

  const onFilterQueryHandler = async () => {
    if (error) setError(null);
    if (selectedType <= 0) {
      await onMountQueryHandler();
    } else {
      setLoading(true);
      let Pk = schoolsData[schools[selectedSchool]]?.Sk.replace("SCHOOL#", "");
      let req = { Type: seedTypes[selectedType], Pk };
      if (!checked && date) {
        req.startDate = date.startDate.format("YYYY-MM-DD");
        req.endDate = date.endDate.format("YYYY-MM-DD");
      }
      console.log(req);
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
    let Pk = schoolsData[schools[selectedSchool]]?.Sk.replace("SCHOOL#", "");
    let req = { Pk };
    // let data = await API.getUsersSeeds(req).catch(error => {
    //   console.log(error?.message);
    //   setError({ message: error?.message });
    // });
    if (!checked && date) {
      req.startDate = date.startDate.format("YYYY-MM-DD");
      req.endDate = date.endDate.format("YYYY-MM-DD");
    }
    console.log("HEREEEEEEEEEEEEEEEE", req)
    let data = await API.getSeedsByFilter(req).catch(error => {
      console.log(error);
      setError({ message: error?.message });
    });
    if (data) {
      setSeedData(data);
    }
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
          console.log(array);
          console.log(community);
          setSchoolsData(community);
          setSchools(array);
        })
        .catch(error => {
          console.log(error?.message);
          setError({ message: error?.message });
        });
    }
  }, [schools]);

  return (
    <div className={classes.root}>
      {error?.message && <Alert severity="error">{error.message}</Alert>}
      <SelectContainer>
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
            setError(null);
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
