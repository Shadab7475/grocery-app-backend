const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Test Route (optional but useful)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});


module.exports = app;