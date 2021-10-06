import styled from "styled-components";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAws } from "../../context/AWSContext";
import { Controller, useForm } from "react-hook-form";
import { Flexbox } from "../styled-components/Flexbox";
import { StyledButton } from "../styled-components/Buttons";
import { passwordResetChangePasswordResolver } from "../validation/schemas";
import { StyledInputLabel } from "../styled-components/InputLabel";
import { SuccessSnackbar } from "../Snackbars";

const PasswordReset = ({ username }) => {
  const history = useHistory();
  const [submitError, setSubmitError] = useState(null);
  const [showSnack, setShowSnack] = useState(false);
  const { forgotPasswordSubmit } = useAws();
  const { control, handleSubmit, formState } = useForm({
    resolver: passwordResetChangePasswordResolver,
  });
  const { errors } = formState;

  const forgotPasswordSubmitHandler = async formData => {
    try {
      let { verificationCode: code, newPassword } = formData;
      code = code.toString();
      await forgotPasswordSubmit({
        username,
        code,
        newPassword,
      });

      setShowSnack(true);
      setTimeout(() => history.push("/signin"), 2000);
    } catch (error) {
      console.log(error);
      setSubmitError(error);
    }
  };

  return (
    <Flexbox direction="column" alignItems="center" margin="10em 0em">
      <GridForm onSubmit={handleSubmit(forgotPasswordSubmitHandler)}>
        <Typography style={{ fontWeight: "bold" }} variant="h5">
          Set your new password
        </Typography>
        <p style={{ margin: "0px" }}>Check your email inbox for verification code.</p>
        <StyledInputLabel shrink>VERIFICATION CODE</StyledInputLabel>
        <Controller
          name="verificationCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              placeholder="Verification code"
              inputProps={{ maxLength: 6 }}
              error={errors?.verificationCode ? true : false}
              helperText={errors?.verificationCode && "Verification code is required and must be 6 digits"}
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
              placeholder="Password"
              variant="outlined"
              error={errors?.newPassword ? true : false}
              helperText={errors?.newPassword?.message || "Password must be minimum of 8 characters"}
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
              placeholder="Confirm password"
              error={errors?.confirmNewPassword ? true : false}
              helperText={errors?.confirmNewPassword?.message}
            />
          )}
        />
        {submitError && <Alert severity="error">{submitError.message}</Alert>}
        <StyledButton color="primary" type="submit" disableElevation variant="contained">
          Change password
        </StyledButton>
      </GridForm>
      <SuccessSnackbar openSnack={showSnack} setOpenSnack={setShowSnack} text="Success! Password changed" />
    </Flexbox>
  );
};

export default PasswordReset;

const GridForm = styled.form`
  display: grid;
  gap: 1em;
  margin: 1em 0;
`;
