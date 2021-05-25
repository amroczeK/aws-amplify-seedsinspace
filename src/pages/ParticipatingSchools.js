import React from "react";

import Weather from "../components/Weather";

import styled from "styled-components";

const ParticipatingSchools = () => {
  return (
    <Container>
      <ParticipatingSchoolsContainer>
        <Weather />
      </ParticipatingSchoolsContainer>
    </Container>
  );
};

export default ParticipatingSchools;

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
