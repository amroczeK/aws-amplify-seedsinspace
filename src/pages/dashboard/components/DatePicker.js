import React, { useState } from "react";
import Calendar from "react-calendar";
import {makeStyles} from "@material-ui/core/styles";
import "react-calendar/dist/Calendar.css";

const useStyles = makeStyles(theme => ({
    calendar: {
      borderWidth: `0 !important`,
      backgroundColor: "#ffffff",

      "& .react-calendar__viewContainer": {
        "& .react-calendar__tile--active": {
          borderRadius: "4px",
          backgroundColor: `#6BBE93 !important`
        },
        "& .react-calendar__tile--now": {
          color: `#01a8b8 !important`,
          backgroundColor: `rgba(0,0,0,0) !important`
        },
        "& .react-calendar__month-view__weekdays__weekday > abbr":{
          textDecoration: "none",
          color: "#9e9898",
          fontWeight: "normal",
          fontSize: "14px",
        },

        "& .react-calendar__month-view__days button":{
          fontSize: "14px",
          fontWeight: "600",
          color: "#358C5F",

          "&.react-calendar__month-view__days__day--neighboringMonth":{
            color: "#CBCBCB",
          },
          "&.react-calendar__tile--active ":{
            color: "white"
          },
        },
      },
      "& .react-calendar__navigation": {
        backgroundColor: "transparent",
        "& .react-calendar__navigation__arrow": {
          color: "#000",
          "&:enabled": {
            "&:hover, &:focus": {
              backgroundColor: `#6BBE93 !important`
            }
          }
        },
        "& .react-calendar__navigation__label": {
          color: "#000",
          "&:enabled": {
            "&:hover, &:focus": {
              backgroundColor: `#6BBE93 !important`
            }
          }
        },

      }
    }
  }));

export default function DatePicker() {
  const [currentValue, setCurrentValue] = useState(new Date());
  const classes = useStyles();
  return (
    <div>
      <Calendar
        onChange={(value, event) => {
          setCurrentValue(value);
        }}
        value={currentValue}
        className={classes.calendar}
      />
      </div>
  );
}

