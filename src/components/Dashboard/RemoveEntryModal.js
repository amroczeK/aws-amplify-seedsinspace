import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Button } from "../styled-components/Buttons";
import StyledModal from "../styled-components/Modal";
import * as API from "../../apis";

const RemoveEntryModal = ({ name, schoolData, refetch }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => setModalOpen(false);

  const handleConfirm = async () => {
    console.log(schoolData);
    let Sk = schoolData.Sk.replace("SCHOOL#", "");
    let InactiveSeeds = schoolData?.InactiveSeeds;

    if (InactiveSeeds) InactiveSeeds = [...InactiveSeeds, name];
    else InactiveSeeds = [name];

    // Return the original data with updated InactiveSeeds list
    const request = { InactiveSeeds };

    const response = await API.updateSchool(request, Sk);

    if (response?.error) console.error(response.error);

    refetch(true); // refetch the updated school data

    handleClose();
  };

  return (
    <>
      <Button color="default" padding="1em 1em" onClick={() => setModalOpen(true)}>
        <b>Stop recording data for this seed</b>
      </Button>
      <StyledModal
        open={modalOpen}
        onClose={handleClose}
        title={`Stop recording ${name} data`}
      >
        <Typography gutterBottom>
          You won't be able to record future seed entries for this seed but previous data
          recorded for this seed will be saved.
        </Typography>
        <Button onClick={handleConfirm}>Confirm</Button>
        <Button color="default" onClick={handleClose}>
          Cancel
        </Button>
      </StyledModal>
    </>
  );
};

export default RemoveEntryModal;
