import { Router } from "express";
import { createNotePostController } from "../controllers/crudControllers/createNoteController";
import { allNotesController } from "../controllers/crudControllers/allNotesController";
import { noteFormDataValidate } from "../middleware/noteformDataValidate";
import { singleNoteGetController } from "../controllers/crudControllers/singleNoteController";
import editNoteController from "../controllers/crudControllers/editNoteController";

const crudRoutes = Router();

crudRoutes.get("/allnotes", allNotesController);
crudRoutes.post("/createnote", noteFormDataValidate, createNotePostController);
crudRoutes.get("/notes/:id", singleNoteGetController);
crudRoutes.put("/notes/edit/:id", noteFormDataValidate, editNoteController);
export default crudRoutes;
