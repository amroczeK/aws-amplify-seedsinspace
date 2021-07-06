import { useState } from "react";
import { Controller } from "react-hook-form";
import styled from "styled-components";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { InputAdornment } from "@material-ui/core";
import { StyledButton } from "../styled-components/Buttons";
import { StyledInputLabel } from "../styled-components/InputLabel";
import ImageUpload from "../ImageUpload";
import RemoveEntryModal from "./RemoveEntryModal";

const AddSeedFormFields = ({ name, control, setValue, errors }) => {
  const [open, setModalOpen] = useState(false);

  return (
    <div style={{ display: "grid" }}>
      <SeedHeader>
        <Typography variant="subtitle2" style={{ fontWeight: "600" }}>
          SEED NAME
        </Typography>
        <Typography variant="h6" style={{ fontWeight: "bold", color: "#fff" }}>
          {name}
        </Typography>
      </SeedHeader>

      <GroupLabel variant="subtitle2">PHOTOS</GroupLabel>
      <StyledSeedInfo>
        <ImageUpload
          name="seedImage"
          text="Add photo"
          setValue={setValue}
          error={errors.seedImage || null}
        />
      </StyledSeedInfo>

      <GroupLabel variant="subtitle2">SEED DATA</GroupLabel>
      <StyledSeedInfo>
        <StyledInputLabel shrink>HEIGHT</StyledInputLabel>
        <Controller
          name="Height"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              error={errors?.height ? true : false}
              helperText={errors?.height?.message || null}
              InputProps={{
                endAdornment: <InputAdornment>millimeter</InputAdornment>,
              }}
            />
          )}
        />
        <StyledInputLabel shrink>STEM LENGTH</StyledInputLabel>
        <Controller
          name="StemLength"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              error={errors?.stemLength ? true : false}
              helperText={errors?.stemLength?.message || null}
              InputProps={{
                endAdornment: <InputAdornment>millimeter</InputAdornment>,
              }}
            />
          )}
        />
        <StyledInputLabel shrink>LEAF WIDTH</StyledInputLabel>
        <Controller
          name="LeafWidth"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              error={errors?.leafSize ? true : false}
              helperText={errors?.leafSize?.message || null}
              InputProps={{
                endAdornment: <InputAdornment>millimeter</InputAdornment>,
              }}
            />
          )}
        />
        <StyledInputLabel shrink>LEAF COLOUR</StyledInputLabel>
        <Controller
          name="LeafColour"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              error={errors?.leafColor ? true : false}
              helperText={errors?.leafColor?.message || null}
            />
          )}
        />
        <StyledButton color="primary">
          <b>+ Add new data measure</b>
        </StyledButton>
      </StyledSeedInfo>

      <GroupLabel variant="subtitle2">NOTES</GroupLabel>
      <StyledSeedInfo>
        <Controller
          name="Notes"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              multiline
              rows={10}
              error={errors?.notes ? true : false}
              helperText={errors?.notes?.message || null}
            />
          )}
        />
      </StyledSeedInfo>

      <StyledButton color="primary" padding="1em 1em" onClick={() => setModalOpen(true)}>
        <b>Stop recording data for this seed</b>
      </StyledButton>
      <RemoveEntryModal open={open} close={() => setModalOpen(false)} name={name} />
    </div>
  );
};

export default AddSeedFormFields;

const GroupLabel = styled(Typography)`
  font-weight: bold;
  color: #9e9e9e;
  background-color: #e0e0e0;
  padding: 0.5em 1.5em;
`;

const SeedHeader = styled(CardContent)`
  padding: 1.5em;
  background-color: #9e9e9e;
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
