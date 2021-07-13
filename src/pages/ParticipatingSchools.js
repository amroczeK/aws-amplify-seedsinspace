import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllSchools } from "../apis";
import StepperContent from "../components/ParticipatingSchools/StepperContent";
import Container from "@material-ui/core/Container";

const ParticipatingSchools = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    if (!schools.length) {
      getAllSchools().then(res => setSchools(res));
    }
  }, []);

  return (
    <Container maxWidth="xl">
      <ContentContainer>
        <StepperContent schools={schools} />
      </ContentContainer>
    </Container>
  );
};

export default ParticipatingSchools;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0;
  min-width: 300px;
  gap: 2em;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
`;
