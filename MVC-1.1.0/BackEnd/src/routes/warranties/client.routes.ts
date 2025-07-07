import { Router } from "express";
import controllers from "../../controllers/index";

const router = Router();

// create-client route
router.post("/create-client", controllers.client.createClient);

// update client route
router.put("/update-client", controllers.client.updateClient);

// delete client route
router.delete("/delete-client", controllers.client.deleteClient);

// get all clients route
router.get("/get-all-clients", controllers.client.getAllClients);

// get one client route
router.get("/get-client", controllers.client.getClient);

// upload data from a excel file
router.post("/uploadXlsx", controllers.client.excelToJason);

export { router };