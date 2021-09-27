import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function MUICheckbox({
  checked = false,
  checkedHandler = () => {},
  color = "primary",
  name = "",
  styles,
}) {
  return (
    <FormGroup row style={styles}>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={checkedHandler}
            name={name}
            color={color}
          />
        }
        label={name}
      />
    </FormGroup>
  );
}
