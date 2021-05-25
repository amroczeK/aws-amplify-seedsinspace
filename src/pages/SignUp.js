import React, { useState } from "react";
// import { Auth } from "aws-amplify";
import styled from "styled-components";
import { Camera } from "@styled-icons/bootstrap/Camera";
import { StyledButton } from "../components/styled-components/Buttons";
import { StyledLink } from "../components/styled-components/Links";
import { StyledTypographyDark } from "../components/styled-components/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import { Controller, useForm } from "react-hook-form";

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

const SignUp = () => {
  const [step, setStep] = useState(0);
  const { control, handleSubmit, formState } = useForm();
  const { errors } = formState;

  console.log(`error: ${errors}`);

  async function signUp(formData) {
    console.log("Submitting Data");
    console.log(formData);
    setStep(1);
    // var username;
    // var password;
    // try {
    //   const user = await Auth.signIn(username, password);
    // } catch (error) {
    //   console.log("error signing in", error);
    // }
  }

  const stepContent = () => {
    return {
      0: <CreateAnAccount />,
      1: <FillInYourProfile />,
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
            render={({ field }) => <TextField {...field} variant="outlined" />}
          />
          <InputLabel shrink>EMAIL ADDRESS</InputLabel>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} variant="outlined" />}
          />
          <InputLabel shrink>NEW PASSWORD</InputLabel>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} type="password" variant="outlined" />
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
        <StyledButton
          disableElevation
          variant="contained"
          onClick={() => setStep(2)}
        >
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
