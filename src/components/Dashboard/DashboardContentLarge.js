import Weather from "../Weather";
import Graph from "./Graph";
import Table from "./Table";
import Container from "@material-ui/core/Container";
import { StyledButton } from "../styled-components/Buttons";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import styled from "styled-components";

const DashboardContentLarge = ({ setOpenAddSeed }) => {
  return (
    <Container maxWidth="xl">
      <h1>Your Seed Entries</h1>
      <StyledCard>
        <CardContent>
          <WeatherContainer>
            <Weather />
            <ButtonContainer>
              <StyledButton
                disableElevation
                variant="contained"
                color="primary"
                onClick={() => setOpenAddSeed(true)}
                width="300px"
              >
                Add seed entry
              </StyledButton>
            </ButtonContainer>
          </WeatherContainer>
        </CardContent>
      </StyledCard>
      <DataContainer>
        <Graph />
        <Table />
      </DataContainer>
    </Container>
  );
};

export default DashboardContentLarge;

const DataContainer = styled.div`
  padding-top: 2rem;
  position: relative;
  height: 100%;
`;

const WeatherContainer = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 768px) {
    padding-top: 1rem;
    justify-content: center;
  }
`;

const StyledCard = styled(Card)`
  max-width: 740px;
`;
