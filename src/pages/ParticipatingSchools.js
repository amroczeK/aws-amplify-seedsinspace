import React, { useState, useEffect } from "react";
import Weather from "../components/Weather";
import styled from "styled-components";
import LeafletMap from "../components/map/LeafletMap";
import Link from "@material-ui/core/Link";
import { useAws } from "../context/AWSContext";
import { getAllSchools } from "../apis";
import { Typography } from "@material-ui/core";

const ParticipatingSchools = () => {
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    getAllSchools().then(res => {
      setSchools(JSON.parse(res.body));
    });
  }, []);

  const handleSchoolClick = index => {
    setSelectedSchool(schools[index]);
    setStep(1);
  };

  const stepContent = () => {
    return {
      0: <LeafletMap mapData={schools} handlePopupClick={handleSchoolClick} />,
      1: <SchoolProfile school={selectedSchool} setStep={setStep} />,
    }[step];
  };

  return (
    <Container>
      <ParticipatingSchoolsContainer>
        <Weather />
        {stepContent()}
      </ParticipatingSchoolsContainer>
    </Container>
  );
};

export default ParticipatingSchools;

const SchoolProfile = ({ school, setStep }) => {
  const { fetchS3 } = useAws();
  const [profileImage, setProfileImage] = useState();

  const getProfile = () => {
    const subId = school.Sk ? school.Sk.replace("SCHOOL#", "") : "";

    fetchS3({ path: `${subId}_profile`, level: "public" }).then(url => {
      setProfileImage(url);
    });
  };

  useEffect(() => {
    getProfile();
  }, [school]);

  return (
    <Container>
      <ProfileContainer>
        <StyledLink
          underline="none"
          component="button"
          variant="body2"
          onClick={() => setStep(0)}
        >
          {String.fromCharCode(8592)} Back to map
        </StyledLink>
        <Profile>
          <Image src={profileImage}></Image>
          <div>
            <Typography>{school.SchoolName}</Typography>
            <Typography variant="subtitle2">
              {school.Address.split(",")[2]}, {school.Address.split(",")[5]}
            </Typography>
          </div>
        </Profile>
      </ProfileContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
`;

const ParticipatingSchoolsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100%;
  max-width: 350px;
  margin: 1em;
  padding: 1em;
  gap: 1em;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0;
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
