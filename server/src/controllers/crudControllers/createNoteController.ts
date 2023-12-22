import { Request, Response } from "express";
import { SUCCESS_MESSAGES } from "../../contents/successMessages";
import { ERROR_MESSAGES } from "../../contents/errorMessages";
import { createNote } from "../../dbActions/crudActions";
import { sendResponse } from "../../utils/utils";

// post controller
export async function createNotePostController(req: Request, res: Response) {
  // create the note in store
  const response = await createNote(req.body);
  if (!response) {
    return sendResponse(res, 500, ERROR_MESSAGES.FAILED_ERROR);
  }
  return sendResponse(res, 200, SUCCESS_MESSAGES.NOTE_CREATED);
}
