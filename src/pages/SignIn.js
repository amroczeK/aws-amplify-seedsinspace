import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
import { addSchool } from "../apis";

const SignIn = () => {
  const history = useHistory();

  const [previousRoute, setPreviousRoute] = useState(null);
  const [signInError, setSignInError] = useState(null);

  const { signIn, loading, cognitoUser } = useAws();

  const { control, handleSubmit, formState } = useForm({
    resolver: signInResolver,
  });
  const { errors } = formState;

  useEffect(() => {
    let prevRoute = history?.location?.state?.referrer;
    if (prevRoute) setPreviousRoute(prevRoute);
    if (cognitoUser && prevRoute) {
      history.push(prevRoute);
    }
  }, [cognitoUser, previousRoute, history]);

  const signInHandler = async ({ email, password }) => {
    setSignInError(false); // Always reset error
    try {
      let user = await signIn({ email, password });

      setSignInError(null);
      // Don't change the order of this challenge, keep it at the top
      if (user?.challengeName === "NEW_PASSWORD_REQUIRED") {
        return history.push("/signup", { email });
      }
      if (!user?.attributes["custom:organisation"]) {
        // Add school to DynamoDB otherwise public profile won't be updated
        await addSchool()
        return history.push("/profile/edit", { isNewUser: true });
      }
      if (previousRoute) {
        return history.push(previousRoute);
      }
      // If no previous route go to home
      return history.push("/");
    } catch (error) {
      setSignInError(error)
    }
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
          render={({ field }) => <TextField {...field} error={errors?.email ? true : false} helperText={errors?.email?.message} />}
        />

        <StyledInputLabel shrink>PASSWORD</StyledInputLabel>
        <Controller
          name="password"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField {...field} type="password" error={errors?.password ? true : false} helperText={errors?.password?.message} />
          )}
        />
        {loading && <LinearProgress />}
        {signInError && <Alert severity="error">{signInError.message}</Alert>}
        <StyledButton color="primary" type="submit" disableElevation disabled={loading} variant="contained">
          Login
        </StyledButton>
        <StyledLink to="/forgot-password" decoration="underline">
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
