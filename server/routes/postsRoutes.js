import express from "express";
import {
  addPost,
  deletePost,
  getPosts,
  getUserPosts,
  updatePost,
} from "../controllers/postsController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Get all posts route
router.get("/", getPosts);

// Get all posts route
router.get("/user", auth, getUserPosts);

// Add all posts route
router.post("/", auth, addPost);

// Delete all posts route
router.delete("/:id", auth, deletePost);

// Update posts route
router.put("/:id", auth, updatePost);

export { router as postsRoutes };
