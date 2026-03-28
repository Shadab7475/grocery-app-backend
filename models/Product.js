import mongoose from "mongoose"

const productSchema = new mongoose.Schema({

 name: String,
 brand: String,
 description: String,
 price: Number,
 size: String,
 category: String,
 stock: Number,
 image: String

});

export default mongoose.model("Product", productSchema);