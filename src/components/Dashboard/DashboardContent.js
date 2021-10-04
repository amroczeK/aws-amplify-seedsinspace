import React, { useState } from "react";
import Weather from "../Weather";
import Graph from "../charts/Graph";
import Table from "../charts/Table";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Container from "@material-ui/core/Container";
import { StyledButton } from "../styled-components/Buttons";
import { Table as TableIcon } from "@styled-icons/bootstrap/Table";
import { BarGraph } from "@styled-icons/entypo/BarGraph";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import QueryFilters from "./QueryFilters";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: "1.5rem",
    color: theme.palette.text.secondary,
  },
}));

const TabPanel = ({ children, value, index, ...others }) => (
  <div role="tabpanel" hidden={value !== index} {...others}>
    {value === index && <div>{children}</div>}
  </div>
);

const TabContainer = () => {
  const classes = useStyles();

  const [tab, setTab] = useState(0);

  return (
    <Paper className={classes.paper}>
      <Tabs value={tab} onChange={(event, value) => setTab(value)} variant="fullWidth" indicatorColor="primary" textColor="primary">
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
              <StyledTableIcon fontSize="inherit" /> Table
            </StyledTabDiv>
          }
        />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <DataContainer>
          <h4 style={{ margin: "1em 0 0 1em" }}>Filter by</h4>
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
    </Paper>
  );
};

const DashboardContent = ({ setOpenAddSeed }) => {
  return (
    <Container style={{ paddingTop: "1em", paddingBottom: "2rem" }} maxWidth="lg">
      <h1>My seeds</h1>
      <StyledCard>
        <CardContent>
          <WeatherContainer>
            <Weather />
            <ButtonContainer>
              <StyledButton disableElevation variant="contained" color="primary" onClick={() => setOpenAddSeed(true)} width="300px">
                Add seed entry
              </StyledButton>
            </ButtonContainer>
          </WeatherContainer>
        </CardContent>
      </StyledCard>
      <TabContainer />
    </Container>
  );
};

export default DashboardContent;

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

const StyledTableIcon = styled(TableIcon)`
  width: 1.5em;
  height: 1.5em;
`;

const StyledBarGraphIcon = styled(BarGraph)`
  width: 1.5em;
  height: 1.5em;
`;
