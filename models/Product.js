const mongoose = require("mongoose");

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

module.exports = mongoose.model("Product", productSchema);