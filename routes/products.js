const express = require('express');
const router = express.Router();
const {
    createProduct,
    getAllProducts,
      getProductById,
      updateProduct,
      deleteProduct,
      getProductByKeyword, 
} = require('../controllers/products');
const authenticate = require('../middlewares/auth');
const productSearch = require("../middlewares/ProductSearch");
router.use(authenticate);
router.get('/search/:keyword', productSearch, getProductByKeyword);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;