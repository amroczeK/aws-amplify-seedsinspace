import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Camera } from "@styled-icons/bootstrap/Camera";
import { StyledButton } from "../components/styled-components/Buttons";
import { StyledLink } from "../components/styled-components/Links";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import { Controller, useForm } from "react-hook-form";
import { UserContext } from "../components/context/User";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../components/validation/schemas";
import Typography from "@material-ui/core/Typography";

const SignUp = () => {
  const [step, setStep] = useState(0);
  const [error, setError] = useState(null);
  const { control, handleSubmit, formState } = useForm({
    resolver: yupResolver(signUpSchema),
  });
  const { errors } = formState;

  const { signUp, confirmSignUp } = useContext(UserContext);

  const signUpHandler = async formData => {
    try {
      await signUp(formData);
      setStep(1);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const confirmSignUpHandler = async formData => {
    try {
      await confirmSignUp(formData);
      setStep(2);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const stepContent = () => {
    return {
      0: <CreateAnAccount />,
      1: <ConfirmSignUp />,
      2: <FillInYourProfile />,
    }[step];
  };

  const CreateAnAccount = () => {
    return (
      <SignUpContainer>
        <GridForm onSubmit={handleSubmit(signUpHandler)}>
          <Typography style={{ fontWeight: "bold" }} variant="h5">
            Create an account
          </Typography>
          <InputLabel shrink>SCHOOL/ORGANISATION NAME</InputLabel>
          <Controller
            name="organisation"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                error={errors?.organisation}
                helperText={errors?.organisation?.message}
              />
            )}
          />
          <InputLabel shrink>SCHOOL/ORGANISATION ADDRESS</InputLabel>
          <Controller
            name="address"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                error={errors?.address}
                helperText={errors?.address?.message}
              />
            )}
          />
          <InputLabel shrink>EMAIL ADDRESS</InputLabel>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                error={errors?.email}
                helperText={errors?.email?.message}
              />
            )}
          />
          <InputLabel shrink>PASSWORD</InputLabel>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                variant="outlined"
                error={errors?.password}
                helperText={errors?.password?.message}
              />
            )}
          />
          <InputLabel shrink>CONFIRM PASSWORD</InputLabel>
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                variant="outlined"
                error={errors?.confirmPassword}
                helperText={errors?.confirmPassword?.message}
              />
            )}
          />
          <StyledLink to="/">SIS disclaimer / terms and conditions</StyledLink>
          <StyledButton disableElevation variant="contained" type="submit">
            Create account
          </StyledButton>
        </GridForm>
      </SignUpContainer>
    );
  };

  const ConfirmSignUp = () => {
    return (
      <SignUpContainer>
        <GridForm onSubmit={handleSubmit(confirmSignUpHandler)}>
          <InputLabel shrink>EMAIL ADDRESS</InputLabel>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} type="email" required variant="outlined" />
            )}
          />
          <InputLabel shrink>CONFIRMATION CODE</InputLabel>
          <Controller
            name="authCode"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} required variant="outlined" />}
          />
          {error && <Alert severity="error">{error.message}</Alert>}
          <StyledButton disableElevation variant="contained" type="submit">
            Create account
          </StyledButton>
        </GridForm>
      </SignUpContainer>
    );
  };

  const FillInYourProfile = () => {
    return (
      <SignUpContainer>
        <Typography style={{ fontWeight: "bold" }} variant="h5">
          Fill in your profile
        </Typography>
        <span>
          <CameraIcon />
          <StyledLink to="/" margin="0 2em">
            + Add your logo
          </StyledLink>
        </span>
        <InputLabel shrink>LOCATION</InputLabel>
        <Controller
          name="location"
          defaultValue=""
          control={control}
          render={({ field }) => <TextField {...field} variant="outlined" />}
        />

        <InputLabel shrink>TELL US ABOUT YOURSELF</InputLabel>
        <Controller
          name="about"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField {...field} multiline variant="outlined" rows={10} />
          )}
        />
        <StyledButton disableElevation variant="contained" onClick={() => setStep(2)}>
          Next
        </StyledButton>
        <StyledLink to="/" alignself="center">
          Skip for now
        </StyledLink>
      </SignUpContainer>
    );
  };

  return <Container>{stepContent()}</Container>;
};

export default SignUp;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 300px;
`;

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100%;
  max-width: 350px;
  margin: 2em 1em 1em 1em;
  padding: 1em;
  gap: 1em;
`;

const CameraIcon = styled(Camera)`
  width: 2em;
  height: 2em;
  color: black;
  margin: 1em 0;
`;

const GridForm = styled.form`
  display: grid;
  gap: 1em;
`;
