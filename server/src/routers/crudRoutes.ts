import { Router } from "express";
import { createNotePostController } from "../controllers/crudControllers/createNoteController";
import { allNotesController } from "../controllers/crudControllers/allNotesController";
import { noteFormDataValidate } from "../middleware/noteformDataValidate";

const crudRoutes = Router();

crudRoutes.get("/allnotes", allNotesController);
crudRoutes.post("/createnote", noteFormDataValidate, createNotePostController);

export default crudRoutes;
