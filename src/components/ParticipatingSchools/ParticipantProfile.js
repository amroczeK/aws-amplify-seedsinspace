import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "@material-ui/core/Link";
import { useAws } from "../../context/AWSContext";
import { Typography } from "@material-ui/core";
import SchoolData from "./SchoolData";

const ParticipantProfile = ({ school, setStep }) => {
  const { fetchS3 } = useAws();
  const [schoolSubId, setSchoolSubId] = useState(null);
  const [profileImage, setProfileImage] = useState();

  useEffect(() => {
    const subId = school?.Sk?.replace("SCHOOL#", "");
    const { identityId } = school;
    setSchoolSubId(subId);
    fetchS3({
      path: `profile/profile_picture`,
      level: "protected",
      identityId,
    })
      .then(url => setProfileImage(url))
      .catch(error => console.log(error));
  }, [school, fetchS3]);

  return (
    <Container>
      <StyledLink
        underline="none"
        component="button"
        variant="body2"
        onClick={() => setStep(0)}
      >
        {String.fromCharCode(8592)} Back to map
      </StyledLink>
      <Profile>
        <Image src={profileImage} alt="profile"></Image>
        <div>
          <Typography>{school?.SchoolName}</Typography>
          <Typography variant="subtitle2">
            {school?.Address?.split(", ")[1]}, {school?.Address?.split(", ")[2]}
          </Typography>
        </div>
      </Profile>
      {schoolSubId && <SchoolData schoolSub={schoolSubId} />}
    </Container>
  );
};

export default ParticipantProfile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0;
  min-width: 300px;
  margin: 1em;
  gap: 2em;
`;

const Profile = styled.div`
  display: flex;
  gap: 1em;
  align-items: center;
`;

const StyledLink = styled(Link)`
  align-self: flex-start;
  text-decoration: none;
`;

const Image = styled.img`
  width: 125px;
  height: 125px;
  padding: 10px;
  object-fit: cover;
  border: 1px solid lightgrey;
  border-radius: 5px;
`;
