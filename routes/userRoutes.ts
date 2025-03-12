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
import { isUserSignedIn } from '../middleware/authMiddleware';

const router = Router();

router.post('/create-user-data', isUserSignedIn, createUser);
router.get('/fetch-all-user-data', isUserSignedIn, fetchAllUsers);
router.get('/fetch-user-data/:id', isUserSignedIn, fetchUserById);
router.put('/update-user-data/:id', isUserSignedIn, updateUserById);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;