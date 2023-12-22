import { ERROR_MESSAGES } from "../../contents/errorMessages";
import { SUCCESS_MESSAGES } from "../../contents/successMessages";
import { readAllNotes } from "../../dbActions/crudActions";
import { Request, Response } from "express";
import { sendResponse } from "../../utils/utils";
export const allNotesController = async (req: Request, res: Response): Promise<void> => {
  // create the note in store
  const response = await readAllNotes();
  if (!response.data) {
    return sendResponse(res, 500, ERROR_MESSAGES.ALL_NOTES_READ_ERROR);
  }
  return sendResponse(res, 200, SUCCESS_MESSAGES.ALL_NOTES_READ, response.data);
};
