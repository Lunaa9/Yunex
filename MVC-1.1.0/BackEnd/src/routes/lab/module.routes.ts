import { Router } from "express";
import controllers from "../../controllers/index";

const router = Router();

// Get-all route
router.get("/get-all", controllers.Module.getAllModules);

// Get by email
router.get("/get", controllers.Module.getModule);

// Create route
router.post("/create", controllers.Module.createModule);

// Update route
router.put("/update", controllers.Module.updateModule);

// Delete route
router.delete("/delete", controllers.Module.deleteModule);

export { router };