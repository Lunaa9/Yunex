import { Router } from "express";
import controllers from "../../controllers/index"; // Asegúrate de que la ruta a tus controladores sea correcta

const router = Router();

// Rutas para vehículos
// Rutas para archivos de vehículos
router.post('/add-file/:licensePlate', controllers.vehicleFiles.addFileToVehicleController);
router.get('/get-file/:licensePlate/:fileName', controllers.vehicleFiles.getFileFromVehicleController);
router.get('/get-all-files/:licensePlate', controllers.vehicleFiles.getAllFilesFromVehicleController);
router.put('/vehicles/:licensePlate/files/:fileName', controllers.vehicleFiles.updateVehicleFileController);
router.delete('/delete-file/:licensePlate/:fileName', controllers.vehicleFiles.deleteVehicleFileController);
router.get('/vehicle-files/get-file/:licensePlate/:fileName', controllers.vehicleFiles.downloadFileFromVehicleController);

export { router };                                                                                                                                                                                                                                                     