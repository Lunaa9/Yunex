import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import { router } from "./routes";
import db from "./config/mongo";
import bodyParser from 'body-parser';
import fileUpload from "express-fileupload";

// Gets the port from env
const PORT = process.env.PORT || 3001;
// Initialices the express app
const app = express();

app.use(bodyParser.json({ limit: '50mb' })); 

app.use(cors());
app.use(json());
app.use(fileUpload());
db().then(() => console.log("Connected to Database"));
app.use(router);
app.listen(PORT, () => {
  console.log("Server started", process.env.PORT);
});
