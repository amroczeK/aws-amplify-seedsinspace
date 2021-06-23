import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import styled from "styled-components";
import { StyledLink } from "../components/styled-components/Links";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
`;

const SeedSetUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100%;
  max-width: 350px;
  margin: 2em 1em 1em 1em;
  padding: 1em;
  gap: 1em;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 1em;
`;

const StyledButton = styled(Button)`
  background: ${({ theme }) => theme.secondaryLight};
  color: ${({ theme }) => theme.primaryLight};
  padding: 1em 0;
  width: 100%;
  text-transform: none;
`;

const StyledButtonLight = styled(Button)`
  background: ${({ theme }) => theme.primaryHover};
  color: ${({ theme }) => theme.primaryLight};
  padding: 1em 0;
  width: 100%;
  text-transform: none;
`;

const SeedSetUp = () => {
  const [step, setStep] = useState(0);

  const stepContent = () => {
    return {
      0: <SeedsPlantedQuery />,
      1: <SeedsPlantedSetUp />,
    }[step];
  };

  // Note: Should probably be a separate section
  const SeedsPlantedQuery = () => {
    return (
      <SeedSetUpContainer>
        <Typography variant="h5">Have you planted your seeds?</Typography>
        <StyledButtonContainer>
          <StyledButton color="primary" disableElevation variant="contained">
            Yes
          </StyledButton>

          <StyledButtonLight
            disableElevation
            variant="contained"
            onClick={() => setStep(1)}
          >
            No
          </StyledButtonLight>
        </StyledButtonContainer>
        <StyledLink decoration="underline" to="/">
          Need help planting the seeds?
        </StyledLink>
      </SeedSetUpContainer>
    );
  };

  const SeedsPlantedSetUp = () => {
    return (
      <SeedSetUpContainer>
        <Card>
          <CardContent>
            <Typography variant="body2">
              You won't be able to enter seed data until you've confirmed that you've
              planted your seeds.
            </Typography>
          </CardContent>
        </Card>
        <StyledButton color="primary" disableElevation variant="contained">
          I have planted my seeds
        </StyledButton>
        <StyledLink decoration="underline" to="/">
          Need help planting the seeds?
        </StyledLink>
      </SeedSetUpContainer>
    );
  };

  return <Container>{stepContent()}</Container>;
};

export default SeedSetUp;
