import { Request, Response } from "express";
export default function createNoteController(req: Request, res: Response) {
  console.log(req);
  res.send("hello from the createnote route");
}
