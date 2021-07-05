import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { signInResolver } from "../components/validation/schemas";
import styled from "styled-components";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";
import { StyledLink } from "../components/styled-components/Links";
import { StyledButton } from "../components/styled-components/Buttons";
import { StyledInputLabel } from "../components/styled-components/InputLabel";
import Logo from "../assets/logo.png";
import { useAws } from "../context/AWSContext";

const SignIn = () => {
  const [signInError, setSignInError] = useState(null);
  const { signIn, loading } = useAws();

  const { control, handleSubmit, formState } = useForm({
    resolver: signInResolver,
  });
  const { errors } = formState;

  const signInHandler = async ({ email, password }) => {
    setSignInError(false); // Always clear previous error when trying to login again
    signIn({ email, password })
      .then(() => setSignInError(null))
      .catch(error => {
        console.log("here", error);
        setSignInError(error);
      });
  };

  return (
    <Container>
      <StyledImg src={Logo}></StyledImg>
      <GridForm onSubmit={handleSubmit(signInHandler)}>
        <StyledInputLabel shrink>EMAIL ADDRESS</StyledInputLabel>
        <Controller
          name="email"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={errors?.email ? true : false}
              helperText={errors?.email?.message}
            />
          )}
        />

        <StyledInputLabel shrink>PASSWORD</StyledInputLabel>
        <Controller
          name="password"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="password"
              error={errors?.password ? true : false}
              helperText={errors?.password?.message}
            />
          )}
        />
        {loading && <LinearProgress />}
        {signInError && <Alert severity="error">{signInError.message}</Alert>}
        <StyledButton color="primary" type="submit" disableElevation variant="contained">
          Login
        </StyledButton>
        <StyledLink to="/signup" decoration="underline">
          Don't have an account?
        </StyledLink>
        <StyledLink to="/" decoration="underline">
          Forgot password
        </StyledLink>
      </GridForm>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
`;

const StyledImg = styled.img`
  width: 300px;
  height: auto;
  align-self: center;
  margin: 2em 0;
`;

const GridForm = styled.form`
  display: grid;
  gap: 1em;
  min-width: 350px;
  margin: 1em 0;
`;

export default SignIn;
