import { Router } from "express";
import controllers from "../../controllers/index";

const router = Router();

// post new warrantyTicket route
router.post("/create-new", controllers.warrantyTicket.createWarrantyTicket);

//Get warrantyTickets by their contractNum
router.post("/get-byContract", controllers.warrantyTicket.getTicketByContract);

// Get one warrantyTicket by their serial
router.post("/get-byModule", controllers.warrantyTicket.getTicketByModule);

// Get one warrantyTicket route
router.post("/get", controllers.warrantyTicket.getOneWarrantyTicket);

// Get All warrantyTicket route
router.get("/get-all", controllers.warrantyTicket.getAllWarrantyTicket);

// Update warrantyTicket route
router.put("/update", controllers.warrantyTicket.updateWarrantyTicket);

// A waterfall update
router.put("/waterfall", controllers.warrantyTicket.newModule);

// delete warrantyTicket route
router.delete("/delete", controllers.warrantyTicket.deleteWarrantyTicket);

export { router };