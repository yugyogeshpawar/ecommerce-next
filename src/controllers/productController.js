// controllers/productController.js

const Product = require('../models/Products');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    console.log(error);
  }
};
