import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { Controller } from "react-hook-form";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
}));

export default function SimpleSelect({
  title,
  handleChange,
  items = [],
  selected,
  helperText,
}) {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="select-autowidth-label">{title}</InputLabel>
        <Select
          labelId="select-autowidth-label"
          id="select-autowidth"
          value={selected}
          onChange={handleChange}
          autoWidth
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {items.map((item, idx) => (
            <MenuItem key={idx} value={idx}>
              {item}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </div>
  );
}

export const ControlledSelect = ({ name, errors, options, control }) => {
  return (
    <Controller
      name={name}
      defaultValue={options[0] || null}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          select
          variant="outlined"
          error={errors[name] ? true : false}
          helperText={errors[name]?.message}
          SelectProps={{ native: true }}
        >
          {options.map(option => (
            <option key={option} value={option}>
              {option} seeds
            </option>
          ))}
        </TextField>
      )}
    />
  );
};
