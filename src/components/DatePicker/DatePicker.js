import React from "react";

import Calendars from "./Calendar";

function DatePicker() {
  const [date, setDate] = React.useState(new Date());
  const onDateChanged = date => setDate(date);
  const transformDate = date => date.toDateString();
  return (
    <div className="App">
      <h1>Date Picker</h1>
      <Calendars
        value={date}
        onChange={onDateChanged}
        transformDate={transformDate}
      />
    </div>
  );
}

export default DatePicker;
