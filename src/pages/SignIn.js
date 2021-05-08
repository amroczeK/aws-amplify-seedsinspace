import React, { useState } from "react";
import Amplify from "aws-amplify";
import { Auth } from "aws-amplify";

// Material UI Imports
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Styled Components
import styled from "styled-components";

// Custom Components
import { Header } from "../components/Nav";
import Logo from "../assets/logo.png";

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

const StyledTextField = styled(TextField)`
  font-weight: bold;
  flex: 1 0;
`;

const StyledButton = styled(Button)`
  background: ${({ theme }) => theme.secondaryLight};
  color: ${({ theme }) => theme.primaryLight};
  padding: 1em 0;
  text-transform: none;
`;

const StyledImg = styled.img`
  width: 65%;
  align-self: center;
  margin: 5% 0;
`;

const StyledLink = styled.a`
  color: ${({ theme }) => theme.primaryBackground};
  font-size: 0.75em;
`;

const SignIn = () => {
  async function signIn() {
    var username;
    var password;
    try {
      const user = await Auth.signIn(username, password);
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  return (
    <Container>
      <Header />
      <SignInContainer>
        <StyledImg src={Logo}></StyledImg>
        <StyledTextField
          name="email"
          label="EMAIL ADDRESS"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue=""
        />
        <StyledTextField
          name="password"
          label="PASSWORD"
          type="password"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue=""
        />
        <StyledButton disableElevation variant="contained">
          Log in
        </StyledButton>
        <StyledLink href="/">Don't have an account?</StyledLink>
        <StyledLink href="/">Forgot password</StyledLink>
      </SignInContainer>
    </Container>
  );
};

export default SignIn;
