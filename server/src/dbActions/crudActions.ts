import fs from "fs/promises";
import rootDir from "app-root-path";
import { v4 as uuidv4 } from "uuid";
import { jsonReader } from "./utils";
import { noteType } from "../types/types";

const NOTES_STORE = rootDir.resolve("/store/notes.json");

export const createNote = async (note: noteType): Promise<string> => {
  const noteId = uuidv4();
  note.id = noteId;
  let message = "";
  await jsonReader<noteType[]>(NOTES_STORE, async (err: object | unknown, notes: noteType[] | undefined) => {
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

export const readNotes = async (id?: string): Promise<readAllNotesReturn> => {
  let message = "";
  let data: object[] = [];
  await jsonReader<noteType[]>(NOTES_STORE, async (err: object | unknown, notes: noteType[] | undefined) => {
    if (err) {
      console.log("Error reading notes", err);
      return;
    }
    if (notes === undefined) {
      notes = [];
    }
    if (id as string) {
      data = notes.filter((ele) => ele.id === id);
    } else {
      data = notes;
    }
    message = "success";
  });
  return { data: data, message };
};

export const updateNote = async (id: string, updatedNote: noteType): Promise<readAllNotesReturn> => {
  const { noteTitle, noteDescription, noteTags } = updatedNote;
  let message = "";
  let data: object[] = [];
  await jsonReader<noteType[]>(NOTES_STORE, async (err: object | unknown, notes: noteType[] | undefined) => {
    if (err) {
      console.log("Error reading notes", err);
      return;
    }
    if (notes === undefined) {
      notes = [];
    }
    if (id as string) {
      const noteIndex = notes.findIndex((ele) => ele.id === id);
      notes[noteIndex].noteTitle = noteTitle;
      notes[noteIndex].noteDescription = noteDescription;
      notes[noteIndex].noteTags = noteTags;
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
      // set the updated note array to the return data
      data = [notes[noteIndex]];
    } else {
      return;
    }
  });
  return { data: data, message };
};

export const deleteNote = async (id: string): Promise<object> => {
  let message = "";
  let data: object[] = [];
  await jsonReader<noteType[]>(NOTES_STORE, async (err: object | unknown, notes: noteType[] | undefined) => {
    if (err) {
      console.log("Error reading notes", err);
      return;
    }
    if (notes === undefined) {
      notes = [];
    }
    if (id as string) {
      notes = notes.filter((ele) => ele.id !== id);
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
      // set the updated note array to the return data
      data = notes;
    } else {
      return;
    }
  });
  return { message };
};
