import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./users.js";

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

// create user API
app.post("/api/users", async (req, res) => {
  try {
    const user = new User(req.body);

    const result = await user.save();

    res.status(201).json({
      message: "User created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
});

// get all users API
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      message: "User data fetched successfully",
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
});

// server port
const PORT = process.env.PORT || 5000;

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});