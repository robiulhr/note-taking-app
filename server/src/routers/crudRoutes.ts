import { Router } from "express";
import { createNotePostController } from "../controllers/crudControllers/createNoteController";
import { allNotesController } from "../controllers/crudControllers/allNotesController";
import { noteFormDataValidate } from "../middleware/noteformDataValidate";
import { singleNoteGetController } from "../controllers/crudControllers/singleNoteController";

const crudRoutes = Router();

crudRoutes.get("/allnotes", allNotesController);
crudRoutes.post("/createnote", noteFormDataValidate, createNotePostController);
crudRoutes.get("/notes/:id", singleNoteGetController);
export default crudRoutes;
