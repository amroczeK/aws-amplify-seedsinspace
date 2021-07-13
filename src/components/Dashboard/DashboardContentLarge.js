import Weather from "../Weather";
import DatePicker from "../DatePicker";
import Graph from "./Graph";
import Table from "./Table";
import Container from "@material-ui/core/Container";
import { StyledButton } from "../styled-components/Buttons";
import styled from "styled-components";

const DashboardContentLarge = ({ setOpenAddSeed }) => {
  return (
    <Container maxWidth="xl">
      <h1>Your Seed Entries</h1>
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
            disableElevation
            variant="contained"
            color="primary"
            onClick={() => setOpenAddSeed(true)}
            width="300px"
          >
            Add seed entry
          </StyledButton>
        </div>
      </div>
      {/* <DatePicker /> */}
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
