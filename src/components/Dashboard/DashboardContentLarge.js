import Weather from "../Weather";
import GraphAndTable from "./GraphAndTable";
import Container from "@material-ui/core/Container";
import { StyledButton } from "../styled-components/Buttons";

const DashboardContentLarge = ({ setOpenAddSeed }) => {
  return (
    <Container maxWidth="xl">
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
      <GraphAndTable />
    </Container>
  );
};

export default DashboardContentLarge;
