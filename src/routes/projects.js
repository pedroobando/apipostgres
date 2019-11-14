import { Router } from 'express';
const router = Router();

import { createProject, getProject, getOneProject, deleteProject, updateProject } from '../controllers/project.controller';

// api/projects/
router.post('/', createProject);

router.get('/', getProject);

// /api/projects/:id
router.get('/:id', getOneProject);

router.delete('/:id', deleteProject);

router.put('/:id', updateProject);

export default router;

