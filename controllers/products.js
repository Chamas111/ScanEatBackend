const Product = require('../models/Product');

const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('createdBy', 'username email');
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getProductById = async (req, res) => {
  try {
    // const book = await Book.findById(req.params.id)
    const products = await Product.find({ _id: req.params.id }).populate('createdBy', 'username email');
    if (products.length === 0) {
      res.status(404).json({ message: 'products Not Found' });
    }
    res.json(products[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateProduct = async (req, res) => {
  try {
    // const deletedBook = await Book.findByIdAndUpdate(req.params.id);
    const updatedProduct = await Book.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    if (!updatedProduct) {
      res.status(404).json({ message: 'Product Not Found' });
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    // const deletedBook = await Book.findByIdAndDelete(req.params.id);
    const deletedProduct = await Product.findOneAndDelete({ _id: req.params.id });
    if (!deletedProduct) {
      res.status(404).json({ message: 'Product Not Found' });
    }
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
createProduct,
getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
