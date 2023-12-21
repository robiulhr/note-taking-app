import { Request, Response } from "express";
import { SUCCESS_MESSAGES } from "../../contents/successMessages";
import { ERROR_MESSAGES } from "../../contents/errorMessages";
import { createNote } from "../../dbActions/crudActions";
import { sendResponse } from "../../utils/utils";

// post controller
export async function createNotePostController(req: Request, res: Response) {
  const { noteTitle, noteTags, noteDescription } = req.body;
  if (!noteTitle || !noteTags || !noteDescription) {
    return sendResponse(res, 300, ERROR_MESSAGES.NOTE_DATA_ERROR);
  } else if (typeof noteTitle !== "string" || typeof noteDescription !== "string" || !Array.isArray(noteTags)) {
    return sendResponse(res, 300, ERROR_MESSAGES.NOTE_DATA_INVALID_ERROR);
  } else if (noteTitle.length < 20 || noteTags.length < 1 || noteDescription.length < 100) {
    return sendResponse(res, 300, ERROR_MESSAGES.NOTE_DATA_LENGTH_ERROR);
  }
  // create the note in store
  const response = await createNote(req.body);
  if (!response) {
    return sendResponse(res, 500, ERROR_MESSAGES.FAILED_ERROR);
  }
  return sendResponse(res, 200, SUCCESS_MESSAGES.NOTE_CREATED);
}
