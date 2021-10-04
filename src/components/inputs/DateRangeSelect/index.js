import React, { useState } from "react";
import moment from "moment";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import { START_DATE, END_DATE } from "react-dates/constants";
import "react-dates/lib/css/_datepicker.css";
import "./styles.css";

const DateRangeSelect = ({
  enableFutureSelection = false,
  noBorder = false,
  small = true,
  date = { startDate: moment(), endDate: moment() },
  dateChangeHandler,
  disabled = false,
}) => {
  const [focusedInput, setFocusedInput] = useState(null);

  const onFocusChange = focusedInput => {
    setFocusedInput(focusedInput);
  };

  const orientation = window.matchMedia("(max-width: 1200px)").matches ? "vertical" : "horizontal";

  /**
   * NOTE: isOutsideRange={...} stops user from selecting date in the future and minimumNights allows the user to select same date
   */

  return (
    <DateRangePicker
      displayFormat="DD/MM/YYYY"
      orientation={orientation}
      startDateId={START_DATE} // "startDate"
      startDate={date.startDate}
      endDateId={END_DATE} // "endDate"
      endDate={date.endDate}
      focusedInput={focusedInput}
      onDatesChange={dateChangeHandler}
      onFocusChange={focusedInput => onFocusChange(focusedInput)}
      enableOutsideDays={false}
      isOutsideRange={day =>
        !enableFutureSelection &&
        ((focusedInput === "endDate" && day.isAfter(moment().endOf("day"))) || (focusedInput === "startDate" && day.isAfter(moment())))
      }
      minimumNights={0}
      showDefaultInputIcon
      hideKeyboardShortcutsPanel
      small={small}
      noBorder={noBorder}
      disabled={disabled}
    />
  );
};

export default DateRangeSelect;
