import React, { useState, useEffect } from "react";
import Weather from "../components/Weather";
import styled from "styled-components";
import LeafletMap from "../components/map/LeafletMap";
import { getAllSchools } from "../apis";
import { StyledLink } from "../components/styled-components/Links";
import Link from "@material-ui/core/Link";

const tempData = [
  {
    name: "Narrabundah College",
    lat: "-35.33687195",
    lon: "149.14736472974613",
    profileLink: "",
  },
  {
    name: "Figtree High School",
    lat: "-34.438533750000005",
    lon: "150.85507266152396",
    profileLink: "",
  },
  {
    name: "",
    lat: "",
    lon: "",
    profileLink: "",
  },
];

const ParticipatingSchools = () => {
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    getAllSchools().then(res => {
      // Note: Temp solution - delete after API works
      setSchools(tempData);

      // setSchools(res);
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
  return (
    <Container>
      <Link component="button" variant="body2" onClick={() => setStep(0)}>
        Back to map
      </Link>
      <ParticipatingSchoolsContainer>{school.name}</ParticipatingSchoolsContainer>
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
