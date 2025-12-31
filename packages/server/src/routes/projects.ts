// Project routes
import { Router, type IRouter } from 'express';
import { ProjectService, CreateProjectSchema, UpdateProjectSchema } from '@ui-museum/shared';
import { asyncHandler } from '../middleware/async-handler.js';
import { validateBody } from '../middleware/validate.js';

const router: IRouter = Router();

// GET /api/projects - List all projects
router.get('/', asyncHandler(async (_req, res) => {
  const projects = await ProjectService.findAll();
  res.json(projects);
}));

// GET /api/projects/:id - Get project by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const project = await ProjectService.findById(req.params.id);
  if (!project) {
    res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Project not found' } });
    return;
  }
  res.json(project);
}));

// POST /api/projects - Create project
router.post('/', validateBody(CreateProjectSchema), asyncHandler(async (req, res) => {
  const project = await ProjectService.create(req.body);
  res.status(201).json(project);
}));

// PATCH /api/projects/:id - Update project
router.patch('/:id', validateBody(UpdateProjectSchema), asyncHandler(async (req, res) => {
  const project = await ProjectService.update(req.params.id, req.body);

  // Broadcast update
  const io = req.app.get('io');
  io.to(`project:${req.params.id}`).emit('project:updated', { projectId: req.params.id });

  res.json(project);
}));

// DELETE /api/projects/:id - Delete project
router.delete('/:id', asyncHandler(async (req, res) => {
  await ProjectService.delete(req.params.id);
  res.status(204).send();
}));

export { router as projectRoutes };
