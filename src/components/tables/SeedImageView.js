import { useState, useEffect } from "react";
import SimpleDialog from "../feedback/SimpleDialog";
import { S3Image } from "aws-amplify-react";
import { Image } from "@styled-icons/boxicons-solid/Image";
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
      setTitle(Sk.replace(/_/gim, " "));
      setImageKey(`seed_images/${Pk}_${Sk}`);
    }
  }, [row, imageKey, setImageKey, setTitle]);

  return (
    <Container>
      <div
        onClick={() => {
          setOpen(!open);
        }}
      >
        <ImageIcon />
      </div>
      <SimpleDialog
        title={title}
        open={open}
        handleClose={handleClose}
        component={S3Image}
        componentProps={{ imgKey: imageKey, level: "public" }}
        containerProps={{ justifyContent: "center", alignItems: "center" }}
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

const ImageIcon = styled(Image)`
  cursor: pointer;
  width: 2.5em;
  height: 2.5em;
  color: ${props => props.color || props.theme.palette.primary.main};
  margin: 1em 0;
`;
