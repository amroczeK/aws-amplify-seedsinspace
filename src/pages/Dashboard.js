import { useState } from "react";
import styled from "styled-components";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AddSeedDialog from "../components/Dashboard/AddSeedDialog";
import DashboardContent from "../components/Dashboard/DashboardContent"

const Dashboard = () => {
  const [openAddSeed, setOpenAddSeed] = useState(false);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container>
      <AddSeedDialog open={openAddSeed} onClose={() => setOpenAddSeed(false)} />
      <DashboardContent setOpenAddSeed={setOpenAddSeed}/>
    </Container>
  );
};

export default Dashboard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  gap: 1em;
`;
