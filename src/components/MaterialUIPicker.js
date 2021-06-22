import 'date-fns';
import React from 'react';
import { Controller } from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const MaterialUIPickers = ({control}) => {

  return (
      <Controller
        name="materialUIPicker"
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

export default MaterialUIPickers;