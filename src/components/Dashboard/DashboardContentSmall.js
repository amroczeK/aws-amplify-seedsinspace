import { useState } from "react";
import styled from "styled-components";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { Calendar3 } from "@styled-icons/bootstrap/Calendar3";
import { BarGraph } from "@styled-icons/entypo/BarGraph";
import { StyledButton } from "../styled-components/Buttons";
import Weather from "../Weather";
import DatePicker from "../DatePicker";

const TabPanel = ({ children, value, index, ...others }) => (
  <div role="tabpanel" hidden={value !== index} {...others}>
    {value === index && <div>{children}</div>}
  </div>
);

const DashboardContentSmall = ({ setOpenAddSeed }) => {
  const [tab, setTab] = useState(0);

  return (
    <>
      <StyledButton
        disableElevation
        variant="contained"
        color="primary"
        onClick={() => setOpenAddSeed(true)}
      >
        Add seed entry
      </StyledButton>
      <Weather />
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
              <StyledCalendarIcon fontSize="inherit" /> Calendar
            </StyledTabDiv>
          }
        />
        <Tab
          label={
            <StyledTabDiv>
              <StyledBarGraphIcon fontSize="inherit" /> Graph
            </StyledTabDiv>
          }
        />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <DatePicker />
      </TabPanel>
    </>
  );
};

export default DashboardContentSmall;

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
