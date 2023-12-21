import { Router } from "express";
import { createNotePostController } from "../controllers/crudControllers/createNoteController";

const crudRoutes = Router();

crudRoutes.post("/createnote", createNotePostController);

export default crudRoutes;
