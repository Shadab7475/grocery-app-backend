import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";


export const addProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const stream = cloudinary.uploader.upload_stream(
      { folder: "products" },
      async (error, result) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: error.message,
          });
        }

        const product = await Product.create({
          name: req.body.name,
          brand: req.body.brand,
          description: req.body.description,
          price: req.body.price,
          size: req.body.size,
          category: req.body.category,
          stock: req.body.stock,
          image: result.secure_url,
          public_id: result.public_id,
        });

        return res.status(201).json({
          success: true,
          data: product,
        });
      }
    );

    stream.end(req.file.buffer);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    let product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let updatedData = {
      name: req.body.name || product.name,
      brand: req.body.brand || product.brand,
      description: req.body.description || product.description,
      price: req.body.price || product.price,
      size: req.body.size || product.size,
      category: req.body.category || product.category,
      stock: req.body.stock || product.stock,
    };

   
    if (req.file) {
      if (product.public_id) {
        await cloudinary.uploader.destroy(product.public_id);
      }

      const stream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        async (error, result) => {
          if (error) {
            return res.status(500).json({
              success: false,
              message: error.message,
            });
          }

          updatedData.image = result.secure_url;
          updatedData.public_id = result.public_id;

          const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updatedData,
            { new: true }
          );

          return res.status(200).json({
            success: true,
            data: updatedProduct,
          });
        }
      );

      stream.end(req.file.buffer);
    } else {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );

      return res.status(200).json({
        success: true,
        data: updatedProduct,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.public_id) {
      await cloudinary.uploader.destroy(product.public_id);
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};