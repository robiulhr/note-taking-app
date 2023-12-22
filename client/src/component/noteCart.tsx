import { Box, Chip, Divider, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { getPlainText } from "../utils/utils";
import { Link } from "react-router-dom";
import { useHorizontalScroll } from "../customHooks/useHorizontalScroll";

type noteCartPropsType = {
  key: string;
  noteTitle: string;
  noteDescription: string;
  noteTags: string[];
};

export default function NoteCart({ key, noteTitle, noteDescription, noteTags }: noteCartPropsType) {
  const [slicedDescription, setSlicedDescription] = useState(getPlainText(noteDescription, 250));
  const scrollRef = useHorizontalScroll();

  return (
    <Box key={key} className="m-2 flex items-center flex-col justify-evenly h-[300px] p-2" component={Paper}>
      <Box className="w-[100%] h-[35px]">
        <Typography variant="h6" className="px-2 h-[100%] w-[100%] truncate">
          {noteTitle}
        </Typography>
        <Divider className="w-[100%]" />
      </Box>
      <Box className="h-[200px] p-2">
        <Typography className="p-2 h-[100%] w-[100%] break-all">
          {slicedDescription}...<Link to={""}>Read more</Link>
        </Typography>
      </Box>
      <Box className="w-[100%]">
        <Divider className="w-[100%]" />
        <Box className="h-[40px] mt-4 w-[100%] flex flex-row items-center justify-start">
          <Typography className="inline-block w-[10%]">Tags: </Typography>
          <Box ref={scrollRef} className="relative overflow-scroll no-scrollbar h-[100%] flex flex-row items-center justify-start">
            {noteTags.map((ele) => {
              return <Chip className="mx-1 w-[100px]" label={ele} variant="outlined" />;
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
