import { Router } from "express";
import createNoteController from "../controllers/crudControllers/createNoteController";

const crudRoutes = Router();

crudRoutes.get("/createnote", (req, res) => {
  res.send("welcome to the createnote page.");
});

export default crudRoutes;
