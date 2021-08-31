import { useState, useContext } from "react";
import { DataContext } from "../../context/Data";
import { AWSContext } from "../../context/AWSContext";
import * as API from "../../apis";
import Alert from "@material-ui/lab/Alert";
import Select from "../selects/Select";
import QueryBtn from "../inputs/Button";
import ClearFiltersBtn from "../inputs/Button";
import DateRangeSelect from "../inputs/DateRangeSelect";
import Checkbox from "../inputs/Checkbox";
import styled from "styled-components";
import moment from "moment";
<<<<<<< HEAD
import QueryFilters from "./QueryFilters"

<<<<<<<< HEAD:src/components/Dashboard/QueryFilters.js
========
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
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

>>>>>>>> dev:src/components/Dashboard/Graph.js
=======

>>>>>>> dev
const seedTypes = ["All", "Earth", "Space"];

const QueryFilters = () => {
  const [date, setDate] = useState({ startDate: moment(), endDate: moment() });
  const [checked, setChecked] = useState(false);
  const [selectedType, setSelectedType] = useState(0);
  const [info, setInfo] = useState(null);

<<<<<<< HEAD
<<<<<<<< HEAD:src/components/Dashboard/QueryFilters.js
  const { setSeedData, setLoading, error, setError, setGraphTitle } =
    useContext(DataContext);
========
  const {
    seedData,
    setSeedData,
    loading,
    setLoading,
    error,
    setError,
    graphTitle,
    setGraphTitle,
  } = useContext(DataContext);
>>>>>>>> dev:src/components/Dashboard/Graph.js
=======
  const { setSeedData, setLoading, error, setError, setGraphTitle } =
    useContext(DataContext);
>>>>>>> dev
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
      let message = {
        info: true,
        message: "Please select a valid start date and end date.",
      };
      throw message;
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
          error = { error: true, message: error?.message || error };
          throw error;
        });
      } else {
        let req = { Type: seedTypes[selectedType], Pk: cognitoUser?.attributes?.sub };
        req = dateFilterHandler(req);
        data = await API.getSeedsByTypeAndSortKey(req).catch(error => {
          error = { error: true, message: error?.message || error };
          throw error;
        });
      }
      if (!data?.length) {
        let info = {
          info: true,
          message: "No data for the date range selected, try querying different dates.",
        };
        throw info;
      }
    } catch ({ error, info, message }) {
      if (info) setInfo({ message });
      if (error) setError({ message });
    } finally {
      setLoading(false);
      setSeedData(data);
    }
  };

<<<<<<< HEAD
<<<<<<<< HEAD:src/components/Dashboard/QueryFilters.js
  return (
    <>
      <FilterContainer>
========
  // Reset seed data on component mount because data in in API context shared by multiple components
  // e.g. for scenario where user loads data on All Seeds page, then logs in and navigates to Dashboard
  // Seed data is already populated by previous data when not logged in and vice versa when you logout and navigate to All Seeds
  // Also when you nagivate to another page, seed data should be reset
  useEffect(() => {
    //if (seedData?.length) setSeedData(null);
    // eslint-disable-next-line
  }, []); // Only do this on component mount, no dependencies required

  return (
    <div className={classes.root}>
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

export default QueryFilters;

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
<<<<<<< HEAD
  padding: 1rem;
=======
  padding-top: 1rem;
  padding-bottom: 1rem;
>>>>>>> dev
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
<<<<<<< HEAD
  padding: 0.5rem;
=======
  padding: 0.5rem 0rem 0.5rem 0rem;
>>>>>>> dev
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;