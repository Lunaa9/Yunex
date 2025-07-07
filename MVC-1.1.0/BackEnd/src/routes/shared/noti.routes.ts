import { Router } from "express";
import controllers from "../../controllers/index";

const router = Router();

// Get lab notifications
router.get("/lab-noti", controllers.noti.getLabNoti);

// Get warranty notifications
router.get("/wrrty-noti", controllers.noti.getWarrantyNoti);

export { router };