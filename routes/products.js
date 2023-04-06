const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByBarcode,
  updateProduct,
  deleteProduct,
  getProductByKeyword,
  addCommentToProduct,
} = require("../controllers/products");
const authenticate = require("../middlewares/auth");
const productSearch = require("../middlewares/ProductSearch");
router.use(authenticate);
router.get("/search/:keyword", productSearch, getProductByKeyword);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/scan/:barcode", getProductByBarcode);
router.post("/", createProduct);
router.post("/:id/comment", addCommentToProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
