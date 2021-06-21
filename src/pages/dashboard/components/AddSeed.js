import React, { useState } from "react";
import { Dialog, InputAdornment } from "@material-ui/core";
import styled from "styled-components";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import { ArrowIosBack } from "@styled-icons/evaicons-solid/ArrowIosBack";
import TextField from "@material-ui/core/TextField";
import { Controller, useForm } from "react-hook-form";
import { Calendar3 } from "@styled-icons/bootstrap/Calendar3";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./TabPanel";
import { StyledInputLabel } from "../../../components/styled-components/InputLabel";
import SeedForm from "./SeedForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const AddSeed = ({ open, onClose }) => {
  const [error, setError] = useState(null);
  const { control, handleSubmit, formState, watch } = useForm();
  const { errors } = formState;

  // Any unsaved changes will be wiped

  const [seedTab, setSeedTab] = useState(1);
  const handleChange = (event, newTab) => {
    setSeedTab(newTab);
  };

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
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </TextField>
              )}
            />
          </GridForm>
          <Tabs
            value={seedTab}
            onChange={handleChange}
            indicatorColor="primary"
            scrollable
            textColor="primary"
            centered
            TabIndicatorProps={{
              style: {
                width: "50px",
              },
            }}
          >
            <StyledTab label="S - 1" />
            <StyledTab label="S - 2" />
            <StyledTab label="S - 3" />
            <StyledTab label="S - 4" />
            <StyledTab label="S - 5" />
            <StyledTab label="S - 6" />
          </Tabs>
          <TabPanel value={seedTab} index={0}>
            <SeedForm name="Space Seed - 1" />
          </TabPanel>
          <TabPanel value={seedTab} index={1}>
            <SeedForm name="Space Seed - 2" />
          </TabPanel>
          <TabPanel value={seedTab} index={2}>
            <SeedForm name="Space Seed - 3" />
          </TabPanel>
          <TabPanel value={seedTab} index={3}>
            <SeedForm name="Space Seed - 4" />
          </TabPanel>
          <TabPanel value={seedTab} index={4}>
            <SeedForm name="Space Seed - 5" />
          </TabPanel>
          <TabPanel value={seedTab} index={5}>
            <SeedForm name="Space Seed - 6" />
          </TabPanel>
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
