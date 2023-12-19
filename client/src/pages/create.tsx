import { useEffect, useState } from "react";
import NoteForm from "../component/noteForm";

export default function Create() {
  const [noteTitle, setNoteTitle] = useState("");
  /**
   * here the <string[]> is used to make clear the dataype of children of this array.
   */
  const [noteTags, setNoteTags] = useState<string[]>([]);
  const [noteDescription, setNoteDescription] = useState("");
  const noteData = { noteTitle, noteTags, noteDescription };
  const noteHandlers = { setNoteTitle, setNoteTags, setNoteDescription };
  useEffect(() => {
    console.log(noteTitle, noteTags, noteDescription);
  }, [noteTitle, noteTags, noteDescription]);
  return <NoteForm noteHandlers={noteHandlers} noteData={noteData} pageTitle={"Create New Note"} btnText={"Save Note"} />;
}
