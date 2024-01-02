import { Request, Response } from "express";
import { SUCCESS_MESSAGES } from "../../../contents/successMessages";
import { ERROR_MESSAGES } from "../../../contents/errorMessages";
import { sendResponse } from "../../../utils/utils";
import { createTag } from "../../../dbActions/tagActions";

// post controller
export async function createTagPostController(req: Request, res: Response) {
  // create the note in store
  const response = await createTag(req.body);
  if (!response) {
    return sendResponse(res, 500, ERROR_MESSAGES.FAILED_ERROR);
  }
  return sendResponse(res, 200, SUCCESS_MESSAGES.NOTE_CREATED);
}
