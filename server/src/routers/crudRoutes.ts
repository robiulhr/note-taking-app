import { Router } from "express";
import { createNotePostController } from "../controllers/crudControllers/createNoteController";
import { allNotesController } from "../controllers/crudControllers/allNotesController";
import { noteFormDataValidate } from "../middleware/noteformDataValidate";
import { singleNoteGetController } from "../controllers/crudControllers/singleNoteController";
import editNoteController from "../controllers/crudControllers/editNoteController";
import deleteNoteController from "../controllers/crudControllers/deleteNoteController";
import { createTagPostController } from "../controllers/crudControllers/tag/createTagController";
import { tagFormDataValidate } from "../middleware/tagFormDataValidate";

const crudRoutes = Router();

// notes routes
crudRoutes.get("/allnotes", allNotesController);
crudRoutes.post("/createnote", noteFormDataValidate, createNotePostController);
crudRoutes.get("/notes/:id", singleNoteGetController);
crudRoutes.put("/notes/edit/:id", noteFormDataValidate, editNoteController);
crudRoutes.delete("/notes/delete/:id", deleteNoteController);

// tag routes
crudRoutes.post("/createtag", tagFormDataValidate, createTagPostController);
export default crudRoutes;
