import React, { useState } from "react";
import { useForm } from "react-hook-form";
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

import { MuiPicker } from "../MaterialUIPicker";
import AddSeedFormFields from "./AddSeedFormFields";
import AddSeedResolver from "../validation/addSeedValidation";
import { useAws } from "../../context/AWSContext";

import * as API from "../../apis";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const defaultValues = {
  Height: null,
  LeafColour: "",
  LeafWidth: "",
  StemLength: "",
  LeafCount: "",
  LeafLength: "",
  PhLevel: "",
  Temperature: "",
  WaterVolume: "",
  Notes: "",
};

const seedOptions = ["Earth", "Space"];

const formatDate = currentDate => {
  const isoDateString = new Date(currentDate).toISOString();
  return isoDateString.split("T")[0];
};

const AddSeedDialog = ({ open, onClose }) => {
  const [seedTab, setSeedTab] = useState(0);
  const [type, setType] = useState(seedOptions[0]);
  const [date, setDate] = useState(new Date());
  const { cognitoUser, uploadImage } = useAws();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const { control, handleSubmit, formState, setValue, reset } = useForm({
    defaultValues,
    resolver: AddSeedResolver,
  });

  const { errors } = formState;
  console.log({ errors });

  // Any unsaved changes will be wiped
  const sendInfo = async formData => {
    try {
      const { seedImage, ...formFields } = formData;
      const formattedDate = formatDate(date);
      const SeedNumber = seedTab + 1;
      const seedName = `${cognitoUser.username}_${formattedDate}_${type}_Seed_${SeedNumber}`;

      const seedReq = {
        SeedNumber,
        Type: type,
        Date: formattedDate,
        ...formFields,
      };

      console.log(seedReq);

      // await API.addSeed(seedReq);
      // console.log("Database Entry Added");

      // const imageReq = {
      //   file: seedImage[0],
      //   filename: seedName,
      //   path: "seed_images/",
      //   level: "public",
      // };

      // await uploadImage(imageReq);
      // console.log("Image Uploaded Successfully");
    } catch (error) {
      console.log("An Error occurred while adding seed");
      console.error(error);
    }
  };

  const handleChange = (_event, newTab) => {
    setSeedTab(newTab);
    reset();
  };

  return (
    <Dialog
      fullScreen
      style={{ width: !isSmall && 850 }}
      open={open}
      TransitionComponent={Transition}
    >
      <StyledAppBar>
        <IconButton onClick={onClose}>
          <StyledArrowIosBackIcon />
        </IconButton>
        <StyledTypography variant="h5">Seeds in Space</StyledTypography>
      </StyledAppBar>
      <AddSeedContainer>
        <StyledInputLabel shrink>DATE</StyledInputLabel>
        <MuiPicker value={date} onChange={date => setDate(date)} />
        <StyledInputLabel shrink>SEED TYPE</StyledInputLabel>
        <TextField
          name="seedType"
          value={type}
          onChange={e => setType(e.target.value)}
          select
          variant="outlined"
          SelectProps={{ native: true }}
        >
          {seedOptions.map(option => (
            <option key={option} value={option}>
              {option} seeds
            </option>
          ))}
        </TextField>
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
        <GridForm name="seedForm" onSubmit={handleSubmit(sendInfo)}>
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
        </GridForm>
      </AddSeedContainer>
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
