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
    signIn({ email, password })
      .then(() => setSignInError(null))
      .catch(error => setSignInError(error));
  };

  return (
    <Container>
      <SignInContainer>
        <StyledImg src={Logo}></StyledImg>
        {loading && <LinearProgress />}
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
          {signInError && <Alert severity="error">{signInError.message}</Alert>}
          <StyledButton
            color="primary"
            type="submit"
            disableElevation
            variant="contained"
          >
            Login
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
  min-width: 300px;
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
