import { Router } from 'express';
const router = Router();

import { getTask, getOneTask, getTaskByProject, createTask, deleteTask, updateTask } from '../controllers/task.controller';

router.post('/:projectid',createTask);

router.get('/', getTask);

router.get('/:id', getOneTask);

router.get('/project/:id', getTaskByProject);

router.delete('/:id', deleteTask);

router.put('/:id', updateTask);

export default router;