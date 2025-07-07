import { Router } from "express";
import controllers from "../../controllers/index";

const router = Router();

// get the ids for the lab charts
router.post("/get-ids", controllers.chartsLab.getIdentifiers);

// get an object with the info for incidence charts
router.post("/incidences", controllers.chartsLab.getIncidences);

// get an object with the info for assembly charts
router.post("/assemblies", controllers.chartsLab.getAssemblies);

export { router };