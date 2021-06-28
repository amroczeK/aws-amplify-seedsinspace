import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useAws } from "../context/AWSContext";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ImageUpload from "../components/ImageUpload";
import { SuccessSnackbar } from "../components/Snackbars";
import styled from "styled-components";
import { StyledInputLabel } from "../components/styled-components/InputLabel";
import { StyledButton } from "../components/styled-components/Buttons";
import { StyledLink } from "../components/styled-components/Links";
import LocationSearch from "../components/map/LocationSearch";

const Profile = () => {
  const history = useHistory();
  const locationState = history.location.state;
  const [showSnack, setShowSnack] = useState(false);
  const [profileImage, setProfileImage] = useState();
  const { updateUserProfileDetails, cognitoUser, fetchS3, uploadImage } = useAws();

  useEffect(() => {
    fetchS3({ path: "profile", level: "protected" }).then(url => {
      setProfileImage(url);
    });
  }, [fetchS3]);

  const { control, register, setValue, handleSubmit } = useForm({
    defaultValues: {
      about: cognitoUser.attributes["custom:about"],
      address: cognitoUser.attributes["address"],
      location: cognitoUser.attributes["custom:location"],
    },
  });

  const onLocationSelection = locationValue => {
    const { display_name, lat, lon } = locationValue;

    console.log(locationValue);

    setValue("address", display_name);
    setValue("location", JSON.stringify({ lat, lon }));
  };

  const confirmProfileHandler = async formData => {
    try {
      if (formData.profileImage) {
        await uploadImage({
          file: formData["profileImage"][0],
          path: "protected/",
          newName: "profile",
          level: "protected",
        });
      }

      await updateUserProfileDetails(formData);
      if (locationState?.isNewUser) {
        history.push("/seed-setup");
      } else {
        setShowSnack(true);
      }
    } catch (error) {
      console.log(error);
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
            name="profileImage"
            image={profileImage}
            register={register}
            setValue={setValue}
          />
          <StyledInputLabel shrink>LOCATION</StyledInputLabel>
          <LocationSearch
            onSelected={onLocationSelection}
            defaultValue={cognitoUser?.attributes?.address}
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
          {locationState?.isNewUser && (
            <>
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
            </>
          )}
          {!locationState?.isNewUser && (
            <StyledButton
              color="primary"
              type="submit"
              disableElevation
              variant="contained"
            >
              Save
            </StyledButton>
          )}
        </GridForm>
      </SignUpContainer>
      <SuccessSnackbar open={showSnack} onClose={() => setShowSnack(false)} />
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
