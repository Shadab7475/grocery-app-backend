// import express from "express"
// const router = express.Router(); 


// import upload from "../middleware/upload.js"; 

// import { addProduct, getProducts } from "../controllers/productController.js"


// router.post("/add", upload.single("image"), addProduct);


// router.get("/", getProducts);

// export default router


// export default routerfjfjffj



import express from "express";
const router = express.Router();

import upload from "../middleware/upload.js";
import { 
  addProduct, 
  getProducts, 
  updateProduct, 
  deleteProduct 
} from "../controllers/productController.js";


router.post("/add", upload.single("image"), addProduct);


router.get("/", getProducts);


router.put("/:id", upload.single("image"), updateProduct);


router.delete("/:id", deleteProduct);

export default router;