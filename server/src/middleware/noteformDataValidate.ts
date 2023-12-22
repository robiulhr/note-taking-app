import { Request, Response, NextFunction } from "express";
import { ERROR_MESSAGES } from "../contents/errorMessages";
import { sendResponse } from "../utils/utils";

export const noteFormDataValidate = (req: Request, res: Response, next: NextFunction) => {
  const { noteTitle, noteTags, noteDescription } = req.body;
  if (!noteTitle || !noteTags || !noteDescription) {
    return sendResponse(res, 300, ERROR_MESSAGES.NOTE_DATA_ERROR);
  } else if (typeof noteTitle !== "string" || typeof noteDescription !== "string" || !Array.isArray(noteTags)) {
    return sendResponse(res, 300, ERROR_MESSAGES.NOTE_DATA_INVALID_ERROR);
  } else if (noteTitle.length < 20 || noteTags.length < 1 || noteDescription.length < 100) {
    return sendResponse(res, 300, ERROR_MESSAGES.NOTE_DATA_LENGTH_ERROR);
  }
  next();
};
