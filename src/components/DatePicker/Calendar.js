import React from "react";
import Calendar from "react-calendar";
import "./style.css";

import { ReactComponent as Icon } from "./icon.svg";

const container = {
  width: '375px',
  float: 'left',
  marginRight: '50px',
  marginBottom: '50px',
  fontFamily: 'system-ui',
  marginLeft: "150px",
  marginTop: "40px"
}


function Calendars(props) {
  const [showCalendar, setShowCalendar] = React.useState(true);
  const rootRef = React.useRef(null);

  const toggleCalendar = val => e => setShowCalendar(val || !showCalendar);

  const onDateChange = date => {
    props.onChange(date);
    setShowCalendar(false);
  };

  const handleClickAway = e => {
    if (!rootRef.current.contains(e.target)) {
      setShowCalendar(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickAway, false);
    return () => {
      document.removeEventListener("mousedown", handleClickAway, false);
    };
  });

  const { value } = props;
  return (
    <div
      className={`date__picker ${props.fullWidth ? "full__width" : ""}`}
      ref={rootRef}
    >
      <div>
      <input
        onFocus={toggleCalendar(true)}
        readOnly={true}
        value={props.transformDate ? props.transformDate(value) : value}
      />
      <button onClick={toggleCalendar()}>
        <Icon className={showCalendar ? "rotate" : ""} />
      </button>
      </div>
      {showCalendar && (
        <div className={`dropdown`}>
          <div className='container' style={container}>
          <Calendar
            onChange={onDateChange}
            calendarType="US"
            className="Calendar"
            next2Label={null}
            prev2Label={null}
            value={value}
          />
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendars;
