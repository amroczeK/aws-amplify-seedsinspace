import React from "react";
import LineChart from "../components/charts/LineChart";
import styled from "styled-components";

const Dashboard = () => {
  return (
    <Container>
      <h1>DASHBOARD</h1>
      <LineChart />
    </Container>
  );
};

export default Dashboard;

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100vw;
  height: 86vh;
  max-height: 100%;
  max-width: 100%;
  padding: 2rem;
`;
