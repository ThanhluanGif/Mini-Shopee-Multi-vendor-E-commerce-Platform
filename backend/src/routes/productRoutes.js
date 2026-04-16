const express = require('express');
const {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProductStatus,
} = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.patch('/:id/status', updateProductStatus);
router.delete('/:id', deleteProduct);

module.exports = router;
