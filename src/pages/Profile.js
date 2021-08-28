import { useState, useEffect } from "react";
import { useAws } from "../context/AWSContext";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { StyledButton } from "../components/styled-components/Buttons";
import { Flexbox } from "../components/styled-components/Flexbox";
import Container from "@material-ui/core/Container";
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
    <Container maxWidth="md">
      <Flexbox direction="column">
        <ProfileContainer wrap="wrap" gap="2em" grow="0" justify="center">
          <Image src={profileImage} alt="profile"></Image>
          <div>
            <Typography>{cognitoUser.attributes["custom:organisation"]}</Typography>
            <Typography variant="subtitle2" gutterBottom>
              {cognitoUser.attributes["address"]}
            </Typography>
          </div>
        </ProfileContainer>
        <Typography style={{ textAlign: "justify" }}>
          {cognitoUser.attributes["custom:about"]}
        </Typography>
        <Flexbox
          margin="3em 0 0 0"
          grow="0"
          wrap="wrap"
          alignSelf="center"
          justify="center"
        >
          <StyledButton
            onClick={() => history.push("/profile-details")}
            width="300px"
            color="primary"
            variant="contained"
          >
            Edit Profile
          </StyledButton>
          <StyledButton
            onClick={() => history.push("/change-password")}
            width="300px"
            color="primary"
            variant="contained"
          >
            Change Password
          </StyledButton>
        </Flexbox>
      </Flexbox>
    </Container>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  display: flex;
  gap: 1em;
  padding: 1em 0;
  align-items: center;
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
`;
