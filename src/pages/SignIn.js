import React from "react";
import { Auth } from "aws-amplify";
import styled from "styled-components";
import { StyledLink } from "../components/styled-components/Links";
import { StyledButton } from "../components/styled-components/Buttons";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Logo from "../assets/logo.png";
import { Controller, useForm } from "react-hook-form";

const SignIn = () => {
  const { control, handleSubmit, formState } = useForm();

  const login = async ({ email, password }) => {
    var AmplifySetup = false;

    if (AmplifySetup) {
      try {
        const user = await Auth.signIn(email, password);
      } catch (error) {
        console.log("error signing in", error);
      }
    }
    console.log(`User email: ${email}, password: ${password}`);
  };

  return (
    <Container>
      <SignInContainer>
        <StyledImg src={Logo}></StyledImg>
        <GridForm onSubmit={handleSubmit(login)}>
          <InputLabel shrink>EMAIL ADDRESS</InputLabel>
          <Controller name="email" defaultValue="" control={control} render={({ field }) => <TextField {...field} type="email" required />} />

          <InputLabel shrink>PASSWORD</InputLabel>
          <Controller name="password" defaultValue="" control={control} required render={({ field }) => <TextField {...field} type="password" required />} />
          <StyledButton type="submit" disableElevation variant="contained">
            Log in
          </StyledButton>
          <StyledLink to="/signup" decoration="underline">
            Don't have an account?
          </StyledLink>
          <StyledLink to="/" decoration="underline">
            Forgot password
          </StyledLink>
        </GridForm>
      </SignInContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
`;

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100%;
  max-width: 350px;
  margin: 1em;
  padding: 1em;
  gap: 1em;
`;

const StyledImg = styled.img`
  width: 65%;
  align-self: center;
  margin: 5% 0;
`;

const GridForm = styled.form`
  display: grid;
  gap: 1em;
`;

export default SignIn;
