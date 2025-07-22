import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import { loadRoutes } from "./routes";
import db from "./config/mongo";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

// Gets the port from env
const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use(json());
app.use(fileUpload());

const startServer = async () => {
  await db().then(() => console.log("Connected to Database"));

  const router = await loadRoutes(); // 👈 Espera las rutas dinámicas
  app.use("/", router);              // 👈 Usa el router correctamente

  app.listen(PORT, () => {
    console.log(`✅ Server started on port ${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("❌ Error starting server:", err);
});
