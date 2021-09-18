import styled from "styled-components";
import Alert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import { useAws } from "../context/AWSContext";
import { unstable_batchedUpdates } from "react-dom";
import { Controller, useForm } from "react-hook-form";
import { SuccessSnackbar } from "../components/Snackbars";
import { Flexbox } from "../components/styled-components/Flexbox";
import { StyledLink } from "../components/styled-components/Links";
import { StyledButton } from "../components/styled-components/Buttons";
import { changePasswordResolver } from "../components/validation/schemas";
import { StyledInputLabel } from "../components/styled-components/InputLabel";
import { useHistory } from "react-router-dom";

const ChangePassword = () => {
  const [submitError, setSubmitError] = useState(null);
  const [showSnack, setShowSnack] = useState(true);
  const { changePassword } = useAws();
  const { control, handleSubmit, formState } = useForm({
    resolver: changePasswordResolver,
  });
  const { errors } = formState;

   const history = useHistory();

  const confirmPasswordChangeHandler = async formData => {
    try {
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
        setTimeout(()=>{
          history.push("/profile");
        }, 1000)
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
        </GridForm>
        <SuccessSnackbar
          openSnack={showSnack}
          setOpenSnack={setShowSnack}
          text="Success! Password updated"
        />
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
