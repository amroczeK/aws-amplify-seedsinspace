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
  const [optionalFields, setOptionalFields] = useState({
    LeafCount: false,
    LeafLength: false,
    PhLevel: false,
    Temperature: false,
    WaterVolume: false,
  });

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
              error={errors?.Height ? true : false}
              helperText={errors?.Height?.message || null}
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
              error={errors?.StemLength ? true : false}
              helperText={errors?.StemLength?.message || null}
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
              error={errors?.LeafWidth ? true : false}
              helperText={errors?.LeafWidth?.message || null}
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
              error={errors?.LeafColour ? true : false}
              helperText={errors?.LeafColour?.message || null}
            />
          )}
        />
        {optionalFields.LeafCount && (
          <>
            <StyledInputLabel shrink>LEAF COUNT</StyledInputLabel>
            <Controller
              name="LeafCount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  error={errors?.LeafCount ? true : false}
                  helperText={errors?.LeafCount?.message || null}
                />
              )}
            />
          </>
        )}
        {optionalFields.LeafLength && (
          <>
            <StyledInputLabel shrink>LEAF LENGTH</StyledInputLabel>
            <Controller
              name="LeafLength"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  error={errors?.LeafLength ? true : false}
                  helperText={errors?.LeafLength?.message || null}
                />
              )}
            />
          </>
        )}
        {optionalFields.PhLevel && (
          <>
            <StyledInputLabel shrink>PH LEVEL</StyledInputLabel>
            <Controller
              name="PhLevel"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  error={errors?.PhLevel ? true : false}
                  helperText={errors?.PhLevel?.message || null}
                />
              )}
            />
          </>
        )}
        {optionalFields.Temperature && (
          <>
            <StyledInputLabel shrink>TEMPERATURE</StyledInputLabel>
            <Controller
              name="Temperature"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  error={errors?.Temperature ? true : false}
                  helperText={errors?.Temperature?.message || null}
                />
              )}
            />
          </>
        )}
        {optionalFields.WaterVolume && (
          <>
            <StyledInputLabel shrink>WATER VOLUME</StyledInputLabel>
            <Controller
              name="WaterVolume"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  error={errors?.WaterVolume ? true : false}
                  helperText={errors?.WaterVolume?.message || null}
                />
              )}
            />
          </>
        )}
        <AddOptionalFields
          optionalFields={optionalFields}
          setOptionalFields={setOptionalFields}
        />
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
              error={errors?.Notes ? true : false}
              helperText={errors?.Notes?.message || null}
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

const AddOptionalFields = ({ optionalFields, setOptionalFields }) => {
  const [showOptions, setShowOptions] = useState(null);

  const localOptions = { ...optionalFields };

  const handleChange = e => {
    const { id, checked } = e.target;
    localOptions[id] = checked;
  };

  function confirmSelection() {
    setShowOptions(false);
    setOptionalFields(localOptions);
  }

  return (
    <div>
      {!showOptions && (
        <StyledButton color="primary" onClick={() => setShowOptions(true)}>
          <b>+ Add new data measure</b>
        </StyledButton>
      )}
      {showOptions && (
        <>
          {Object.entries(optionalFields).map(([key, value], _index) => {
            return (
              <div key={_index}>
                <label>{key}</label>
                <input
                  id={key}
                  type="checkbox"
                  defaultChecked={value}
                  onChange={handleChange}
                />
              </div>
            );
          })}
          <StyledButton color="primary" onClick={confirmSelection}>
            <b>OK</b>
          </StyledButton>
        </>
      )}
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
