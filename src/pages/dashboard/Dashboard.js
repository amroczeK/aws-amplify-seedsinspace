import React, { useState } from "react";
import styled from "styled-components";

import { StyledButton } from "../../components/styled-components/Buttons";
import Weather from "../../components/Weather";
import DashboardContent from "./components/DashboardContent";
import AddSeed from "./components/AddSeed";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const Dashboard = () => {
  const [openAddSeed, setOpenAddSeed] = useState(false);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const addSeedHandler = () => {
    setOpenAddSeed(!openAddSeed);
  };

  return (
    <>
      {isSmall && (
        <Container>
          <>
            <AddSeed open={openAddSeed} onClose={addSeedHandler} />
            <DashboardContainer>
              <StyledButton
                type="submit"
                disableElevation
                variant="contained"
                color="primary"
                onClick={addSeedHandler}
              >
                Add seed entry
              </StyledButton>
              <Weather />
              <DashboardContent />
            </DashboardContainer>
          </>
        </Container>
      )}
      {!isSmall && <DashboardContent />}
    </>
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
