const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  size: String
});

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;