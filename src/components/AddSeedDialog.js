import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Dialog, InputAdornment } from "@material-ui/core";
import { ArrowIosBack } from "@styled-icons/evaicons-solid/ArrowIosBack";
import { Calendar3 } from "@styled-icons/bootstrap/Calendar3";
import { StyledInputLabel } from "./styled-components/InputLabel";
import { StyledButton } from "./styled-components/Buttons";
import AddSeedFormFields from "./AddSeedFormFields";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const defaultValues = {
  date: "",
  type: "Earth",
  height: "",
  image: "",
  leafColor: "",
  leafSize: "",
  notes: "",
  stemLength: "",
};

const AddSeedDialog = ({ open, onClose }) => {
  const [seedTab, setSeedTab] = useState(0);
  const seedOptions = ["Earth", "Space"];

  const { control, handleSubmit, formState, register, setValue, watch, reset } = useForm({
    defaultValues,
  });

  // Any unsaved changes will be wiped
  const sendInfo = formData => {
    console.log(formData);
    console.log("FORM IS BEING SUBMIT");
  };

  const handleChange = (event, newTab) => {
    setSeedTab(newTab);
    reset();
  };

  const seedType = watch("type");
  const { errors } = formState;

  return (
    <>
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <StyledAppBar>
          <IconButton onClick={onClose}>
            <StyledArrowIosBackIcon />
          </IconButton>
          <StyledTypography variant="h5">Seeds in Space</StyledTypography>
        </StyledAppBar>
        <AddSeedContainer>
          <GridForm name="seedForm" onSubmit={handleSubmit(sendInfo)}>
            <StyledInputLabel shrink>DATE</StyledInputLabel>
            <Controller
              name="date"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  error={errors?.date}
                  helperText={errors?.date?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <StyledCalendarIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <StyledInputLabel shrink>SEED</StyledInputLabel>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  variant="outlined"
                  error={errors?.seedType ? true : false}
                  helperText={errors?.seedType?.message}
                  SelectProps={{
                    native: true,
                  }}
                >
                  {seedOptions.map(option => (
                    <option key={option} value={option}>
                      {option} seeds
                    </option>
                  ))}
                </TextField>
              )}
            />

            <Tabs
              value={seedTab}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
              TabIndicatorProps={{ style: { width: "50px" } }}
            >
              {[...Array(6)].map((value, index) => {
                let nIndex = index + 1;
                let prepend = "S";
                if (seedType === "Earth") prepend = "E";
                let label = `${prepend} - ${nIndex}`;

                return <StyledTab key={label} label={label} />;
              })}
            </Tabs>
            <AddSeedFormFields
              name={`${seedType} Seed - ${seedTab + 1}`}
              register={register}
              control={control}
              setValue={setValue}
            />
            <StyledButton
              color="primary"
              type="submit"
              disableElevation
              variant="contained"
            >
              Save entry
            </StyledButton>
          </GridForm>
        </AddSeedContainer>
      </Dialog>
    </>
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

const StyledCalendarIcon = styled(Calendar3)`
  width: 1.5em;
  height: 1.5em;
`;

const StyledTypography = styled(Typography)`
  font-weight: bold;
`;

const StyledTab = styled(Tab)`
  min-width: 50px;
`;
