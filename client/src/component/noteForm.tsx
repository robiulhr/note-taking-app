import { Box, Button, Divider, Paper, TextField, Typography } from "@mui/material";
import RichTextEditor from "../component/richTextEditor";
import TagFilter from "./tagFilter";
import { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent, useEffect, useState } from "react";
import { ERROR_MESSAGES } from "../contents/errorMessages";
import { toast } from "react-toastify";
import createNotes from "../apiActions/createNotes";
import LoadingButton from "@mui/lab/LoadingButton";
import { wait } from "../utils/utils";

interface NoteFormProps {
  pageTitle: string;
  btnText: string;
  noteData: {
    noteTitle: string;
    noteDescription: string;
    noteTags: string[];
  };
  noteHandlers: {
    /*
     * here Dispatch<SetStateAction<string>> is the type for react useState setter function argument and
     * and the string and string[] defines the datatype of the argument.
     */
    setNoteTitle: Dispatch<SetStateAction<string>>;
    setNoteTags: Dispatch<SetStateAction<string[]>>;
    setNoteDescription: Dispatch<SetStateAction<string>>;
  };
}

export default function NoteForm({ noteData, noteHandlers, pageTitle, btnText }: NoteFormProps) {
  const { noteTitle, noteDescription, noteTags } = noteData;
  const { setNoteTitle, setNoteTags, setNoteDescription } = noteHandlers;
  const [noteTitleError, setNoteTitleError] = useState("");
  const [noteTagsError, setNoteTagsError] = useState("");
  const [noteDescriptionError, setNoteDescriptionError] = useState("");
  const [loading, setLoading] = useState(false);
  function resetNoteErrors() {
    setNoteTitleError("");
    setNoteTagsError("");
    setNoteDescriptionError("");
  }
  function resetNoteValues() {
    setNoteTitle("");
    setNoteTags([]);
    setNoteDescription("");
  }
  function setErrors() {
    if (!noteTitle && !noteTags.length && !noteDescription) {
      setNoteTitleError(ERROR_MESSAGES.NOTE_TITLE_ERROR);
      setNoteTagsError(ERROR_MESSAGES.NOTE_TAGS_ERROR);
      setNoteDescriptionError(ERROR_MESSAGES.NOTE_DESCRIPTION_ERROR);
      toast.error(ERROR_MESSAGES.NOTE_DATA_ERROR);
      return;
    } else if (!noteTitle) {
      toast.error(ERROR_MESSAGES.NOTE_TITLE_ERROR);
      return setNoteTitleError(ERROR_MESSAGES.NOTE_TITLE_ERROR);
    } else if (!noteTags.length) {
      toast.error(ERROR_MESSAGES.NOTE_TAGS_ERROR);
      return setNoteTagsError(ERROR_MESSAGES.NOTE_TAGS_ERROR);
    } else if (!noteDescription) {
      toast.error(ERROR_MESSAGES.NOTE_DESCRIPTION_ERROR);
      return setNoteDescriptionError(ERROR_MESSAGES.NOTE_DESCRIPTION_ERROR);
    }
  }
  function noteTitleHandler(e: ChangeEvent<HTMLInputElement>) {
    setNoteTitle(e.target.value);
  }
  function noteTagsHandler(e: SyntheticEvent, value: string[]) {
    console.log(e, value);
    setNoteTags(value);
  }
  function noteDescriptionHandler(value: string, delta: any, source: any, editor: any) {
    setNoteDescription(value);
  }

  async function formSubmitHandler(e: SyntheticEvent) {
    e.preventDefault();
    resetNoteErrors();
    // set errors
    setErrors();
    // start loading
    setLoading(true);
    const response = createNotes(noteTitle, noteTags, noteDescription);
    // wait is for test purpose
    await wait(2000);
    // stop loading
    setLoading(false);
    resetNoteErrors();
    resetNoteValues();
  }
  return (
    <Paper className="my-6 p-10">
      <Typography className="text-start text-bolt text-xl w-[100%]">{pageTitle}</Typography>
      <Divider />
      <Box className="my-4">
        <Typography className="text-start my-2">Title</Typography>
        <TextField value={noteTitle} error={noteTitleError ? true : false} onChange={noteTitleHandler} fullWidth id="filled-basic" label="Write Title Here" variant="filled" />
      </Box>
      <Box className="my-4">
        <Typography className="text-start my-2">Tags</Typography>
        <TagFilter noteTags={noteTags} error={noteTagsError ? true : false} onChange={noteTagsHandler} className="w-[100%]" />
      </Box>
      <Box className="my-10">
        <Typography className="text-start my-2">Description</Typography>
        <RichTextEditor noteDescription={noteDescription} error={noteDescriptionError} onChange={noteDescriptionHandler} />
      </Box>
      <Box className="flex items-center justify-end">
        <LoadingButton loading={loading} onClick={formSubmitHandler} variant="contained" className="mt-5">
          {btnText}
        </LoadingButton>
      </Box>
    </Paper>
  );
}
