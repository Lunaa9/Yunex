import { Router } from "express";
import controllers from "../../controllers/index";

const router = Router();

// post new warrantyProcedure route
router.post("/create-new",controllers.warrantyProcedure.createWarrantyProcedure);

// Get one warrantyProcedure route
router.post("/get",controllers.warrantyProcedure.getOneWarrantyProcedure);

// Get All warrantyProcedure route
router.get("/get-all",controllers.warrantyProcedure.getAllWarrantyProcedure);

// Update warrantyProcedure route
router.put("/update",controllers.warrantyProcedure.updateWarrantyProcedure);

// delete warrantyProcedure route
router.delete("/delete",controllers.warrantyProcedure.deleteWarrantyProcedure);

export { router };