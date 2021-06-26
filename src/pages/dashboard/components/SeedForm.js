import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { StyledButton } from "../../../components/styled-components/Buttons";
import styled from "styled-components";
import { Controller } from "react-hook-form";
import { StyledInputLabel } from "../../../components/styled-components/InputLabel";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { InputAdornment } from "@material-ui/core";

const SeedForm = ({ name, control, errors }) => {
  return (
    <StyledTabPanel>
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
        <StyledSeedInfo></StyledSeedInfo>
        <StyledSeedInfoHeader>
          <Typography
            variant="subtitle2"
            style={{ fontWeight: "bold", color: "#9E9E9E" }}
          >
            SEED DATA
          </Typography>
        </StyledSeedInfoHeader>
        <StyledSeedInfo>
          <GridForm>
            <StyledInputLabel shrink>HEIGHT</StyledInputLabel>
            <Controller
              name="height"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  error={errors?.height}
                  helperText={errors?.height?.message}
                  InputProps={{
                    endAdornment: <InputAdornment>millimeter</InputAdornment>,
                  }}
                />
              )}
            />
            <StyledInputLabel shrink>STEM LENGTH</StyledInputLabel>
            <Controller
              name="seed"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  error={errors?.stem}
                  helperText={errors?.stem?.message}
                  InputProps={{
                    endAdornment: <InputAdornment>millimeter</InputAdornment>,
                  }}
                />
              )}
            />
            <StyledInputLabel shrink>LEAF SIZE</StyledInputLabel>
            <Controller
              name="seed"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  error={errors?.size}
                  helperText={errors?.size?.message}
                  InputProps={{
                    endAdornment: <InputAdornment>millimeter</InputAdornment>,
                  }}
                />
              )}
            />
            <StyledInputLabel shrink>LEAF COLOR</StyledInputLabel>
            <Controller
              name="seed"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  error={errors?.color}
                  helperText={errors?.color?.message}
                />
              )}
            />
          </GridForm>
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
          <GridForm>
            <Controller
              name="notes"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  multiline
                  rows={10}
                  error={errors?.notes}
                  helperText={errors?.notes?.message}
                />
              )}
            />
          </GridForm>
        </StyledSeedInfo>
        <StyledSeedInfo>
          <StyledButton color="primary" padding="1em 1em">
            <b>Stop recording data for this seed</b>
          </StyledButton>
        </StyledSeedInfo>
      </Card>
      <StyledButton color="primary" type="submit" disableElevation variant="contained">
        Save entry
      </StyledButton>
    </StyledTabPanel>
  );
};

export default SeedForm;

const GridForm = styled.form`
  display: grid;
  gap: 1em;
`;

const StyledTabPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

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
