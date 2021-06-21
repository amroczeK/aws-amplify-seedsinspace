import 'date-fns';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import DateFnsUtils from '@date-io/date-fns';
import green from "@material-ui/core/colors/green";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';



export default function MaterialUIPickers() {

  const { control } = useForm();


  return (
      <Controller
        name="datePicker"
        control={control}
        defaultValue={new Date()}
        render={({ field: { onChange, value } }) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="outlined"
              inputVariant="outlined"
              format="eeee dd MMMM"
              margin="normal"
              value={value}
              onChange={onChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
        </MuiPickersUtilsProvider>
        )}
      />
  );
}
