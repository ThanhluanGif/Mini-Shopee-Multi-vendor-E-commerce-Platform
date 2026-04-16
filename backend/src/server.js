require('dotenv').config();

const app = require('./app');
const { connectDB } = require('./config/db');
const { seedProductsIfEmpty } = require('./seedDatabase');

const port = Number(process.env.PORT) || 5000;

async function startServer() {
  try {
    await connectDB();
    await seedProductsIfEmpty();

    app.listen(port, () => {
      console.log(`Backend API running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start backend server');
    console.error(error);
    process.exit(1);
  }
}

startServer();
