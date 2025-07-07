import { Router } from "express";
import controllers from "../../controllers/index";

const router = Router();

// create a new assembly model
router.post("/create-new", controllers.assembly.createAssembly);

// get all the assemblies
router.get("/get-all", controllers.assembly.getAllAssemblies);

// get one assembly
router.post("/get", controllers.assembly.getOneAssembly);

// update one assembly
router.put("/update", controllers.assembly.updateAssembly);

// delete one assembly
router.delete("/delete", controllers.assembly.deleteAssembly);

// upload an excel for transform to excel
router.post("/excel",controllers.assembly.uploadExcel);

export { router };