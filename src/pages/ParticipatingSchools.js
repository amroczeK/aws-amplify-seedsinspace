import React, { useState, useEffect } from "react";
import StepperContent from "../components/ParticipatingSchools/StepperContent";
import Container from "@material-ui/core/Container";
import { getAllSchools } from "../apis";

const ParticipatingSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllSchools()
      .then(res => {
        // Only list Organizations that have added their Org name to profile
        let data = res.filter(obj => 
          obj?.SchoolName ? obj : null
        );
        setLoading(false);
        setSchools(data);
      })
      .catch(error => setError(error));
    // eslint-disable-next-line
  }, []);

  return (
    <Container style={{ paddingTop: "1em", paddingBottom: "2rem" }} maxWidth="lg">
      <StepperContent schools={schools} loading={loading} error={error} />
    </Container>
  );
};

export default ParticipatingSchools;
