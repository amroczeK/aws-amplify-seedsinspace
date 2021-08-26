import React, { useState, useEffect } from "react";
import StepperContent from "../components/ParticipatingSchools/StepperContent";
import Container from "@material-ui/core/Container";
import { getAllSchools } from "../apis";

const ParticipatingSchools = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    getAllSchools().then(res => setSchools(res));
    // eslint-disable-next-line
  }, []);

  return (
    <Container style={{ paddingTop: "1em" }} maxWidth="xl">
      <StepperContent schools={schools} />
    </Container>
  );
};

export default ParticipatingSchools;
