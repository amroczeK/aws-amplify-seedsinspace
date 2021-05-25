import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

// Styled Components
import styled from "styled-components";
import { StyledTypographyDark } from "../components/styled-components/Typography";

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

const StyledLink = styled.a`
  color: ${({ theme }) => theme.primaryBackground};
  font-size: 0.75em;
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

// const StyledNavLink = styled.a`
//   color: ${({ theme }) => theme.primaryBackground};
//   align-self: center;
//   font-size: 0.75em;
// `;

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
        <StyledTypographyDark variant="h5">
          Have you planted your seeds?
        </StyledTypographyDark>
        <StyledButtonContainer>
          <StyledButton disableElevation variant="contained">
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
        <StyledLink href="/">Need help planting the seeds?</StyledLink>
      </SeedSetUpContainer>
    );
  };

  const SeedsPlantedSetUp = () => {
    return (
      <SeedSetUpContainer>
        <Card>
          <CardContent>
            <Typography variant="body2">
              You won't be able to enter seed data until you've confirmed that
              you've planted your seeds.
            </Typography>
          </CardContent>
        </Card>
        <StyledButton disableElevation variant="contained">
          I have planted my seeds
        </StyledButton>
        <StyledLink href="/">Need help planting the seeds?</StyledLink>
      </SeedSetUpContainer>
    );
  };

  return <Container>{stepContent()}</Container>;
};

export default SeedSetUp;
