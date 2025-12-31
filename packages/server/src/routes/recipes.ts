// Recipe routes
import { Router, type IRouter } from 'express';
import { RecipeService, CreateRecipeSchema, UpdateRecipeSchema } from '@ui-museum/shared';
import { asyncHandler } from '../middleware/async-handler.js';
import { validateBody } from '../middleware/validate.js';

const router: IRouter = Router();

// GET /api/recipes?projectId=xxx - List recipes by project
router.get('/', asyncHandler(async (req, res) => {
  const { projectId } = req.query;
  if (!projectId || typeof projectId !== 'string') {
    res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'projectId query parameter required' } });
    return;
  }
  const recipes = await RecipeService.findByProject(projectId);
  res.json(recipes);
}));

// GET /api/recipes/:id - Get recipe by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const recipe = await RecipeService.findById(req.params.id);
  if (!recipe) {
    res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Recipe not found' } });
    return;
  }
  res.json(recipe);
}));

// POST /api/recipes?projectId=xxx - Create recipe
router.post('/', validateBody(CreateRecipeSchema), asyncHandler(async (req, res) => {
  const { projectId } = req.query;
  if (!projectId || typeof projectId !== 'string') {
    res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'projectId query parameter required' } });
    return;
  }

  const recipe = await RecipeService.create(projectId, req.body);

  // Broadcast creation
  const io = req.app.get('io');
  io.to(`project:${projectId}`).emit('recipe:created', { projectId, recipeId: recipe.id });

  res.status(201).json(recipe);
}));

// PATCH /api/recipes/:id - Update recipe
router.patch('/:id', validateBody(UpdateRecipeSchema), asyncHandler(async (req, res) => {
  // Get current recipe for projectId
  const current = await RecipeService.findById(req.params.id);
  if (!current) {
    res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Recipe not found' } });
    return;
  }

  const recipe = await RecipeService.update(req.params.id, req.body);

  // Broadcast update
  const io = req.app.get('io');
  io.to(`project:${current.projectId}`).emit('recipe:updated', {
    projectId: current.projectId,
    recipeId: req.params.id
  });

  res.json(recipe);
}));

// DELETE /api/recipes/:id - Delete recipe
router.delete('/:id', asyncHandler(async (req, res) => {
  // Get current recipe for projectId before deletion
  const current = await RecipeService.findById(req.params.id);
  if (!current) {
    res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Recipe not found' } });
    return;
  }

  await RecipeService.delete(req.params.id);

  // Broadcast deletion
  const io = req.app.get('io');
  io.to(`project:${current.projectId}`).emit('recipe:deleted', {
    projectId: current.projectId,
    recipeId: req.params.id
  });

  res.status(204).send();
}));

export { router as recipeRoutes };
