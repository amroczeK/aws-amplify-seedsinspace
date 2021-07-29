import { useState, useEffect } from "react";
import SimpleDialog from "../feedback/SimpleDialog";
import Typography from "@material-ui/core/Typography";
import { Note } from "@styled-icons/boxicons-solid/Note";
import styled from "styled-components";

const Notes = ({ notes }) => (
  <NotesContainer>
    <Typography>{notes}</Typography>
  </NotesContainer>
);

const SeedNotesView = ({ row }) => {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState(null);
  const [title, setTitle] = useState(null);

  const handleClose = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (row && !title) {
      let notes = row?.Notes;
      let Sk = row?.Sk?.split("SEED#")[1];
      setTitle(Sk.replace(/_/gim, " "));
      setNotes(notes);
    }
  }, [row, , setTitle, setTitle]);

  return (
    <Container>
      <div
        onClick={() => {
          setOpen(!open);
        }}
      >
        <NoteIcon />
      </div>
      <SimpleDialog
        title={title}
        open={open}
        handleClose={handleClose}
        component={Notes}
        componentProps={{ notes }}
      />
    </Container>
  );
};

export default SeedNotesView;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const NoteIcon = styled(Note)`
  cursor: pointer;
  width: 2.5em;
  height: 2.5em;
  color: ${props => props.color || props.theme.palette.primary.main};
  margin: 1em 0;
`;

const NotesContainer = styled.div`
  padding: 1.5rem;
  max-width: 600px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  @media (max-width: 600px) {
    max-width: 350px;
  }
`;
