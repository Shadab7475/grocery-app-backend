const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const { addProduct, getProducts } = require("../controllers/productController");

// ADD PRODUCT
router.post("/add", upload.single("image"), addProduct);

// GET PRODUCTS
router.get("/", getProducts);

module.exports = router;