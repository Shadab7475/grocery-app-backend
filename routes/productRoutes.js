import express from "express"
const router = express.Router(); 


import upload from "../middleware/upload.js"; // ✅ sahi

import { addProduct, getProducts } from "../controllers/productController.js"

// ADD PRODUCT
router.post("/add", upload.single("image"), addProduct);

// GET PRODUCTS
router.get("/", getProducts);

export default router