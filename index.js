import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

import lineWebhookRouter from './routes/lineWebhook.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
connectDB(process.env.MONGODB_URI).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use('/webhook', lineWebhookRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});