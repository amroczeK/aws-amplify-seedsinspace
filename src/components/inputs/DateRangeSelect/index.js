import React, { useState } from "react";
import moment from "moment";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import { START_DATE, END_DATE } from "react-dates/constants";
import "react-dates/lib/css/_datepicker.css";
import "./styles.css";

const DateRangeSelect = ({
  enableFutureSelection = false,
  onDatesChange = () => {},
  noBorder = false,
  small = true,
  customArrowIcon = null,
}) => {
  const [date, setDate] = useState({ startDate: moment(), endDate: moment() }); // Uses startDateTime and endDateTime from catalog.filters

  const [focusedInput, setFocusedInput] = useState(null);

  const handleDatesChange = ({ startDate, endDate }) => {
    setDate({ startDate, endDate });
    onDatesChange(startDate, endDate);
  };

  const onFocusChange = focusedInput => {
    setFocusedInput(focusedInput);
  };

  const orientation = window.matchMedia("(max-width: 1200px)").matches
    ? "vertical"
    : "horizontal";

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
      onDatesChange={handleDatesChange}
      onFocusChange={focusedInput => onFocusChange(focusedInput)}
      enableOutsideDays={false}
      isOutsideRange={day =>
        !enableFutureSelection &&
        ((focusedInput === "endDate" && day.isAfter(moment().endOf("day"))) ||
          (focusedInput === "startDate" && day.isAfter(moment())))
      }
      minimumNights={0}
      showDefaultInputIcon
      hideKeyboardShortcutsPanel
      small={small}
      noBorder={noBorder}
      customArrowIcon={customArrowIcon || null}
    />
  );
};

export default DateRangeSelect;
