import { Router } from "express";
import controllers from "../../controllers/index";

const router = Router();

// search everything in warranty
router.post("/search", controllers.charts.searchAll);

// get all data
router.post("/get-all", controllers.charts.getAllData);

// get client data
router.post("/get-cli", controllers.charts.getClientData);

// get contract data
router.post("/get-contr", controllers.charts.getContractData);

// get module data
router.post("/get-modl", controllers.charts.getModuleData);

export { router };