import { useState } from "react";
import NoteForm from "../component/form/noteForm";

export default function CreateNote() {
  const [noteTitle, setNoteTitle] = useState("");
  /**
   * here the <string[]> is used to make clear the dataype of children of this array.
   */
  const [noteTags, setNoteTags] = useState<string[]>([]);
  const [noteDescription, setNoteDescription] = useState("");
  const noteData = { noteTitle, noteTags, noteDescription };
  const noteHandlers = { setNoteTitle, setNoteTags, setNoteDescription };
  return <NoteForm actionType="create" noteHandlers={noteHandlers} noteData={noteData} pageTitle={"Create New Note"} btnText={"Save Note"} />;
}
