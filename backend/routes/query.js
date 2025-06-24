import express from 'express';
import { createQuery, listQueries } from '../controllers/queryController.js';
import { auth } from '../middleware/auth.js';
import { aiRateLimiter } from '../middleware/rateLimit.js';

const router = express.Router();
router.post('/', auth, aiRateLimiter(), createQuery);
router.get('/', auth, listQueries);
export default router;
