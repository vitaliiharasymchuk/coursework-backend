import express from 'express';

import auth from '../middleware/auth.js';

import { getUsers } from '../controllers/adminController.js';

const router = express.Router();

router.get('/users', getUsers);

export default router;