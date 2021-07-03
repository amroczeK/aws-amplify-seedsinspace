import Weather from "../Weather";
import DatePicker from "../DatePicker";
import { StyledButton } from "../styled-components/Buttons";

const DashboardContentLarge = ({ setOpenAddSeed }) => {
  return (
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
      <DatePicker />
    </>
  );
};

export default DashboardContentLarge;
