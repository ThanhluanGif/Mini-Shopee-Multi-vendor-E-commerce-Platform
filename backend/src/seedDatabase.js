const Product = require('./models/Product');
const { seedProducts } = require('./data/seedProducts');

async function seedProductsIfEmpty() {
  const existingProducts = await Product.countDocuments();

  if (existingProducts > 0) {
    return;
  }

  await Product.insertMany(seedProducts);
  console.log(`Seeded ${seedProducts.length} products`);
}

module.exports = { seedProductsIfEmpty };
