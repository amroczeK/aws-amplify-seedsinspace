import "date-fns";
import React from "react";
import { Controller } from "react-hook-form";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

const MaterialUIPickers = ({ control, errors }) => {
  return (
    <Controller
      name="date"
      control={control}
      defaultValue={new Date()}
      render={({ field: { onChange, value } }) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="outlined"
            inputVariant="outlined"
            format="eeee dd MMMM yyyy"
            error={errors?.date ? true : false}
            helperText={errors?.date?.message}
            value={value}
            onChange={onChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
      )}
    />
  );
};

export default MaterialUIPickers;
