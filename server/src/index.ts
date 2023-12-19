//Importing project dependancies that we installed earlier
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

//Importing .env validation
import validateEnv from "@utils/validateEnv";

//App Varaibles
dotenv.config();

validateEnv();

//intializing the express app
const app = express();

//using the dependancies
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//exporting app
export default app;
