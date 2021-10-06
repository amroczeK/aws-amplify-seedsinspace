import React, { useState, useEffect } from "react";
import StepperContent from "../components/ParticipatingSchools/StepperContent";
import Container from "@material-ui/core/Container";
import { getAllSchools } from "../apis";

const ParticipatingSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true)
    getAllSchools().then(res => {
      setLoading(false)
      setSchools(res);
    }).catch(error => setError(error));
    // eslint-disable-next-line
  }, []);

  return (
    <Container style={{ paddingTop: "1em", paddingBottom: "2rem" }} maxWidth="lg">
      <StepperContent schools={schools} loading={loading} error={error} />
    </Container>
  );
};

export default ParticipatingSchools;
