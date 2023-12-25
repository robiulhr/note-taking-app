import { useEffect, useState } from "react";
import NoteForm from "../component/form/noteForm";
import { useParams } from "react-router-dom";
import { wait } from "../utils/utils";
import getNote from "../apiActions/getNote";
import { noteType } from "../types/types";
import { toast } from "react-toastify";
import { ERROR_MESSAGES } from "../contents/errorMessages";
import { Box, Paper } from "@mui/material";
import { FullPageLoading } from "../component/loader/fullPageLoading";
import { useErrorBoundary } from "react-error-boundary";
import NoDataFound from "../component/error/noDataFound";

export default function EditNote() {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteTags, setNoteTags] = useState<string[]>([]);
  const [noteDescription, setNoteDescription] = useState("");
  const noteData = { noteTitle, noteTags, noteDescription };
  const noteHandlers = { setNoteTitle, setNoteTags, setNoteDescription };
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
    <Box>
      {loading ? (
        <Box component={Paper} className="my-10">
          <FullPageLoading className="min-h-[755px]" />
        </Box>
      ) : noData ? (
        <Box component={Paper} className="my-10">
          <NoDataFound className="min-h-[755px] flex items-center justify-center" />
        </Box>
      ) : (
        <NoteForm actionType="update" noteId={noteId} noteHandlers={noteHandlers} noteData={noteData} pageTitle={"Edit Note"} btnText={"Update Note"} />
      )}
    </Box>
  );
}
