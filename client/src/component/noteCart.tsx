import { Box, Divider, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { getPlainText } from "../utils/utils";
import { Link } from "react-router-dom";
import { useOverflowCheck } from "../customHooks/useOverflowCheck";
import TagsCart from "./tagsCart";
import NoteHeading from "./noteHeading";
type noteCartPropsType = {
  key: string;
  id: string;
  noteTitle: string;
  noteDescription: string;
  noteTags: string[];
  deleteNoteOnUi: (noteId: string) => void;
};

export default function NoteCart({ key, id, noteTitle, noteDescription, noteTags, deleteNoteOnUi }: noteCartPropsType) {
  const { containerRef, contentRef, isOverflowing: isDescriptionOverflowing } = useOverflowCheck();
  const [slicedDescription, setSlicedDescription] = useState(getPlainText(noteDescription, 250));

  return (
    <Box key={key} className="m-2 flex items-center flex-col justify-evenly h-[300px] p-2" component={Paper}>
      <Box className="w-[100%] h-[35px] flex flex-row justify-between items-center">
        <NoteHeading noteId={id} noteTitle={noteTitle} titleComponent="h3" titleClasses="text-start text-bold text-xl" buttonClasses="" deleteNoteOnUi={deleteNoteOnUi} />
      </Box>
      <Divider className="w-[100%]" />
      <Box className="h-[200px] line-clamp-[7] p-2 w-[100%]" ref={containerRef}>
        <Typography className="p-2 h-[100%] w-[100%] relative break-all text-wrap" ref={contentRef}>
          {slicedDescription}...
          {isDescriptionOverflowing ? (
            <Link to={`notes/${id}`} className="absolute bottom-[-6px] pl-1 right-0 text-lg bg-white">
              ...Read more
            </Link>
          ) : (
            <Link to={`notes/${id}`} className="bg-white text-lg">
              Read more
            </Link>
          )}
        </Typography>
      </Box>
      <Box className="w-[100%] h-[65px]">
        <Divider className="w-[100%]" />
        <TagsCart noteTags={noteTags} />
      </Box>
    </Box>
  );
}
