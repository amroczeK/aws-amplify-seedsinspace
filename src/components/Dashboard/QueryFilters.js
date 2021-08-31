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

const seedTypes = ["All", "Earth", "Space"];

const QueryFilters = () => {
  const [date, setDate] = useState({ startDate: moment(), endDate: moment() });
  const [checked, setChecked] = useState(false);
  const [selectedType, setSelectedType] = useState(0);
  const [info, setInfo] = useState(null);

  const { setSeedData, setLoading, error, setError, setGraphTitle } =
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

  return (
    <>
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
    </>
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
  padding: 1rem;
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
  padding: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;