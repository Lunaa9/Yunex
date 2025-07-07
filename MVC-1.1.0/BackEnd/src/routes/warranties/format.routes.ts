import { Router } from "express";
import controllers from "../../controllers/index";

const router = Router();

// post new formatFile route
router.post("/create-new",controllers.formats.createFormatFile);

// Get one formatFile route
router.post("/get",controllers.formats.getOneFormatFile);

// Get All formatFile route
router.get("/get-all",controllers.formats.getAllFormatFile);

// Update formatFile route
router.put("/update",controllers.formats.updateWarrantyProcedure);

// delete formatFile route
router.delete("/delete",controllers.formats.deleteFormatFile);

export { router };