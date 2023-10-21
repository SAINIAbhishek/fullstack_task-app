import express from 'express';
import AuthRoutes from './AuthRoutes';
import UserRoutes from './UserRoutes';
import TaskRoutes from './TaskRoutes';

const router = express.Router();

router.use('/oauth', AuthRoutes);
router.use('/users', UserRoutes);
router.use('/tasks', TaskRoutes);

export default router;
