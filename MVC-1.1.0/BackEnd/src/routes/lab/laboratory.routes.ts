import { Router } from 'express';
import controllers from '../../controllers/index';
//import requireAuth from '../middleware/requireAuth';

const router = Router()

// post new labModel route
router.post("/create-new", controllers.LabModule.createLabModel)

// Get one labModel route
router.get("/get", controllers.LabModule.getOneLabModel);

// Get All labModel route
router.get("/get-all", controllers.LabModule.getAllLabModel);

// Get diagnostic table labModel route
router.get("/get-diagnostic", controllers.LabModule.getFilteredData);

// Update LabModel route
router.put("/update", controllers.LabModule.updateLabModel);

// out Update LabModel route
router.put("/out-update", controllers.LabModule.outupdateLabModel);

// delete LabModel route
router.delete("/delete", controllers.LabModule.deleteLabModel);

export { router };