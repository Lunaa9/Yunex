import { Router } from "express";
import controllers from "../../controllers/index";

const router = Router();

// create-client route
router.post("/create-contract", controllers.contract.createContract);

// update client route
router.put("/update-contract", controllers.contract.updateContract)

// delete client route
router.delete("/delete-contract", controllers.contract.deleteContract)

// get all clients route
router.get("/get-all-contract", controllers.contract.getAllContract)

// get one client route
router.post("/get-contract", controllers.contract.getContractByClient)

export { router };
