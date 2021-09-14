import React, { useState } from "react";
import styled from "styled-components";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Adornment from "@material-ui/core/InputAdornment";
import Dialog from "@material-ui/core/Dialog";
import { StyledButton } from "../styled-components/Buttons";
import { StyledInputLabel } from "../styled-components/InputLabel";

const charCode = code => String.fromCharCode(code);

const defaultOptionalFields = {
  LeafCount: { active: false, name: "Leaf Count", measure: null },
  LeafLength: { active: false, name: "Leaf Length", measure: "mm" },
  PhLevel: { active: false, name: "PH Level", measure: null },
  Temperature: { active: false, name: "Temperature", measure: `${charCode(176)}C` },
  WaterVolume: { active: false, name: "Water Volume", measure: "ml" },
};

const AddSeedFormFields = ({ name, register, errors, isSmall, children }) => {
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
      <StyledSeedInfo>{children}</StyledSeedInfo>
      <GroupLabel variant="subtitle2">SEED DATA</GroupLabel>
      <StyledSeedInfo>
        <StyledInputLabel shrink>HEIGHT *</StyledInputLabel>
        <TextField
          {...register("Height")}
          name="Height"
          variant="outlined"
          error={errors?.Height ? true : false}
          helperText={errors?.Height?.message || null}
          InputProps={{ endAdornment: <Adornment>mm</Adornment> }}
        />
        <StyledInputLabel shrink>STEM LENGTH *</StyledInputLabel>
        <TextField
          {...register("StemLength")}
          name="StemLength"
          variant="outlined"
          error={errors?.StemLength ? true : false}
          helperText={errors?.StemLength?.message || null}
          InputProps={{ endAdornment: <Adornment>mm</Adornment> }}
        />
        <StyledInputLabel shrink>LEAF WIDTH *</StyledInputLabel>
        <TextField
          {...register("LeafWidth")}
          name="LeafWidth"
          variant="outlined"
          error={errors?.LeafWidth ? true : false}
          helperText={errors?.LeafWidth?.message || null}
          InputProps={{ endAdornment: <Adornment>mm</Adornment> }}
        />

        <StyledInputLabel shrink>LEAF COLOUR *</StyledInputLabel>
        <TextField
          name="LeafColour"
          {...register("LeafColour")}
          variant="outlined"
          error={errors?.LeafColour ? true : false}
          helperText={errors?.LeafColour?.message || null}
        />

        {optionalFields.LeafCount.active && (
          <>
            <StyledInputLabel shrink>LEAF COUNT</StyledInputLabel>
            <TextField
              {...register("LeafCount")}
              name="LeafCount"
              variant="outlined"
              error={errors?.LeafCount ? true : false}
              helperText={errors?.LeafCount?.message || null}
            />
          </>
        )}
        {optionalFields.LeafLength.active && (
          <>
            <StyledInputLabel shrink>LEAF LENGTH</StyledInputLabel>
            <TextField
              {...register("LeafLength")}
              name="LeafLength"
              variant="outlined"
              error={errors?.LeafLength ? true : false}
              helperText={errors?.LeafLength?.message || null}
              InputProps={{ endAdornment: <Adornment>mm</Adornment> }}
            />
          </>
        )}
        {optionalFields.PhLevel.active && (
          <>
            <StyledInputLabel shrink>PH LEVEL</StyledInputLabel>
            <TextField
              {...register("PhLevel")}
              name="PhLevel"
              variant="outlined"
              error={errors?.PhLevel ? true : false}
              helperText={errors?.PhLevel?.message || null}
            />
          </>
        )}
        {optionalFields.Temperature.active && (
          <>
            <StyledInputLabel shrink>TEMPERATURE</StyledInputLabel>
            <TextField
              {...register("Temperature")}
              name="Temperature"
              variant="outlined"
              error={errors?.Temperature ? true : false}
              helperText={errors?.Temperature?.message || null}
              InputProps={{ endAdornment: <Adornment>{charCode(176)}C</Adornment> }}
            />
          </>
        )}
        {optionalFields.WaterVolume.active && (
          <>
            <StyledInputLabel shrink>WATER VOLUME</StyledInputLabel>
            <TextField
              {...register("WaterVolume")}
              name="WaterVolume"
              variant="outlined"
              error={errors?.WaterVolume ? true : false}
              helperText={errors?.WaterVolume?.message || null}
              InputProps={{ endAdornment: <Adornment>ml</Adornment> }}
            />
          </>
        )}
        <OptionalFieldControl
          optionalFields={optionalFields}
          setOptionalFields={setOptionalFields}
          isSmall={isSmall}
        />
      </StyledSeedInfo>
      <GroupLabel variant="subtitle2">NOTES</GroupLabel>
      <StyledSeedInfo>
        <TextField
          {...register("Notes")}
          name="Notes"
          variant="outlined"
          multiline
          rows={10}
          error={errors?.Notes ? true : false}
          helperText={errors?.Notes?.message || null}
        />
      </StyledSeedInfo>
    </div>
  );
};

const OptionalFieldControl = ({ optionalFields, setOptionalFields, isSmall }) => {
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
      <Dialog style={{ width: !isSmall && 850 }} open={showOptions ? true : false}>
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
