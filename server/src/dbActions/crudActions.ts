import fs from "fs/promises";
import rootDir from "app-root-path";
import { v4 as uuidv4 } from "uuid";
import { jsonReader } from "./utils";

const NOTES_STORE = rootDir.resolve("/store/notes.json");

type NoteType = {
  id?: string;
  title: string;
  tags: string[];
  description: string;
};

export const createNote = async (note: NoteType): Promise<string> => {
  const noteId = uuidv4();
  note.id = noteId;
  let message = "";
  await jsonReader(NOTES_STORE, async (err, notes) => {
    if (err) {
      console.log("Error reading notes", err);
      return;
    }
    // insert new note
    if (notes === undefined) {
      notes = [];
    }
    notes.push(note);
    // write the updated notes array to the store
    await fs
      .writeFile(NOTES_STORE, JSON.stringify(notes))
      .then(() => {
        message = "success";
      })
      .catch((err) => {
        if (err) {
          console.log("Error writing notes", err);
        }
      });
  });
  return message;
};

interface readAllNotesReturn {
  data: object[];
  message: string;
}

export const readAllNotes = async (): Promise<readAllNotesReturn> => {
  let message = "";
  let data: object[] = [];
  await jsonReader(NOTES_STORE, async (err, notes) => {
    if (err) {
      console.log("Error reading notes", err);
      return;
    }
    if (notes === undefined) {
      notes = [];
    }
    data = notes;
    message = "success";
  });
  return { data: data, message };
};
