import React, { useState, useEffect } from "react";
import Weather from "../components/Weather";
import styled from "styled-components";
import LeafletMap from "../components/map/LeafletMap";
import Link from "@material-ui/core/Link";

// import { getAllSchools } from "../apis";

const tempData = [
  {
    name: "Narrabundah College",
    address:
      "Narrabundah College, Jerrabomberra Avenue, Narrabundah, Canberra, District of Canberra Central, Australian Capital Territory, 2604, Australia",
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
    // Note: Temp solution - delete after API works
    setSchools(tempData);

    // getAllSchools().then(res => {

    //   // setSchools(res);
    // });
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

  // return null;
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
      <StyledLink
        underline="none"
        component="button"
        variant="body2"
        onClick={() => setStep(0)}
      >
        {String.fromCharCode(8592)} Back to map
      </StyledLink>
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

const StyledLink = styled(Link)`
  align-self: flex-start;
  text-decoration: none;
`;
