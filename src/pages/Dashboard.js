import { useState } from "react";
import styled from "styled-components";
import AddSeedDialog from "../components/Dashboard/AddSeedDialog";
import DashboardContentLarge from "../components/Dashboard/DashboardContentLarge";

const Dashboard = () => {
  const [openAddSeed, setOpenAddSeed] = useState(false);

  return (
    <Container>
      <AddSeedDialog open={openAddSeed} onClose={() => setOpenAddSeed(false)} />
      <DashboardContentLarge setOpenAddSeed={setOpenAddSeed}/>
    </Container>
  );
};

export default Dashboard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  gap: 1em;
  padding: 1.5rem;
  @media (max-width: 600px) {
    padding: 0.5rem;
  }
`;
