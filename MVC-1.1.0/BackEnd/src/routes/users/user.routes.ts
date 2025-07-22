import controllers from "../../controllers/index";
import express from "express";

const router = express.Router();

// Get-all route
router.get("/get-all", controllers.User.getAllUsers);

// Get by email
router.get("/get", controllers.User.getUser);

// Create route
router.post("/register", controllers.User.createUser);

// Update route
router.put("/update", controllers.User.updateUser);

// Delete route
router.delete("/delete", controllers.User.deleteUser);

// Login route
router.post("/login", controllers.User.loginUser);

// Forgot password
router.post("/forgot-password", controllers.User.forgotPassword);

// Update password route
router.put("/update-password", controllers.User.updatePassword);

// reset password
//router.put('/resetpassword/:resetToken', controllers.User.resetPassword)

export { router };
