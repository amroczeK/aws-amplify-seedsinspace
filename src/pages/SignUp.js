import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import styled from "styled-components";
import { Camera } from "@styled-icons/bootstrap/Camera";
import { StyledButton } from "../components/styled-components/Buttons";
import { StyledLink } from "../components/styled-components/Links";
import { StyledTypographyDark } from "../components/styled-components/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import { Controller, useForm } from "react-hook-form";

const SignUp = () => {
  const [step, setStep] = useState(0);
  const [error, setError] = useState(null);
  const { control, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const signUp = async formData => {
    const { email, password, confirmPassword, organisation, address } = formData;
    console.log(formData);
    try {
      if (password === confirmPassword) {
        await Auth.signUp({
          username: email,
          password,
          attributes: { email, name: organisation, address },
        });
        setStep(1);
      } else {
        throw new Error("Passwords do not match.");
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const confirmSignUp = async formData => {
    const { email, authCode } = formData;
    try {
      await Auth.confirmSignUp(email, authCode);
      setStep(2);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    if (error) console.log(error);
  }, [error]);

  const Stepper = () => {
    return {
      0: <CreateAnAccount />,
      1: <ConfirmSignUp />,
      2: <FillInYourProfile />,
    }[step];
  };

  const CreateAnAccount = () => {
    return (
      <SignUpContainer>
        <GridForm onSubmit={handleSubmit(signUp)}>
          <StyledTypographyDark fontWeight="bold" variant="h5">
            Create an account
          </StyledTypographyDark>
          <InputLabel shrink>SCHOOL/ORGANISATION'S NAME</InputLabel>
          <Controller
            name="organisation"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} required variant="outlined" />}
          />
          <InputLabel shrink>SCHOOL/ORGANISATION'S ADDRESS</InputLabel>
          <Controller
            name="address"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} required variant="outlined" />}
          />
          <InputLabel shrink>EMAIL ADDRESS</InputLabel>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} type="email" required variant="outlined" />
            )}
          />
          <InputLabel shrink>PASSWORD</InputLabel>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} type="password" required variant="outlined" />
            )}
          />
          <InputLabel shrink>CONFIRM PASSWORD</InputLabel>
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} type="password" required variant="outlined" />
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
        <GridForm onSubmit={handleSubmit(confirmSignUp)}>
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
        <StyledTypographyDark fontWeight="bold" variant="h5">
          Fill in your profile
        </StyledTypographyDark>
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

  return (
    <Container>
      <Stepper />
    </Container>
  );
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
