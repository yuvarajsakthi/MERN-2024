import mongoose from "mongoose";
import Post from "../models/PostModel.js";
import User from "../models/userModel.js";

/*****************GET ALL POST****************/
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: "desc" });
    res.status(200).json({
      posts,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/*****************GET USER'S POST****************/
const getUserPosts = async (req, res) => {
  // Grab authenticated user from request body
  const user = await User.findById(req.user.id);

  try {
    const userPosts = await Post.find({ user: user._id }).sort({
      createdAt: "desc",
    });
    res.status(200).json({
      userPosts,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/*****************CREATE NEW POST****************/

const addPost = async (req, res) => {
  // Grab the data from the request body
  const { title, body } = req.body;

  // Check the field are not empty
  if (!title || !body) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }

  // Grab authenticated user from request body
  const user = await User.findById(req.user.id);

  try {
    const post = await Post.create({
      user: user._id,
      title,
      body,
    });

    res.status(200).json({
      success: "post created",
      post,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/*****************DELETE POST****************/
const deletePost = async (req, res) => {
  // res.send(req.params)

  // Check the ID is valid type
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: "Incorrect ID",
    });
  }

  //   Check the post exists
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(400).json({
      error: "Post not found",
    });
  }

  // Check the user owns the post
  const user = await User.findById(req.user.id);
  if (!post.user.equals(user._id)) {
    return res.status(401).json({
      error: "User not authorized",
    });
  }

  try {
    await post.deleteOne();
    res.status(200).json({
      success: "post deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/*****************UPDATE POST****************/
const updatePost = async (req, res) => {
  // Grab the data from the request body
  const { title, body } = req.body;

  // Check the field are not empty
  if (!title || !body) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }

  // Check the ID is valid type
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      error: "Incorrect ID",
    });
  }

  //   Check the post exists
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(400).json({
      error: "Post not found",
    });
  }

  // Check the user owns the post
  const user = await User.findById(req.user.id);
  if (!post.user.equals(user._id)) {
    return res.status(401).json({
      error: "User not authorized",
    });
  }

  try {
    await post.updateOne({
      title,
      body,
    });
    res.status(200).json({
      success: "post updated",
      post,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export { getPosts, getUserPosts, addPost, deletePost, updatePost };
