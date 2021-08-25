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
      <h1>Our community</h1>
      <p>
        We have over 250 participating groups from all around Australia, including primary
        schools, high schools and scout groups.
      </p>
      <p>
        Zoom in to the map to take a look at the participating groups and their seed data.
      </p>
      <StepperContent schools={schools} />
    </Container>
  );
};

export default ParticipatingSchools;
