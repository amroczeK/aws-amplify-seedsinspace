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
  const [info, setInfo] = useState(null);
  const [graphTitle, setGraphTitle] = useState(null);

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

  const dateFilterHandler = req => {
    try {
      if (!checked && date) {
        req.startDate = date.startDate.format("YYYY-MM-DD");
        req.endDate = date.endDate.format("YYYY-MM-DD");
        return req;
      } else {
        return req;
      }
    } catch (error) {
      throw { info: true, message: "Please select a valid start date and end date." };
    }
  };

  const onFilterQueryHandler = async () => {
    let data = [];
    try {
      setGraphTitle(`${seedTypes[selectedType]} Seeds`);
      if (error) setError(null);
      if (info) setInfo(null);
      setLoading(true);
      if (selectedType <= 0) {
        let req = { Pk: cognitoUser?.attributes?.sub };
        req = dateFilterHandler(req);
        data = await API.getSeedsByFilter(req).catch(error => {
          throw { error: true, message: error?.message || error };
        });
      } else {
        let req = { Type: seedTypes[selectedType], Pk: cognitoUser?.attributes?.sub };
        req = dateFilterHandler(req);
        data = await API.getSeedsByTypeAndSortKey(req).catch(error => {
          throw { error: true, message: error?.message || error };
        });
      }
      if (!data?.length) {
        throw {
          info: true,
          message: "No data for the date range selected, try querying different dates.",
        };
      }
    } catch ({ error, info, message }) {
      if (info) setInfo({ message });
      if (error) setError({ message });
    } finally {
      setLoading(false);
      setSeedData(data);
    }
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
      <FilterContainer>
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
      {info?.message && (
        <AlertContainer>
          <Alert severity="info">{info.message}</Alert>
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
            title: graphTitle || "My Seeds",
          })}
        />
      </Paper>
    </div>
  );
};

export default Graph;

const FilterContainer = styled.div`
  max-width: 900px;
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
