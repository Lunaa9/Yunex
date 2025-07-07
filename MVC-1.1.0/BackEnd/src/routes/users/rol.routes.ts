import { Router } from "express";
import controllers from "../../controllers/index";

const router = Router();

// Get-all route
router.get("/get-all", controllers.Rol.getAllRoles);

// Get by email
router.get("/get", controllers.Rol.getRol);

// Create route
router.post("/create", controllers.Rol.createRol);

// Update route
router.put("/update", controllers.Rol.updateRol);

// Delete route
router.delete("/delete", controllers.Rol.deleteRol);

export { router };
