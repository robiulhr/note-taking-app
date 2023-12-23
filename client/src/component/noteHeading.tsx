import { Box, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

type NoteHeadingPropsType = {
  noteId: string;
  noteTitle: string;
  titleComponent: any;
  titleClasses: string;
  buttonClasses: string;
};

export default function NoteHeading({ noteId, noteTitle, titleComponent, titleClasses, buttonClasses }: NoteHeadingPropsType) {
  const navigate = useNavigate();
  return (
    <>
      <Typography component={titleComponent} className={`px-2 h-[100%] w-[72%] truncate text-wrap ${titleClasses}`}>
        {noteTitle}
      </Typography>
      <Box className={`flex flex-row justify-end w-[25%] ${buttonClasses}`}>
        <IconButton
          aria-label=""
          onClick={() => {
            navigate(`editnote/${noteId}`);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton aria-label="" className="text-orange-500">
          <DeleteIcon className="text-orange" />
        </IconButton>
      </Box>
    </>
  );
}
