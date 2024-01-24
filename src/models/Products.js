// models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: String,
  slug: String,
  shop: {
    id: String,
    slug: String,
    user: {
      id: String,
      email: String,
      phone: String,
      avatar: String,
      password: String,
      dateOfBirth: Date,
      verified: Boolean,
      name: {
        firstName: String,
        lastName: String,
      },
    },
    email: String,
    name: String,
    phone: String,
    address: String,
    verified: Boolean,
    coverPicture: String,
    profilePicture: String,
    socialLinks: {
      facebook: String,
      youtube: String,
      twitter: String,
      instagram: String,
    },
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
  reviews: [{
    // Define the structure for the reviews field
  }],
  rating: Number,
  for: {
    demo: String,
    type: String,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
