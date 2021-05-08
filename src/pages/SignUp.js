import React, { useState } from "react";
import Amplify from "aws-amplify";
import { Auth } from "aws-amplify";

// Material UI Imports
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

// Styled Components
import styled from "styled-components";

// Styled Icons
import { Camera } from "@styled-icons/bootstrap/Camera";

// Custom Components
import { Header } from "../components/Nav";

const Container = styled.div`
  display: flex;
  flex-direction: column;
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

const StyledTextField = styled(TextField)`
  font-weight: bold;
  flex: 1 0;
`;

const StyledTypography = styled(Typography)`
  font-weight: bold;
  color: ${({ theme }) => theme.primaryDark};
`;

const StyledButton = styled(Button)`
  background: ${({ theme }) => theme.secondaryLight};
  color: ${({ theme }) => theme.primaryLight};
  padding: 1em 0;
  width: 100%;
  text-transform: none;
`;

const StyledLink = styled.a`
  color: ${({ theme }) => theme.primaryBackground};
  font-size: 0.75em;
`;

const StyledSelectLink = styled.a`
  color: ${({ theme }) => theme.primaryBackground};
  align-self: center;
  font-size: 0.75em;
  padding: 0 0 0 2em;
  text-decoration: none !important;
`;

const StyledNavLink = styled.a`
  color: ${({ theme }) => theme.primaryBackground};
  align-self: center;
  font-size: 0.75em;
`;

const CameraIcon = styled(Camera)`
  width: 2em;
  height: 2em;
  color: black;
  margin: 1em 0;
`;

const SignUp = () => {
  const [step, setStep] = useState(0);

  async function signUp() {
    var username;
    var password;
    try {
      const user = await Auth.signIn(username, password);
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  const Stepper = () => {
    return {
      0: <CreateAnAccount />,
      1: <FillInYourProfile />,
    }[step];
  };

  const CreateAnAccount = () => {
    return (
      <SignUpContainer>
        <StyledTypography variant="h5">Create an account</StyledTypography>
        <InputLabel shrink>SCHOOL/ORGANISATION'S NAME</InputLabel>
        <StyledTextField
          name="organisation"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue=""
        />
        <InputLabel shrink>EMAIL ADDRESS</InputLabel>
        <StyledTextField
          name="email"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue=""
        />
        <InputLabel shrink>NEW PASSWORD</InputLabel>
        <StyledTextField
          name="password"
          variant="outlined"
          type="password"
          defaultValue=""
        />
        <StyledLink href="/">SIS disclaimer / terms and conditions</StyledLink>
        <StyledButton
          disableElevation
          variant="contained"
          onClick={() => setStep(1)}
        >
          Create account
        </StyledButton>
      </SignUpContainer>
    );
  };

  const FillInYourProfile = () => {
    return (
      <SignUpContainer>
        <StyledTypography variant="h5">Fill in your profile</StyledTypography>
        <span>
          <CameraIcon />
          <StyledSelectLink href="/">+ Add your logo</StyledSelectLink>
        </span>
        <InputLabel shrink>LOCATION</InputLabel>
        <StyledTextField
          name="location"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue=""
        />
        <InputLabel shrink>TELL US ABOUT YOURSELF</InputLabel>
        <StyledTextField
          name="about"
          variant="outlined"
          defaultValue=""
          multiline
          rows={10}
        />
        <StyledButton
          disableElevation
          variant="contained"
          onClick={() => setStep(2)}
        >
          Next
        </StyledButton>
        <StyledNavLink href="/">Skip for now</StyledNavLink>
      </SignUpContainer>
    );
  };

  return (
    <Container>
      <Header />
      <Stepper />
    </Container>
  );
};

export default SignUp;
