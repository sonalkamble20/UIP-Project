require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

// Enable CORS
app.use(cors());

// JSON middleware
app.use(express.json());

// Routes
const userRoutes = require("./server/routes/user");
const postRoutes = require("./server/routes/post");
const activityRoutes = require("./server/routes/activity");

// DB connection
mongoose.connect(process.env.dbURL)
  .then(() => console.log("DB Connected!!"))
  .catch(error => console.log("MongoDB connection error:", error));

// Static files
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public", "index.html")));

// API routes
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/activity", activityRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));