import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';

import authRoutes from './routes/auth.js';
import queryRoutes from './routes/query.js';
import searchRoutes from './routes/search.js';
import adminRoutes from './routes/admin.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

await connectDB(process.env.MONGODB_URI);

app.use('/api/auth', authRoutes);
app.use('/api/query', queryRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
