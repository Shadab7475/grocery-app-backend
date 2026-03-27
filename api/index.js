import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// routes use karo (example)
import productRoutes from "./routes/productRoutes.js";
app.use("/api/products", productRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

// ❌ IMPORTANT: ye hata do
// app.listen(5000);

export default app;