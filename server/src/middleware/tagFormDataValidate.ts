import { Request, Response, NextFunction } from "express";
import { ERROR_MESSAGES } from "../contents/errorMessages";
import { isHexColor, sendResponse } from "../utils/utils";

export const tagFormDataValidate = (req: Request, res: Response, next: NextFunction) => {
  const { name, description, icon, color } = req.body;
  if (!name || !description || !icon || !color) {
    return sendResponse(res, 300, ERROR_MESSAGES.TAG_DATA_ERROR);
  } else if (typeof name !== "string" || typeof description !== "string" || !isHexColor(color) || typeof icon !== "string") {
    return sendResponse(res, 300, ERROR_MESSAGES.TAG_DATA_INVALID_ERROR);
  } else if (name.length < 6 || description.length < 50) {
    return sendResponse(res, 300, ERROR_MESSAGES.TAG_DATA_LENGTH_ERROR);
  }
  next();
};
