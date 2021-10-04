import React, { useState } from "react";
import Graph from "../charts/Graph";
import Table from "../charts/Table";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { Table as TableIcon } from "@styled-icons/bootstrap/Table";
import { BarGraph } from "@styled-icons/entypo/BarGraph";
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

const SchoolData = ({ schoolSubId }) => {
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
          <QueryFilters schoolSubId={schoolSubId} />
          <Graph />
        </DataContainer>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <DataContainer>
          <QueryFilters schoolSubId={schoolSubId} />
          <Table />
        </DataContainer>
      </TabPanel>
    </Paper>
  );
};

export default SchoolData;

const DataContainer = styled.div`
  margin-top: 0.5rem;
  position: relative;
  height: 100%;
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
