import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import ImageUpload from "../components/ImageUpload";
import { StyledInputLabel } from "../components/styled-components/InputLabel";
import TextField from "@material-ui/core/TextField";
import { Controller, useForm } from "react-hook-form";
import { StyledButton } from "../components/styled-components/Buttons";
import Typography from "@material-ui/core/Typography";
import { StyledLink } from "../components/styled-components/Links";
import { S3BucketContext } from "../components/context/S3Bucket";
import { UserContext } from "../components/context/User";

const Profile = () => {
  const [error, setError] = useState(null);
  const { control, register, setValue, handleSubmit, formState } = useForm();

  const { uploadImage } = useContext(S3BucketContext);
  const { updateUserProfileDetails } = useContext(UserContext);

  const confirmProfileHandler = async formData => {
    console.log(formData);
    try {
      await uploadImage({
        file: formData["profile-image"][0],
        path: "protected/",
        newName: "profile",
        level: "protected",
      });

      await updateUserProfileDetails(formData);
    } catch (error) {
      console.log(error);
      //setError(error)
    }
  };

  return (
    <Container>
      <SignUpContainer>
        <GridForm onSubmit={handleSubmit(confirmProfileHandler)}>
          <Typography style={{ fontWeight: "bold" }} variant="h5">
            Fill in your profile
          </Typography>
          <ImageUpload
            register={register}
            setValue={setValue}
            name="profile-image"
            setError={setError}
          />
          <StyledInputLabel shrink>LOCATION</StyledInputLabel>
          <Controller
            name="address"
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
            type="submit"
            disableElevation
            variant="contained"
          >
            Next
          </StyledButton>
          <StyledLink to="/seed-setup" alignself="center">
            Skip for now
          </StyledLink>
        </GridForm>
      </SignUpContainer>
    </Container>
  );
};

export default Profile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 300px;
`;

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
