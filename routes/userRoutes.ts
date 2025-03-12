import { Router } from 'express';

import {
  createUser,
  fetchAllUsers,
  fetchUserById,
  updateUserById,
  register,
  login,
  logout
} from '../controller/api';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/create-user-data', verifyToken, createUser);
router.get('/fetch-all-user-data', verifyToken, fetchAllUsers);
router.get('/fetch-user-data/:id', verifyToken, fetchUserById);
router.put('/update-user-data/:id', verifyToken, updateUserById);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;