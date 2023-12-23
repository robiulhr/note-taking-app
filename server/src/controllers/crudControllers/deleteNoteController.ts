import { Request, Response } from "express";
import { SUCCESS_MESSAGES } from "../../contents/successMessages";
import { ERROR_MESSAGES } from "../../contents/errorMessages";
import { deleteNote, updateNote } from "../../dbActions/crudActions";
import { sendResponse } from "../../utils/utils";

export default async function deleteNoteController(req: Request, res: Response) {
  const { id: noteId } = req.params;
  // create the note in store
  const response = await deleteNote(noteId);
  if (!response) {
    return sendResponse(res, 500, ERROR_MESSAGES.FAILED_ERROR);
  }
  return sendResponse(res, 200, SUCCESS_MESSAGES.NOTE_CREATED);
}
