const express = require('express');
const router = express.Router();
const {
    createProduct,
    getAllProducts,
      getProductById,
      updateProduct,
      deleteProduct,
} = require('../controllers/products');
const authenticate = require('../middlewares/auth');
router.use(authenticate);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;