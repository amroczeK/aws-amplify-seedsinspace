import { Controller, useForm } from "react-hook-form";
import { signUpResolver } from "../components/validation/schemas";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { StyledButton } from "../components/styled-components/Buttons";
import { StyledLink } from "../components/styled-components/Links";
import { StyledInputLabel } from "../components/styled-components/InputLabel";
import { useAws } from "../context/AWSContext";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const { createNewPassword } = useAws();
  const history = useHistory();

  const { control, handleSubmit, formState } = useForm({
    resolver: signUpResolver,
    defaultValues: { ...history.location.state },
  });

  const { errors } = formState;

  const signUpHandler = async formData => {
    createNewPassword(formData)
      .then(_user => history.push("/profile", { isNewUser: true }))
      .catch(console.error);
  };
  return (
    <Container>
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
          <StyledInputLabel shrink>EMAIL ADDRESS</StyledInputLabel>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                error={errors?.email}
                helperText={errors?.email?.message}
              />
            )}
          />
          <StyledInputLabel shrink>NEW PASSWORD</StyledInputLabel>
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
          <StyledInputLabel shrink>CONFIRM NEW PASSWORD</StyledInputLabel>
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
    </Container>
  );
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
