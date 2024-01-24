// models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: String,
  slug: String,
  shop: {
    // ... (Define the structure for the shop field)
  },
  title: String,
  brand: String,
  price: Number,
  size: String,
  colors: [String],
  discount: Number,
  thumbnail: String,
  images: [String],
  categories: [String],
  status: String,
  reviews: [{ /* Define the structure for the reviews field */ }],
  rating: Number,
  for: {
    demo: String,
    type: String,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
