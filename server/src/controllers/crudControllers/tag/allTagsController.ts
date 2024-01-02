import { ERROR_MESSAGES } from "../../../contents/errorMessages";
import { SUCCESS_MESSAGES } from "../../../contents/successMessages";
import { Request, Response } from "express";
import { sendResponse } from "../../../utils/utils";
import { readTags } from "../../../dbActions/tagActions";
export const allTagsController = async (req: Request, res: Response): Promise<void> => {
  // create the note in store
  const response = await readTags();
  if (response.data?.length <= 0) {
    return sendResponse(res, 500, ERROR_MESSAGES.ALL_TAGS_READ_ERROR);
  }
  return sendResponse(res, 200, SUCCESS_MESSAGES.ALL_TAGS_READ, response.data);
};
