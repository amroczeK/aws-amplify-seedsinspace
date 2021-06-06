import React, { useState } from "react";
import { Dialog, InputAdornment } from "@material-ui/core";
import styled from "styled-components";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import { ArrowIosBack } from "@styled-icons/evaicons-solid/ArrowIosBack";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import { Controller, useForm } from "react-hook-form";
import { Calendar3 } from "@styled-icons/bootstrap/Calendar3";
import Typography from "@material-ui/core/Typography";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const AddSeed = ({ open, onClose }) => {
  const [error, setError] = useState(null);
  const { control, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const seedOptions = ["Earth seeds", "Space seeds"];

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
          <GridForm>
            <InputLabel shrink>DATE</InputLabel>
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

            <InputLabel shrink>SEED</InputLabel>
            <Controller
              name="seed"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  variant="outlined"
                  error={errors?.seed}
                  helperText={errors?.seed?.message}
                  SelectProps={{
                    native: true,
                  }}
                >
                  {seedOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              )}
            />
          </GridForm>
        </AddSeedContainer>
      </Dialog>
    </>
  );
};

export default AddSeed;

const AddSeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100%;
  max-width: 350px;
  margin: 1em;
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
