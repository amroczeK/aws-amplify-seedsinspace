import { useState } from "react";
import styled from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { StyledButton } from "../components/styled-components/Buttons";
import { Calendar3 } from "@styled-icons/bootstrap/Calendar3";
import { BarGraph } from "@styled-icons/entypo/BarGraph";
import Weather from "../components/Weather";
import AddSeedDialog from "../components/AddSeedDialog";
import DatePicker from "../components/DatePicker";

const TabPanel = ({ children, value, index, ...others }) => (
  <div role="tabpanel" hidden={value !== index} {...others}>
    {value === index && <div>{children}</div>}
  </div>
);

const Dashboard = () => {
  const [openAddSeed, setOpenAddSeed] = useState(false);
  const [tab, setTab] = useState(0);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTabChange = (event, newTab) => {
    setTab(newTab);
  };

  const addSeedHandler = () => {
    setOpenAddSeed(!openAddSeed);
  };

  return (
    <Container>
      {isSmall && (
        <>
          <AddSeedDialog open={openAddSeed} onClose={addSeedHandler} />
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

          <Tabs
            value={tab}
            onChange={handleTabChange}
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
      )}
      {!isSmall && (
        <>
          <div style={{ display: "flex", position: "relative" }}>
            <div style={{ flexGrow: 1 }}>
              <Weather />
            </div>
            <div
              style={{
                position: "absolute",
                right: "1em",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <StyledButton
                type="submit"
                disableElevation
                variant="contained"
                color="primary"
                onClick={addSeedHandler}
                width="300px"
              >
                Add seed entry
              </StyledButton>
            </div>
          </div>

          <DatePicker />
        </>
      )}
      <AddSeedDialog open={openAddSeed} onClose={addSeedHandler} />
    </Container>
  );
};

export default Dashboard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  margin: 1em;
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
