require('dotenv').config();

const mongoose = require('mongoose');
const { connectDB } = require('./config/db');
const Product = require('./models/Product');
const { seedProducts } = require('./data/seedProducts');

async function runSeed() {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(seedProducts);
    console.log(`Re-seeded ${seedProducts.length} products`);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

runSeed();
