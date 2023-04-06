const Product = require("../models/Product");
const {updateUserHistory} = require("./Users");

const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create({ ...req.body });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductByKeyword = async (req, res) => {
  res.json(req.reqUser);
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getProductById = async (req, res) => {
  try {
    // const book = await Book.findById(req.params.id)
    const products = await Product.find({ _id: req.params.id });
    if (products.length === 0) {
      res.status(404).json({ message: "products Not Found" });
    }
    res.json(products[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getProductByBarcode = async (req, res) => {
  try {
    const product = await Product.findOne({ barcode: req.params.barcode });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    updateUserHistory(req.user._id , product._id);
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
const addCommentToProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const comment = req.body.comment;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.comment.push(comment);
    await product.save();

    res.status(200).json({
      message: "Comment added successfully",
      comment: product.comment,
    });
  } catch (error) {
    console.error("Error adding comment to product:", error);
    res.status(500).json({ message: "Error adding comment to product" });
  }
};
const updateProduct = async (req, res) => {
  try {
    // const deletedBook = await Book.findByIdAndUpdate(req.params.id);
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (!updatedProduct) {
      res.status(404).json({ message: "Product Not Found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    // const deletedBook = await Book.findByIdAndDelete(req.params.id);
    const deletedProduct = await Product.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletedProduct) {
      res.status(404).json({ message: "Product Not Found" });
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
  getProductByBarcode,
  updateProduct,
  deleteProduct,
  getProductByKeyword,
  addCommentToProduct,
  
};
