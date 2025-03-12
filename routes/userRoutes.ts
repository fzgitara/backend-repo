import { Router } from 'express';

import { createUser, fetchAllUsers, fetchUserById, updateUserById } from '../controller/api';

const router = Router();

router.post('/create-user-data', createUser);
router.get('/fetch-all-user-data', fetchAllUsers);
router.get('/fetch-user-data/:id', fetchUserById);
router.put('/update-user-data/:id', updateUserById);

export default router;