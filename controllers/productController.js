import Product from "../models/Product.js"
import cloudinary from "../config/cloudinary.js";

export const addProduct = async (req, res) => {

 try {

  const stream = cloudinary.uploader.upload_stream(
   { folder: "products" },

   async (error, result) => {

    if (error) {
     return res.json({
      success:false,
      message:error.message
     });
    }

    const product = new Product({

     name: req.body.name,
     brand: req.body.brand,
     description: req.body.description,
     price: req.body.price,
     size: req.body.size,
     category: req.body.category,
     stock: req.body.stock,
     image: result.secure_url

    });

    await product.save();

    res.json({
     success:true,
     data:product
    });

   }
  );

  stream.end(req.file.buffer);

 } catch (error) {

  res.json({
   success:false,
   message:error.message
  });

 }

};




// GET PRODUCTS
export const getProducts = async (req, res) => {

 try {

  const products = await Product.find();

  res.json({
   success: true,
   data: products
  });

 } catch (error) {

  res.json({
   success: false,
   message: error.message
  });

 }

};