import { useState, useEffect } from "react";
import { useAws } from "../context/AWSContext";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { StyledButton } from "../components/styled-components/Buttons";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const [profileImage, setProfileImage] = useState();
  const { cognitoUser, fetchS3 } = useAws();

  useEffect(() => {
    const { username } = cognitoUser;
    const path = `profile/profile_picture`;
    const level = "protected";
    if (username) {
      fetchS3({ path, level }).then(url => setProfileImage(url));
    }
  }, [fetchS3, cognitoUser]);

  return (
    <StyledContaienr>
      <ProfileContainer>
        <Image src={profileImage} alt="profile" />
        <ProfileButtons
          onClick={() => history.push("/profile-details")}
          width="100%"
          color="primary"
          variant="contained"
          style={{ wordWrap: "break-word" }}
        >
          Edit Profile
        </ProfileButtons>
        <ProfileButtons
          onClick={() => history.push("/change-password")}
          width="100%"
          color="primary"
          variant="contained"
          style={{ wordWrap: "break-word" }}
        >
          Change Password
        </ProfileButtons>
      </ProfileContainer>
      <ContentContainer>
        <Typography style={{ wordWrap: "break-word" }} variant="h5">
          {cognitoUser.attributes["custom:organisation"]}
        </Typography>
        <Typography style={{ wordWrap: "break-word" }} variant="subtitle1" gutterBottom>
          {cognitoUser.attributes["address"]}
        </Typography>
        <p>
          {cognitoUser.attributes["custom:about"]}
        </p>
      </ContentContainer>
    </StyledContaienr>
  );
};

export default Profile;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1rem;
  gap: 0.5rem;
  padding: 1rem;
  min-width: 150px;
  p {
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
`;

const Image = styled.img`
  min-width: 125px;
  min-height: 125px;
  max-width: 200px;
  max-height: 200px;
  padding: 10px;
  object-fit: cover;
  border: 1px solid lightgrey;
  border-radius: 5px;
  @media (max-width: 460px) {
    align-self: center;
    justify-content: center;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledContaienr = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem;
  margin-top: 2rem;
  @media (max-width: 460px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const ProfileButtons = styled(StyledButton)`
  @media (max-width: 460px) {
    align-self: center;
    justify-content: center;
    max-width: 200px;
    max-height: 200px;
  }
`;
