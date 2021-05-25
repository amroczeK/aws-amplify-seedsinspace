import React from "react";
import styled from "styled-components";

import { StyledButton } from "../../components/styled-components/Buttons";
import Weather from "../../components/Weather";
import DashboardContent from "./components/DashboardContent";

const Dashboard = () => {
  return (
    <Container>
      <DashboardContainer>
        <StyledButton
          type="submit"
          disableElevation
          variant="contained"
          color="primary"
        >
          Add seed entry
        </StyledButton>
        <Weather />
        <DashboardContent />
      </DashboardContainer>
    </Container>
  );
};

export default Dashboard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100%;
  max-width: 350px;
  margin: 1em;
  padding: 1em;
  gap: 1em;
`;
