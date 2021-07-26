import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function SimpleSelect({ title, value, handleChange, items = [] }) {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="simple-select-label">{title}</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={value}
          onChange={handleChange}
        >
          {items.map((item, idx) => (
            <MenuItem key={idx} value={idx}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
