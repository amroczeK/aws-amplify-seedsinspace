import { useState, useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { signInResolver } from "../components/validation/schemas";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import styled from "styled-components";
import { StyledLink } from "../components/styled-components/Links";
import { StyledButton } from "../components/styled-components/Buttons";
import { StyledInputLabel } from "../components/styled-components/InputLabel";
import Logo from "../assets/logo.png";
import { UserContext } from "../components/context/User";

const SignIn = () => {
  const [error, setError] = useState(null);
  const { signIn } = useContext(UserContext);
  const { control, handleSubmit, formState } = useForm({
    resolver: signInResolver,
  });
  const { errors } = formState;

  const signInHandler = async ({ email, password }) => {
    signIn({ email, password })
      .then(() => setError(null))
      .catch(error => {
        console.error(error);
        setError(error);
      });
  };

  return (
    <Container>
      <SignInContainer>
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
                error={errors?.email}
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
                error={errors?.password}
                helperText={errors?.password?.message}
              />
            )}
          />
          {error && <Alert severity="error">{error.message}</Alert>}
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
