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
import { Button } from "../styled-components/Buttons";
import { SuccessSnackbar, ErrorSnackbar } from "../Snackbars";
import { MuiPicker } from "../MaterialUIPicker";
import ImageUpload from "../ImageUpload";
import AddSeedFormFields from "./AddSeedFormFields";
import AddSeedResolver from "../validation/addSeedValidation";
import RemoveEntryModal from "./RemoveEntryModal";
import * as API from "../../apis";
import { useAws } from "../../context/AWSContext";
import WattleSad from "../../assets/WattleSad.png";
import useSchoolData from "../hooks/schoolData";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const seedOptions = ["Earth", "Space"];

const formatDate = currentDate => {
  const isoDateString = new Date(currentDate).toISOString();
  return isoDateString.split("T")[0];
};

const AddSeedDialog = ({ open, onClose }) => {
  const { cognitoUser, uploadImage } = useAws();
  const { schoolData, setRefetch } = useSchoolData();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [seedTab, setSeedTab] = useState(0);
  const [type, setType] = useState(seedOptions[0]);
  const [date, setDate] = useState(new Date());
  const [openSnack, setOpenSnack] = useState(false);
  const [error, setError] = useState(null);

  const { formState, handleSubmit, register, reset, setValue, watch } = useForm({
    resolver: AddSeedResolver,
    shouldUnregister: true,
  });
  const { errors } = formState;

  function onModalClose() {
    reset();
    onClose();
  }

  function onTabChange(_event, newTab) {
    setSeedTab(newTab);
    reset();
  }

  function checkForInactiveSeed() {
    if (schoolData?.InactiveSeeds) {
      return schoolData.InactiveSeeds.includes(`${type}_Seed_${seedTab + 1}`);
    }
    return false;
  }

  async function onValidationSuccess(formData) {
    try {
      const { seedImage, ...formFields } = formData;
      const formattedDate = formatDate(date);
      const SeedNumber = seedTab + 1;
      const filename = `${cognitoUser.username}_${formattedDate}_${type}_Seed_${SeedNumber}`;

      const seedReq = { SeedNumber, Type: type, Date: formattedDate, ...formFields };
      await API.addSeed(seedReq);

      if (seedImage) {
        const imageReq = {
          file: seedImage[0],
          filename,
          path: "seed_images/",
          level: "protected",
        };
        await uploadImage(imageReq);
      }
      setOpenSnack(true);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }

  return (
    <Dialog
      id="add-seed-dialog"
      fullScreen
      style={{ width: !isSmall && 850 }}
      open={open}
      TransitionComponent={Transition}
    >
      <StyledAppBar>
        <IconButton onClick={onModalClose}>
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
          onChange={onTabChange}
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

        {checkForInactiveSeed() ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1em",
              marginTop: "3em",
            }}
          >
            <Typography variant="h4">Seed no longer being tracked...</Typography>
            <img src={WattleSad} alt="sadWattle" style={{ height: 250 }} />
          </div>
        ) : (
          <GridForm
            name="seedForm"
            onSubmit={handleSubmit(onValidationSuccess, () =>
              setError("Your form has errors")
            )}
          >
            <AddSeedFormFields
              name={`${type} Seed - ${seedTab + 1}`}
              register={register}
              errors={errors}
              isSmall={isSmall}
            >
              <ImageUpload
                name="seedImage"
                text="Add photo"
                formValue={watch("seedImage")}
                setValue={setValue}
                error={errors.seedImage || null}
              />
            </AddSeedFormFields>
            <RemoveEntryModal
              name={`${type}_Seed_${seedTab + 1}`}
              schoolData={schoolData}
              refetch={setRefetch}
            />
            <Button type="submit">Save entry</Button>
            <Button color="secondary" onClick={() => reset()}>
              RESET
            </Button>
          </GridForm>
        )}
      </AddSeedContainer>
      <SuccessSnackbar
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
        text="Success! Seed Added"
      />
      <ErrorSnackbar
        openSnack={error ? true : false}
        setOpenSnack={setError}
        error={error}
      />
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
