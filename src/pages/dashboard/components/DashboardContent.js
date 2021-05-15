import React, { useState } from "react";
import styled from "styled-components";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { Calendar3 } from "@styled-icons/bootstrap/Calendar3";
import { BarGraph } from "@styled-icons/entypo/BarGraph";

const DashboardContent = () => {
  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newTab) => {
    setTab(newTab);
  };
  return (
    <Container>
      <StyledTabs
        value={tab}
        onChange={handleChange}
        TabIndicatorProps={{
          style: { background: "#6BBE93" },
        }}
        aria-label="simple tabs example"
        variant="fullWidth"
      >
        <Tab
          label={
            <>
              <StyledTabDiv>
                <StyledCalendarIcon fontSize="inherit" /> Calendar
              </StyledTabDiv>
            </>
          }
        />
        <Tab
          label={
            <>
              <StyledTabDiv>
                <StyledBarGraphIcon fontSize="inherit" /> Graph
              </StyledTabDiv>
            </>
          }
        />
      </StyledTabs>
    </Container>
  );
};

export default DashboardContent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
`;

const StyledTabs = styled(Tabs)`
  selected: {
    color: ${({ theme }) => theme.primaryBackground};
  }
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
  padding: 0em;
`;

const StyledBarGraphIcon = styled(BarGraph)`
  width: 1.5em;
  height: 1.5em;
  padding: 0em;
`;
