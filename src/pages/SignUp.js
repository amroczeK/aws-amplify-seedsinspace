import React, { useState, useContext } from "react";
import styled from "styled-components";
import { StyledButton } from "../components/styled-components/Buttons";
import { StyledLink } from "../components/styled-components/Links";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import { Controller, useForm } from "react-hook-form";
import { UserContext } from "../components/context/User";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../components/validation/schemas";
import Typography from "@material-ui/core/Typography";
import { StyledInputLabel } from "../components/styled-components/InputLabel";
import ImageUpload from "../components/ImageUpload";

const SignUp = () => {
  const [step, setStep] = useState(2);
  const [error, setError] = useState(null);
  const { control, register, setValue, handleSubmit, formState } = useForm({
    resolver: yupResolver(signUpSchema),
  });
  const { errors } = formState;

  const { signUp, confirmSignUp } = useContext(UserContext);

  const signUpHandler = async formData => {
    try {
      await signUp(formData);
      setStep(1);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const confirmSignUpHandler = async formData => {
    try {
      await confirmSignUp(formData);
      setStep(2);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const stepContent = () => {
    return {
      0: <CreateAnAccount />,
      1: <ConfirmSignUp />,
      2: <FillInYourProfile />,
    }[step];
  };

  const CreateAnAccount = () => {
    return (
      <SignUpContainer>
        <GridForm onSubmit={handleSubmit(signUpHandler)}>
          <Typography style={{ fontWeight: "bold" }} variant="h5">
            Create an account
          </Typography>
          <StyledInputLabel shrink>SCHOOL/ORGANISATION NAME</StyledInputLabel>
          <Controller
            name="organisation"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                error={errors?.organisation}
                helperText={errors?.organisation?.message}
              />
            )}
          />
          <StyledInputLabel shrink>SCHOOL/ORGANISATION ADDRESS</StyledInputLabel>
          <Controller
            name="address"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                error={errors?.address}
                helperText={errors?.address?.message}
              />
            )}
          />
          <StyledInputLabel shrink>EMAIL ADDRESS</StyledInputLabel>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                error={errors?.email}
                helperText={errors?.email?.message}
              />
            )}
          />
          <StyledInputLabel shrink>PASSWORD</StyledInputLabel>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                variant="outlined"
                error={errors?.password}
                helperText={errors?.password?.message}
              />
            )}
          />
          <StyledInputLabel shrink>CONFIRM PASSWORD</StyledInputLabel>
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                variant="outlined"
                error={errors?.confirmPassword}
                helperText={errors?.confirmPassword?.message}
              />
            )}
          />
          <StyledLink to="/">SIS disclaimer / terms and conditions</StyledLink>
          <StyledButton
            color="primary"
            disableElevation
            variant="contained"
            type="submit"
          >
            Create account
          </StyledButton>
        </GridForm>
      </SignUpContainer>
    );
  };

  const ConfirmSignUp = () => {
    return (
      <SignUpContainer>
        <GridForm onSubmit={handleSubmit(confirmSignUpHandler)}>
          <StyledInputLabel shrink>EMAIL ADDRESS</StyledInputLabel>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} type="email" required variant="outlined" />
            )}
          />
          <StyledInputLabel shrink>CONFIRMATION CODE</StyledInputLabel>
          <Controller
            name="authCode"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} required variant="outlined" />}
          />
          {error && <Alert severity="error">{error.message}</Alert>}
          <StyledButton
            color="primary"
            disableElevation
            variant="contained"
            type="submit"
          >
            Create account
          </StyledButton>
        </GridForm>
      </SignUpContainer>
    );
  };

  const FillInYourProfile = () => {
    return (
      <SignUpContainer>
        <Typography style={{ fontWeight: "bold" }} variant="h5">
          Fill in your profile
        </Typography>
        <ImageUpload
          register={register}
          setValue={setValue}
          name="profile-image"
          path="protected/"
          level="protected"
          setError={setError}
        />
        <StyledInputLabel shrink>LOCATION</StyledInputLabel>
        <Controller
          name="location"
          defaultValue=""
          control={control}
          render={({ field }) => <TextField {...field} variant="outlined" />}
        />

        <StyledInputLabel shrink>TELL US ABOUT YOURSELF</StyledInputLabel>
        <Controller
          name="about"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField {...field} multiline variant="outlined" rows={10} />
          )}
        />
        <StyledButton
          color="primary"
          disableElevation
          variant="contained"
          onClick={() => setStep(2)}
        >
          Next
        </StyledButton>
        <StyledLink to="/seed-setup" alignself="center">
          Skip for now
        </StyledLink>
      </SignUpContainer>
    );
  };

  return <Container>{stepContent()}</Container>;
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

const GridForm = styled.form`
  display: grid;
  gap: 1em;
`;
