const Product = require('../models/Product');

function normalizeProduct(product) {
  const doc = typeof product.toObject === 'function' ? product.toObject() : product;
  delete doc._id;
  return doc;
}

async function getProducts(req, res, next) {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const products = await Product.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ data: products });
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    const product = await Product.findOne({ id: req.params.id }).lean();

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ data: product });
  } catch (error) {
    next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    const payload = req.body ?? {};
    const created = await Product.create({
      ...payload,
      id: payload.id || `p${Date.now()}`,
      status: payload.status || 'pending',
    });

    res.status(201).json({ data: normalizeProduct(created) });
  } catch (error) {
    next(error);
  }
}

async function updateProductStatus(req, res, next) {
  try {
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid product status' });
    }

    const product = await Product.findOneAndUpdate(
      { id: req.params.id },
      { status },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ data: normalizeProduct(product) });
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const product = await Product.findOneAndDelete({ id: req.params.id });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProductStatus,
};
