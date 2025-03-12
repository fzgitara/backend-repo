import { Router } from 'express';

import { createUser, fetchAllUsers } from '../controller/api';

const router = Router();

router.post('/create-user-data', createUser);
router.get('/fetch-user-data', fetchAllUsers);

export default router;