import React, { useState } from "react";
import styled from "styled-components";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./TabPanel";

import { Calendar3 } from "@styled-icons/bootstrap/Calendar3";
import { BarGraph } from "@styled-icons/entypo/BarGraph";
import DatePicker from "./DatePicker";

const DashboardContent = () => {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newTab) => {
    setTab(newTab);
  };
  return (
    <Container>
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
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
      </Tabs>
      <TabPanel value={tab} index={0}>
        <DatePicker />
      </TabPanel>
    </Container>
  );
};

export default DashboardContent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  gap: 1em;
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
