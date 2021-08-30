import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../../context/Data";
import Weather from "../Weather";
import Graph from "./Graph";
import Table from "./Table";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Container from "@material-ui/core/Container";
import { StyledButton } from "../styled-components/Buttons";
import { Calendar3 } from "@styled-icons/bootstrap/Calendar3";
import { BarGraph } from "@styled-icons/entypo/BarGraph";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import styled from "styled-components";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import QueryFilters from "./QueryFilters";

const TabPanel = ({ children, value, index, ...others }) => (
  <div role="tabpanel" hidden={value !== index} {...others}>
    {value === index && <div>{children}</div>}
  </div>
);

const TabContainer = () => {
  const [tab, setTab] = useState(0);

  return (
    <TabC>
      <Tabs
        value={tab}
        onChange={(event, value) => setTab(value)}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab
          label={
            <StyledTabDiv>
              <StyledBarGraphIcon fontSize="inherit" /> Graph
            </StyledTabDiv>
          }
        />
        <Tab
          label={
            <StyledTabDiv>
              <StyledCalendarIcon fontSize="inherit" /> Table
            </StyledTabDiv>
          }
        />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <DataContainer>
          <QueryFilters />
          <Graph />
        </DataContainer>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <DataContainer>
          <QueryFilters />
          <Table />
        </DataContainer>
      </TabPanel>
    </TabC>
  );
};

const DashboardContentLarge = ({ setOpenAddSeed }) => {
  const { seedData, setSeedData, loading, setLoading, error, setError } =
    useContext(DataContext);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
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
      {/* {!isSmall && (
        <DataContainer>
          <Graph />
          <Table />
        </DataContainer>
      )} */}
      {/* {isSmall && <TabContainer />} */}
      <TabContainer />
    </Container>
  );
};

export default DashboardContentLarge;

const DataContainer = styled.div`
  margin-top: 0.5rem;
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

const StyledTabDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em;
`;

const StyledCalendarIcon = styled(Calendar3)`
  width: 1.5em;
  height: 1.5em;
`;

const StyledBarGraphIcon = styled(BarGraph)`
  width: 1.5em;
  height: 1.5em;
`;

const TabC = styled.div`
  margin-top: 0.5rem;
`;