import { useState } from "react";
import { Controller } from "react-hook-form";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { InputAdornment } from "@material-ui/core";
import { StyledButton } from "./styled-components/Buttons";
import { StyledInputLabel } from "./styled-components/InputLabel";
import ImageUpload from "./ImageUpload";
import StyledModal from "./styled-components/Modal";

const RemoveEntryModal = ({ open, close, name }) => {
  return (
    <StyledModal open={open} onClose={close} title={`Stop recording ${name} data`}>
      <Typography gutterBottom>
        You won't be able to record future seed entries for this seed but previous data
        recorded for this seed will be saved.
      </Typography>
      <StyledButton color="primary" variant="contained" disableElevation>
        Confirm
      </StyledButton>
      <StyledButton color="primary" disableElevation>
        Cancel
      </StyledButton>
    </StyledModal>
  );
};

const AddSeedFormFields = ({ name, register, control, setValue }) => {
  const [open, setModalOpen] = useState(false);

  // If navigating away and unsaved - prompt to save/discard
  return (
    <>
      <div style={{ display: "grid", gap: "1em" }}>
        <Card>
          <StyledSeedHeader>
            <Typography variant="subtitle2" style={{ fontWeight: "600" }}>
              SEED NAME
            </Typography>
            <Typography variant="h6" style={{ fontWeight: "bold", color: "#fff" }}>
              {name}
            </Typography>
          </StyledSeedHeader>
          <StyledSeedInfoHeader>
            <Typography
              variant="subtitle2"
              style={{ fontWeight: "bold", color: "#9E9E9E" }}
            >
              PHOTOS
            </Typography>
          </StyledSeedInfoHeader>
          <StyledSeedInfo>
            <ImageUpload
              name="image" // need to add date to the name
              preview={false}
              register={register}
              path="protected/"
              level="protected"
              text="Add photo"
              setValue={setValue}
            />
          </StyledSeedInfo>
          <StyledSeedInfoHeader>
            <Typography
              variant="subtitle2"
              style={{ fontWeight: "bold", color: "#9E9E9E" }}
            >
              SEED DATA
            </Typography>
          </StyledSeedInfoHeader>
          <StyledSeedInfo>
            <StyledInputLabel shrink>HEIGHT</StyledInputLabel>
            <Controller
              name="height"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  InputProps={{
                    endAdornment: <InputAdornment>millimeter</InputAdornment>,
                  }}
                />
              )}
            />
            <StyledInputLabel shrink>STEM LENGTH</StyledInputLabel>
            <Controller
              name="stemLength"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  InputProps={{
                    endAdornment: <InputAdornment>millimeter</InputAdornment>,
                  }}
                />
              )}
            />
            <StyledInputLabel shrink>LEAF SIZE</StyledInputLabel>
            <Controller
              name="leafSize"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  InputProps={{
                    endAdornment: <InputAdornment>millimeter</InputAdornment>,
                  }}
                />
              )}
            />
            <StyledInputLabel shrink>LEAF COLOR</StyledInputLabel>
            <Controller
              name="leafColor"
              control={control}
              render={({ field }) => <TextField {...field} variant="outlined" />}
            />
            <StyledButton color="primary">
              <b>+ Add new data measure</b>
            </StyledButton>
          </StyledSeedInfo>
          <StyledSeedInfoHeader>
            <Typography
              variant="subtitle2"
              style={{ fontWeight: "bold", color: "#9E9E9E" }}
            >
              NOTES
            </Typography>
          </StyledSeedInfoHeader>
          <StyledSeedInfo>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <TextField {...field} variant="outlined" multiline rows={10} />
              )}
            />
          </StyledSeedInfo>
          <StyledSeedInfo>
            <StyledButton
              color="primary"
              padding="1em 1em"
              onClick={() => setModalOpen(true)}
            >
              <b>Stop recording data for this seed</b>
            </StyledButton>
          </StyledSeedInfo>
        </Card>
      </div>
      <RemoveEntryModal open={open} close={() => setModalOpen(false)} name={name} />
    </>
  );
};

export default AddSeedFormFields;

const StyledSeedHeader = styled(CardContent)`
  padding: 1.5em;
  background-color: #9e9e9e;
`;

const StyledSeedInfoHeader = styled(CardContent)`
  padding: 0.5em 1.5em;
  background-color: #e0e0e0;
`;

const StyledSeedInfo = styled(CardContent)`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em 1.5em;
  background-color: #fff;
  &:last-child {
    border-top: 1px solid #e0e0e0;
    padding: 0em;
  }
`;
