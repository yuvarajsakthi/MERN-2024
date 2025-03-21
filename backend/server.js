import express from "express";
import { postsRoutes } from "./routes/postsRoutes.js";
import { usersRoutes } from "./routes/usersRoutes.js";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

mongoose
  .connect(process.env.DB_URI, {
    dbName: "demo_db",
  })
  .then((client) => {
    console.log("connected");
    app.listen(4000, "localhost", () => {
      console.log("listening on port 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
