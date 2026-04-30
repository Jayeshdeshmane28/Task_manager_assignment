import { Router } from 'express';
import { body } from 'express-validator';
import { getTasks, createTask, markCompleted, deleteTask } from '../controllers/task.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getTasks);

router.post('/', [
  body('title').trim().notEmpty().withMessage('Title is required'),
], createTask);

router.patch('/:id', markCompleted);

router.delete('/:id', deleteTask);

export default router;
