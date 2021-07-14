import { useState } from "react";
import { Controller } from "react-hook-form";
import styled from "styled-components";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import Dialog from "@material-ui/core/Dialog";
import { StyledButton } from "../styled-components/Buttons";
import { StyledInputLabel } from "../styled-components/InputLabel";
import ImageUpload from "../ImageUpload";
import RemoveEntryModal from "./RemoveEntryModal";

const charCode = code => String.fromCharCode(code);

const defaultOptionalFields = {
  LeafCount: { active: false, name: "Leaf Count", measure: null },
  LeafLength: { active: false, name: "Leaf Length", measure: "mm" },
  PhLevel: { active: false, name: "PH Level", measure: null },
  Temperature: { active: false, name: "Temperature", measure: `${charCode(176)}C` },
  WaterVolume: { active: false, name: "Water Volume", measure: "ml" },
};

const AddSeedFormFields = ({ name, control, setValue, errors }) => {
  const [open, setModalOpen] = useState(false);
  const [optionalFields, setOptionalFields] = useState(defaultOptionalFields);

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

      <GroupLabel variant="subtitle2">PHOTO*</GroupLabel>
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
        <StyledInputLabel shrink>HEIGHT *</StyledInputLabel>
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
                endAdornment: <InputAdornment>mm</InputAdornment>,
              }}
            />
          )}
        />
        <StyledInputLabel shrink>STEM LENGTH *</StyledInputLabel>
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
                endAdornment: <InputAdornment>mm</InputAdornment>,
              }}
            />
          )}
        />
        <StyledInputLabel shrink>LEAF WIDTH *</StyledInputLabel>
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
                endAdornment: <InputAdornment>mm</InputAdornment>,
              }}
            />
          )}
        />
        <StyledInputLabel shrink>LEAF COLOUR *</StyledInputLabel>
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
        {optionalFields.LeafCount.active && (
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
        {optionalFields.LeafLength.active && (
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
                  InputProps={{
                    endAdornment: <InputAdornment>mm</InputAdornment>,
                  }}
                />
              )}
            />
          </>
        )}
        {optionalFields.PhLevel.active && (
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
        {optionalFields.Temperature.active && (
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
                  InputProps={{
                    endAdornment: <InputAdornment>{charCode(176)}C</InputAdornment>,
                  }}
                />
              )}
            />
          </>
        )}
        {optionalFields.WaterVolume.active && (
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
                  InputProps={{
                    endAdornment: <InputAdornment>ml</InputAdornment>,
                  }}
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

  let localOptions = { ...optionalFields };

  const handleChange = e => {
    const { id, checked } = e.target;
    localOptions[id] = { ...localOptions[id], active: checked };
  };

  function confirmSelection() {
    setOptionalFields(localOptions);
    setShowOptions(false);
  }

  return (
    <div>
      <StyledButton color="primary" onClick={() => setShowOptions(true)}>
        <b>+ Add new data measure</b>
      </StyledButton>
      <Dialog open={showOptions ? true : false}>
        <div style={{ padding: "1em" }}>
          {Object.entries(optionalFields).map(([key, value], _index) => {
            const { active, measure, name } = value;

            return (
              <div key={_index} style={{ padding: "6px 0" }}>
                <span style={{ display: "inline-block", width: 150, marginLeft: "1em" }}>
                  {name}
                  {measure && ` (${measure})`}
                </span>
                <input
                  type="checkbox"
                  id={key}
                  defaultChecked={active}
                  onChange={handleChange}
                />
              </div>
            );
          })}
          <StyledButton color="primary" onClick={confirmSelection}>
            <b>OK</b>
          </StyledButton>
        </div>
      </Dialog>
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
