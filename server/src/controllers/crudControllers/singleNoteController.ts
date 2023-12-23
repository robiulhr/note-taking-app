import { Request, Response } from "express";
import { SUCCESS_MESSAGES } from "../../contents/successMessages";
import { ERROR_MESSAGES } from "../../contents/errorMessages";
import { readNotes } from "../../dbActions/crudActions";
import { sendResponse } from "../../utils/utils";

// get controller
export async function singleNoteGetController(req: Request, res: Response) {
  // read the note in store
  const response = await readNotes(req.params.id);
  if (response.data?.length <= 0) {
    return sendResponse(res, 404, ERROR_MESSAGES.NOTE_READ_ERROR);
  }
  return sendResponse(res, 200, SUCCESS_MESSAGES.NOTE_READ, response.data);
}
