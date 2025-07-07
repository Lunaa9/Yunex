import { Router } from "express";
import controllers from "../../controllers/index";

const router = Router();

// post new warrantyModule route
router.post("/create-new", controllers.modules.createModule);

// Get one warrantyModule route
router.post("/get", controllers.modules.getOneModule);

// Get All warrantyModule route
router.get("/get-all", controllers.modules.getAllModule);

// Update warrantyModule route
router.put("/update", controllers.modules.updateModule);

// delete warrantyModule route
router.delete("/delete", controllers.modules.deleteModule);

// upload data from a excel file
router.post("/uploadXlsx", controllers.modules.excelToJason);

export { router };