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
import { updateSchool } from "../apis";
import Alert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";
import { Flexbox } from "../components/styled-components/Flexbox";

const ProfileDetails = () => {
  const history = useHistory();
  const locationState = history.location.state;
  const [setUpError, setSetUpError] = useState(null);
  const [showSnack, setShowSnack] = useState(false);
  const [profileImage, setProfileImage] = useState();
  const { updateCognitoUser, cognitoUser, fetchS3, uploadImage } = useAws();

  useEffect(() => {
    fetchS3({ path: `profile/profile_picture`, level: "protected" }).then(url => {
      setProfileImage(url);
    });
  }, [fetchS3, cognitoUser]);

  const { control, register, setValue, handleSubmit } = useForm({
    defaultValues: {
      about: cognitoUser.attributes["custom:about"],
      address: cognitoUser.attributes["address"],
      location: cognitoUser.attributes["custom:location"],
    },
  });

  const onLocationSelection = locationValue => {
    const { lat, lon, display_name } = locationValue;
    setValue("address", display_name);
    setValue("location", JSON.stringify({ lat, lon }));
  };

  const confirmProfileHandler = async formData => {
    try {
      // Upload profile image with reference to sub id
      if (formData.profileImage) {
        await uploadImage({
          file: formData["profileImage"][0],
          path: "profile/",
          filename: `profile_picture`,
          level: "protected",
        });
      }

      await updateCognitoUser(formData);

      // update database entry
      await updateSchool(
        {
          SchoolName: cognitoUser.attributes["custom:organisation"],
          Address: formData.address,
          Lat: JSON.parse(formData.location).lat,
          Lon: JSON.parse(formData.location).lon,
        },
        cognitoUser?.username
      );

      if (locationState?.isNewUser) history.push("/dashboard");
      else setShowSnack(true);
    } catch (error) {
      console.log(JSON.stringify(error));
      setSetUpError(error);
    }
  };

  return (
    <Container>
      <Flexbox direction="column" alignItems="center">
        <GridForm onSubmit={handleSubmit(confirmProfileHandler)}>
          <Typography style={{ fontWeight: "bold" }} variant="h5">
            {locationState?.isNewUser ? "Fill in your profile" : "Edit your profile"}
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
          {setUpError && <Alert severity="error">{setUpError.message}</Alert>}
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
              <StyledLink to="/dashboard" alignself="center">
                Skip for now
              </StyledLink>
            </>
          )}
          {!locationState?.isNewUser && (
            <>
              <StyledButton
                color="primary"
                type="submit"
                disableElevation
                variant="contained"
              >
                Save
              </StyledButton>
              <StyledLink
                to="/profile"
                alignself="center"
                style={{ textAlign: "center" }}
              >
                Cancel
              </StyledLink>
            </>
          )}
        </GridForm>
        <SuccessSnackbar
          openSnack={showSnack}
          setOpenSnack={setShowSnack}
          text="Success! Profile updated"
        />
      </Flexbox>
    </Container>
  );
};

export default ProfileDetails;

const GridForm = styled.form`
  display: grid;
  gap: 1em;
  margin: 1em 0;
`;
