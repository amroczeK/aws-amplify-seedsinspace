import React, { useState, useEffect } from "react";
import Weather from "../components/Weather";
import styled from "styled-components";
import { getAllSchools } from "../apis";
import StepperContent from "../components/ParticipatingSchools/StepperContent";

const ParticipatingSchools = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    getAllSchools().then(res => setSchools(res));
  }, []);

  return (
    <Container>
      <Weather />
      <StepperContent schools={schools} />
    </Container>
  );
};

export default ParticipatingSchools;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0;
  min-width: 300px;
  margin: 1em;
  gap: 2em;
`;
