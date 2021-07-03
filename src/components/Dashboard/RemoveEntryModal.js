import Typography from "@material-ui/core/Typography";
import { StyledButton } from "../styled-components/Buttons";
import StyledModal from "../styled-components/Modal";

const RemoveEntryModal = ({ open, close, name }) => {
  return (
    <StyledModal open={open} onClose={close} title={`Stop recording ${name} data`}>
      <Typography gutterBottom>
        You won't be able to record future seed entries for this seed but previous data
        recorded for this seed will be saved.
      </Typography>
      <StyledButton color="primary" variant="contained" disableElevation>
        Confirm
      </StyledButton>
      <StyledButton color="primary" disableElevation onClick={close}>
        Cancel
      </StyledButton>
    </StyledModal>
  );
};

export default RemoveEntryModal;
