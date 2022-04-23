import express from 'express';

import { getUsers, getUser, deleteUser, modifyUser, getUsersActivities } from '../controllers/adminController.js';

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser)
router.get('/activities', getUsersActivities);
router.delete('/users/:id', deleteUser);
router.patch('/users/:id/modifyUser', modifyUser);

export default router;