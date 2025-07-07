import { Router } from "express";
import controllers from "../../controllers/index";

const router = Router();
// Get all vehicles
router.get('/get-all-vehicles', controllers.vehicle.getAllVehicles);

// Create a new vehicle
router.post('/create-vehicle', controllers.vehicle.createVehicle);

// Update an existing vehicle
router.put('/update-vehicle', controllers.vehicle.updateVehicle);

// Delete a vehicle
router.delete('/delete-vehicle', controllers.vehicle.deleteVehicle);

export { router };