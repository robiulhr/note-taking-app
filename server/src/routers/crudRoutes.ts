import { Router } from "express";
import { createNoteGetController, createNotePostController } from "../controllers/crudControllers/createNoteController";

const crudRoutes = Router();

crudRoutes.get("/createnote", createNoteGetController);
crudRoutes.post("/createnote", createNotePostController);

export default crudRoutes;
