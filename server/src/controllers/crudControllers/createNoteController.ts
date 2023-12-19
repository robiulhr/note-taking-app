import { Request, Response } from "express";
import { SUCCESS_MESSAGES } from "@contents/successMessages";
import { ERROR_MESSAGES } from "@contents/errorMessages";

// post controller
export function createNotePostController(req: Request, res: Response) {
  const { noteTitle, noteTags, noteDescription } = req.body;
  if (!noteTitle || !noteTags || !noteDescription) {
    res.json({
      status: 400,
      message: ERROR_MESSAGES.NOTE_DATA_ERROR,
    });
  } else if (typeof noteTitle !== "string" || typeof noteDescription !== "string" || !Array.isArray(noteTags)) {
    res.json({
      status: 400,
      message: ERROR_MESSAGES.NOTE_DATA_INVALID_ERROR,
    });
  } else if (noteTitle.length < 20 || noteTags.length < 1 || noteDescription.length < 100) {
    res.json({
      status: 400,
      message: ERROR_MESSAGES.NOTE_DATA_LENGTH_ERROR,
    });
  }
  console.log(req.body, "here is the req.body");

  res.json({
    status: 200,
    message: SUCCESS_MESSAGES.NOTE_CREATED,
  });
}
