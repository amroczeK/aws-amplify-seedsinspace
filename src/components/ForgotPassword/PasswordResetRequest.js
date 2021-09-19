import styled from "styled-components";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import { useAws } from "../../context/AWSContext";
import { Controller, useForm } from "react-hook-form";
import { Flexbox } from "../styled-components/Flexbox";
import { StyledLink } from "../styled-components/Links";
import { StyledButton } from "../styled-components/Buttons";
import { passwordResetResolver } from "../validation/schemas";
import { StyledInputLabel } from "../styled-components/InputLabel";

const PasswordReset = ({ setStep, setUsername }) => {
  const [submitError, setSubmitError] = useState(null);

  const { forgotPassword } = useAws();
  const { control, handleSubmit, formState } = useForm({
    resolver: passwordResetResolver,
  });
  const { errors } = formState;

  const forgotPasswordHandler = async formData => {
    try {
      const { email: username } = formData;

      await forgotPassword({
        username,
      });
      setUsername(username);
      setStep(1);
    } catch (error) {
      console.log(error);
      setSubmitError(error);
    }
  };

  return (
    <Flexbox direction="column" alignItems="center">
      <GridForm onSubmit={handleSubmit(forgotPasswordHandler)}>
        <Typography style={{ fontWeight: "bold" }} variant="h5">
          Forgot Password
        </Typography>
        <p style={{ margin: "0px" }}>
          Enter your email address and we'll send you a verification code.
        </p>
        <StyledInputLabel shrink>EMAIL</StyledInputLabel>
        <Controller
          name="email"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="email"
              variant="outlined"
              placeholder="Enter your email address"
              error={errors?.username ? true : false}
              helperText={errors?.username?.message}
            />
          )}
        />
        {submitError && <Alert severity="error">{submitError.message}</Alert>}
        <StyledButton color="primary" type="submit" disableElevation variant="contained">
          Send email
        </StyledButton>
        <StyledLink to="/signin" alignself="center" style={{ textAlign: "center" }}>
          Cancel
        </StyledLink>
      </GridForm>
    </Flexbox>
  );
};

export default PasswordReset;

const GridForm = styled.form`
  display: grid;
  gap: 1em;
  margin: 1em 0;
`;
