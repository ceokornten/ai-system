import express from 'express';
import { searchDocuments } from '../controllers/searchController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();
router.get('/', auth, searchDocuments);
export default router;
