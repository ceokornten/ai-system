import express from 'express';
import { listUsers, setRole } from '../controllers/adminController.js';
import { auth, admin } from '../middleware/auth.js';

const router = express.Router();
router.get('/users', auth, admin, listUsers);
router.put('/users/:id/role', auth, admin, setRole);
export default router;
