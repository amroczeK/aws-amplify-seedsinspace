import { useState, useEffect } from "react";
import SimpleDialog from "../feedback/SimpleDialog";
import Button from "../../components/inputs/Button";
import { S3Image } from "aws-amplify-react";
import styled from "styled-components";

const SeedImageView = ({ row }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(null)
  const [imageKey, setImageKey] = useState(null);

  const handleClose = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (row && !imageKey) {
      let Pk = row?.Pk?.split("SCHOOL#")[1];
      let Sk = row?.Sk?.split("SEED#")[1];
      setTitle(Sk.replace(/\_/gim, " "));
      setImageKey(`seed_images/${Pk}_${Sk}`);
    }
  }, [row, imageKey, setImageKey]);

  return (
    <Container>
      <Button
        title={"view"}
        onClickHandler={() => {
          setOpen(!open);
        }}
      />
      <SimpleDialog
        title={title}
        open={open}
        handleClose={handleClose}
        component={S3Image}
        componentProps={{ imgKey: imageKey, level: "public" }}
      />
    </Container>
  );
};

export default SeedImageView;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
