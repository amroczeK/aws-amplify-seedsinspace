import React, { useState, useEffect } from "react";
import StepperContent from "../components/ParticipatingSchools/StepperContent";
import Container from "@material-ui/core/Container";
import { getAllSchools } from "../apis";

const ParticipatingSchools = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    if (!schools.length) {
      getAllSchools().then(res => setSchools(res));
    }
  }, [schools]);

  return (
    <Container style={{ paddingTop: "2em" }} maxWidth="xl">
      <StepperContent schools={schools} />
    </Container>
  );
};

export default ParticipatingSchools;
