import { Box, Paper, Typography, IconButton, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { wait } from "../utils/utils";
import getNote from "../apiActions/getNote";
import { ERROR_MESSAGES } from "../contents/errorMessages";
import { toast } from "react-toastify";
import { useErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TagsCart from "../component/tagsCart";
import { FullPageLoading } from "../component/fullPageLoading";
import { noteType } from "../types/types";
import NoDataFound from "../component/noDataFound";

export default function Note() {
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteTags, setNoteTags] = useState<string[]>([]);
  const [noteDescription, setNoteDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const { showBoundary } = useErrorBoundary();
  const { noteId } = useParams();
  useEffect(() => {
    async function fetchNote() {
      try {
        setLoading(true);
        // wait for test purpose
        await wait(2000);
        const notes = (await getNote(noteId as string)) as noteType[];
        if (!notes || notes?.length <= 0) {
          setLoading(false);
          return setNoData(true);
        }
        setNoteTitle(notes[0].noteTitle as string);
        setNoteDescription(notes[0].noteDescription as string);
        setNoteTags(notes[0].noteTags as string[]);
        setLoading(false);
      } catch (err) {
        toast.error(ERROR_MESSAGES.NOTE_DATA_ERROR);
        showBoundary(ERROR_MESSAGES.NOTE_DATA_ERROR);
      }
    }
    fetchNote();
  }, []);
  return (
    <Box className="p-5 my-8" component={Paper}>
      {noData ? (
        <NoDataFound className="min-h-[615px] flex items-center justify-center" />
      ) : (
        <Box>
          <Box className="py-2 px-3 flex flex-row items-center justify-between">
            <Typography className="text-start text-bold text-2xl truncate" component={"h1"}>
              {noteTitle}
            </Typography>
            <Box className="ml-4 flex flex-row">
              <IconButton aria-label="">
                <EditIcon />
              </IconButton>
              <IconButton aria-label="">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
          <Divider />
          <Box className="p-5 min-h-[500px] text-start">{loading ? <FullPageLoading className="min-h-[450px]" /> : parse(noteDescription)}</Box>
          <Divider />
          <TagsCart noteTags={noteTags} />
        </Box>
      )}
    </Box>
  );
}
