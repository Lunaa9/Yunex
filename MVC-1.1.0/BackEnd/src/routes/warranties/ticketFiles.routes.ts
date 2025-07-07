import { Router } from "express";
import controllers from "../../controllers/index";

const router = Router();

// post new ticketFile route
router.post("/create-new",controllers.ticketFiles.createTicketFile);

// Get one ticketFile route
router.post("/get",controllers.ticketFiles.getOneTicketFile);

// Get All ticketFile route
router.get("/get-all",controllers.ticketFiles.getAllTicketFile);

// Update ticketFile route
router.put("/update",controllers.ticketFiles.updateTicketFile);

// delete ticketFile route
router.delete("/delete",controllers.ticketFiles.deleteTicketFile);

export { router };