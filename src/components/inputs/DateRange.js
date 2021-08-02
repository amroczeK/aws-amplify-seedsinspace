import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const DateRange = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <Container>
      <DateContainer>
        <p>Start date</p>
        <DatePickerWrapper>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={startDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
        </DatePickerWrapper>
      </DateContainer>
      <DateContainer>
        <p>End date</p>
        <DatePickerWrapper>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={endDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </DatePickerWrapper>
      </DateContainer>
    </Container>
  );
};

export default DateRange;

const Container = styled.div`
  display: flex;
  align-items: center;
  p {
    font-size: 0.8rem;
    margin: 0px 0px 5px 0px;
  }
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 5px 0px 5px;
`;

const DatePickerWrapper = styled.div`
  .react-datepicker {
    font-family: "Montserrat", sans-serif;
    font-size: 0.8rem;
    background-color: #fff;
    color: #000;
    border: 1px solid ${props => props.theme.palette.primary.main};
    border-radius: 0.3rem;
    display: inline-block;
    position: relative;
  }
  .react-datepicker__header {
    text-align: center;
    background-color: ${props => props.theme.palette.primary.main};
    border-bottom: 1px solid ${props => props.theme.palette.primary.main};
    border-top-left-radius: 0.3rem;
    padding: 8px 0;
    position: relative;
  }
  .react-datepicker__current-month,
  .react-datepicker__navigation--previous button,
  .react-datepicker-time__header,
  .react-datepicker-year-header,
  .react-datepicker__day-name {
    color: white;
  }
`;
