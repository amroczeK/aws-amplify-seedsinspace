import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Dialog, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { ArrowIosBack } from "@styled-icons/evaicons-solid/ArrowIosBack";
import { StyledInputLabel } from "../styled-components/InputLabel";
import { StyledButton } from "../styled-components/Buttons";

import { ControlledPicker } from "../MaterialUIPicker";
import AddSeedFormFields from "./AddSeedFormFields";
import AddSeedResolver from "../validation/addSeedValidation";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const defaultValues = {
  date: new Date(),
  type: "Earth",
  height: "",
  leafColor: "",
  leafSize: "",
  stemLength: "",
  notes: "",
};

const ControlledSelect = ({ name, errors, options, control }) => {
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

const AddSeedDialog = ({ open, onClose }) => {
  const [seedTab, setSeedTab] = useState(0);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const seedOptions = ["Earth", "Space"];

  const { control, handleSubmit, formState, setValue, watch, reset } = useForm({
    defaultValues,
    resolver: AddSeedResolver,
  });

  // Any unsaved changes will be wiped
  const sendInfo = formData => {
    console.log(formData);
  };

  const handleChange = (_event, newTab) => {
    setSeedTab(newTab);
    reset();
  };

  const type = watch("type");
  const { errors } = formState;

  return (
    <Dialog
      fullScreen
      style={{ width: !isSmall && 850 }}
      open={open}
      TransitionComponent={Transition}
    >
      <GridForm name="seedForm" onSubmit={handleSubmit(sendInfo)}>
        <StyledAppBar>
          <IconButton onClick={onClose}>
            <StyledArrowIosBackIcon />
          </IconButton>
          <StyledTypography variant="h5">Seeds in Space</StyledTypography>
        </StyledAppBar>
        <AddSeedContainer>
          <StyledInputLabel shrink>DATE</StyledInputLabel>
          <ControlledPicker name="date" control={control} errors={errors} />
          <StyledInputLabel shrink>SEED TYPE</StyledInputLabel>
          <ControlledSelect
            control={control}
            name="type"
            errors={errors}
            options={seedOptions}
          />
          <Tabs
            value={seedTab}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            TabIndicatorProps={{ style: { width: "50px" } }}
          >
            {[...Array(6)].map((_value, index) => {
              let nIndex = index + 1;
              let prepend = "S";
              if (type === "Earth") prepend = "E";
              let label = `${prepend} - ${nIndex}`;

              return <StyledTab key={label} label={label} />;
            })}
          </Tabs>

          <AddSeedFormFields
            name={`${type} Seed - ${seedTab + 1}`}
            control={control}
            setValue={setValue}
            errors={errors}
          />
          <StyledButton
            color="primary"
            type="submit"
            disableElevation
            variant="contained"
          >
            Save entry
          </StyledButton>
        </AddSeedContainer>
      </GridForm>
    </Dialog>
  );
};

export default AddSeedDialog;

const AddSeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100%;
  padding: 1em;
  gap: 1em;
`;

const StyledAppBar = styled.div`
  display: flex;
  align-items: center;
  gap: 3em;
`;

const StyledArrowIosBackIcon = styled(ArrowIosBack)`
  width: 1.5em;
  height: 1.5em;
`;

const GridForm = styled.form`
  display: grid;
  gap: 1em;
`;

const StyledTypography = styled(Typography)`
  font-weight: bold;
`;

const StyledTab = styled(Tab)`
  min-width: 50px;
`;
