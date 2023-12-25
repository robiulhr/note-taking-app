import { Box, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import ShowAlertModal from "./modal/showAlertModal";
import { useState } from "react";
import deleteNote from "../apiActions/deleteNote";

type NoteHeadingPropsType = {
  noteId: string;
  noteTitle: string;
  titleComponent: any;
  titleClasses: string;
  buttonClasses: string;
  deleteNoteOnUi?: (noteId: string) => void;
};

export default function NoteHeading({ noteId, noteTitle, titleComponent, titleClasses, buttonClasses, deleteNoteOnUi }: NoteHeadingPropsType) {
  const navigate = useNavigate();
  // alert modal state
  const [showAlert, setShowAlert] = useState(false);
  const alertCloseHandler = () => setShowAlert(false);
  const alertShowHandler = () => setShowAlert(true);

  async function deleteNoteHandler() {
    await deleteNote(noteId);
    deleteNoteOnUi ? deleteNoteOnUi(noteId) : navigate("/");
  }
  return (
    <>
      <ShowAlertModal alertTitle="Do you wanna delete the note?" alertDescription="Are you sure? You won't get the note once you delete it!" showAlert={showAlert} alertCloseHandler={alertCloseHandler} doAction={deleteNoteHandler} btnText="Yes!" />
      <Typography component={titleComponent} className={`px-2 h-[100%] w-[72%] truncate text-wrap ${titleClasses}`}>
        {noteTitle}
      </Typography>
      <Box className={`flex flex-row justify-end w-[25%] ${buttonClasses}`}>
        <IconButton
          aria-label=""
          onClick={() => {
            navigate(`/editnote/${noteId}`);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label=""
          className="text-orange-500"
          onClick={() => {
            alertShowHandler();
          }}
        >
          <DeleteIcon className="text-orange" />
        </IconButton>
      </Box>
    </>
  );
}
