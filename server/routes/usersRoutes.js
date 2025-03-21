import express from "express";
import { registerUser, loginUser } from "../controllers/usersController.js";

const router = express.Router();

// Register user route
router.post("/", registerUser)

// login user route
router.post("/login", loginUser)

export { router as usersRoutes };