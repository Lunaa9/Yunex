import { Router } from "express";
import controllers from "../../controllers/index";

const router = Router();

// Get-all route
router.get("/get-all", controllers.Equipment.getAllEquipments);

// Get by email
router.get("/get", controllers.Equipment.getEquipment);

// Create route
router.post("/create", controllers.Equipment.createEquipment);

// Update route
router.put("/update", controllers.Equipment.updateEquipment);

// Delete route
router.delete("/delete", controllers.Equipment.deleteEquipment);

// Add module route
router.post("/add-module", controllers.Equipment.addModule);

// Remove module route
router.delete("/remove-module", controllers.Equipment.removeModule);

export { router };