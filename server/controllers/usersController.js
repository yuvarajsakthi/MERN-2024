import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

/*****************CREATING JWT TOKEN****************/
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "10d" });
};

/*****************REGISTER USER****************/
const registerUser = async (req, res) => {
  // Grab data from the request body
  const { email, password } = req.body;
  // Check the fields are not empty
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check if the email already exists
  const exist = await User.findOne({ email });
  if (exist) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Hash the password
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(password, salt);

  try {
    // Register the user
    const user = await User.create({
      email,
      password: hashed,
    });
    // Create a JsonWebToken
    const token = createToken(user._id);
    // Send the response
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*****************LOGIN USER****************/
const loginUser = async (req, res) => {
  // Grab data from the request body
  const { email, password } = req.body;
  // Check the fields are not empty
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check if the email already exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Incorrect email" });
  }

  // Check if the password is correct
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ error: "Incorrect password" });
  }
  
  try {
    // Create a JsonWebToken
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { registerUser, loginUser };
