import "date-fns";
import React from "react";
import { Controller } from "react-hook-form";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

export const ControlledPicker = ({ name, control, errors }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Controller
        name={name}
        control={control}
        defaultValue={new Date()}
        render={({ field: { ref, ...rest } }) => (
          <KeyboardDatePicker
            {...rest}
            disableToolbar
            minDate={"2021-07-01"}
            variant="outlined"
            inputVariant="outlined"
            format="eeee dd MMMM yyyy"
            error={errors?.date ? true : false}
            helperText={errors?.date?.message}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        )}
      />
    </MuiPickersUtilsProvider>
  );
};

export const MuiPicker = ({ value, onChange }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        name="MuiPicker"
        value={value}
        onChange={onChange}
        minDate={"2021-07-01"}
        variant="outlined"
        inputVariant="outlined"
        format="dd MMMM yyyy"
        disableToolbar
        KeyboardButtonProps={{ "aria-label": "change date" }}
      />
    </MuiPickersUtilsProvider>
  );
};
