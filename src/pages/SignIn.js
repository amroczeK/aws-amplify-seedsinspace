import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import styled from "styled-components";
import { StyledLink } from "../components/styled-components/Links";
import { StyledButton } from "../components/styled-components/Buttons";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Alert from "@material-ui/lab/Alert";
import Logo from "../assets/logo.png";
import { Controller, useForm } from "react-hook-form";

const SignIn = () => {
  const [error, setError] = useState(null);
  const { control, handleSubmit } = useForm();

  const login = async ({ email, password }) => {
    var AmplifySetup = true;

    if (AmplifySetup) {
      try {
        const user = await Auth.signIn(email, password);
        setError(null); // Always clear potential previous errors on successful signin
        console.log(user);
        window.location.replace("/");
      } catch (error) {
        console.log("error signing in", error);
        setError(error);
      }
    }
    console.log(`User email: ${email}, password: ${password}`);
  };

  useEffect(() => {
    if (error) console.log(error);
  }, [error]);

  return (
    <Container>
      <SignInContainer>
        <StyledImg src={Logo}></StyledImg>
        <GridForm onSubmit={handleSubmit(login)}>
          <InputLabel shrink>EMAIL ADDRESS</InputLabel>
          <Controller
            name="email"
            defaultValue=""
            control={control}
            render={({ field }) => <TextField {...field} type="email" required />}
          />

          <InputLabel shrink>PASSWORD</InputLabel>
          <Controller
            name="password"
            defaultValue=""
            control={control}
            required
            render={({ field }) => <TextField {...field} type="password" required />}
          />
          {error && <Alert severity="error">{error.message}</Alert>}
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
