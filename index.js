import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// routes
app.use("/api/products", productRoutes);
app.use("/api/admin", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log("JWT_SECRET:", process.env.JWT_SECRET);

// test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// DB connect (SAFE)
if (!process.env.MONGO_URI) {
  console.log("❌ MONGO_URI missing");
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("DB Error:", err));

export default app;