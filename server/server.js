import express from "express";
import mongoose from "mongoose";

import { postsRoutes } from "./routes/postsRoutes.js";
import { usersRoutes } from "./routes/usersRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

// Resolving dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();

// Middleware to receive JSON
app.use(express.json());

// Adding API end-points and the routes handlers
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

// Use the client app
app.use(express.static(path.join(__dirname, "/client/dist")));

// Render client for any path
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/client/dist/index.html')))

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.DB_URI, {
    dbName: "demo_db",
  })
  .then((client) => {
    console.log("connected to DB succesfuly");

    // Listening to requests if DB connection is successful
    app.listen(4000, "localhost", () => {
      console.log("listening on port 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
