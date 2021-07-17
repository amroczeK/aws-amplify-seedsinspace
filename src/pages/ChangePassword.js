import { useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { useAws } from "../context/AWSContext";
import { StyledInputLabel } from "../components/styled-components/InputLabel";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { SuccessSnackbar } from "../components/Snackbars";
import Alert from "@material-ui/lab/Alert";
import { StyledButton } from "../components/styled-components/Buttons";
import { changePasswordResolver } from "../components/validation/schemas";
import Container from "@material-ui/core/Container";
import { Flexbox } from "../components/styled-components/Flexbox";
import { StyledLink } from "../components/styled-components/Links";

const ChangePassword = () => {
  const [submitError, setSubmitError] = useState(null);
  const [showSnack, setShowSnack] = useState(false);
  const { changePassword } = useAws();
  const { control, handleSubmit, formState } = useForm({
    resolver: changePasswordResolver,
  });
  const { errors } = formState;

  const confirmPasswordChangeHandler = async formData => {
    try {
      console.log(formData);
      const { oldPassword, newPassword } = formData;
      const result = await changePassword({
        oldPassword,
        newPassword,
      });
      if (result === "SUCCESS") {
        unstable_batchedUpdates(() => {
          setShowSnack(true);
          setSubmitError(null);
        });
      }
    } catch (error) {
      console.log(error);
      setSubmitError(error);
    }
  };

  return (
    <Container>
      <Flexbox direction="column" alignItems="center">
        <GridForm onSubmit={handleSubmit(confirmPasswordChangeHandler)}>
          <Typography style={{ fontWeight: "bold" }} variant="h5">
            Change Password
          </Typography>
          <StyledInputLabel shrink>OLD PASSWORD</StyledInputLabel>
          <Controller
            name="oldPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                variant="outlined"
                error={errors?.oldPassword ? true : false}
                helperText={errors?.oldPassword?.message}
              />
            )}
          />
          <StyledInputLabel shrink>NEW PASSWORD</StyledInputLabel>
          <Controller
            name="newPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                variant="outlined"
                error={errors?.newPassword ? true : false}
                helperText={
                  errors?.newPassword?.message ||
                  "Password must be minimum of 8 characters"
                }
              />
            )}
          />
          <StyledInputLabel shrink>CONFIRM NEW PASSWORD</StyledInputLabel>
          <Controller
            name="confirmNewPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                variant="outlined"
                error={errors?.confirmNewPassword ? true : false}
                helperText={errors?.confirmNewPassword?.message}
              />
            )}
          />
          {submitError && <Alert severity="error">{submitError.message}</Alert>}
          <StyledButton
            color="primary"
            type="submit"
            disableElevation
            variant="contained"
          >
            Save
          </StyledButton>
          <StyledLink to="/profile" alignself="center" style={{ textAlign: "center" }}>
            Cancel
          </StyledLink>
          <SuccessSnackbar
            open={showSnack}
            text="Success! Password updated"
            onClose={() => setShowSnack(false)}
          />
        </GridForm>
      </Flexbox>
    </Container>
  );
};

export default ChangePassword;

const GridForm = styled.form`
  display: grid;
  gap: 1em;
  margin: 1em 0;
`;
