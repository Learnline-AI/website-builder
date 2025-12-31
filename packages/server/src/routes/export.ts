/**
 * Export Routes
 *
 * API endpoints for exporting recipes as code.
 */

import { Router, type Router as RouterType } from 'express';
import { ExportService, type RecipeContent } from '@ui-museum/shared';

const router: RouterType = Router();

/**
 * POST /api/export
 * Export a recipe as a zip file
 */
router.post('/', async (req, res) => {
  try {
    const { recipe, options } = req.body;

    if (!recipe || !recipe.content) {
      return res.status(400).json({
        error: {
          code: 'INVALID_RECIPE',
          message: 'Recipe content is required',
        },
      });
    }

    // Convert recipe to RecipeContent format
    const recipeContent: RecipeContent = {
      root: recipe.root || { props: {} },
      content: recipe.content || [],
    };

    // Generate the zip
    const zipBuffer = await ExportService.exportAsZip(recipeContent, {
      format: options?.format || 'react-tailwind',
      theme: options?.theme || 'default',
      includeTheme: options?.includeTheme ?? true,
      projectName: options?.projectName || 'UI Museum Export',
      recipeName: options?.recipeName || 'page',
    });

    // Set headers for zip download
    const filename = `${options?.recipeName || 'export'}-${options?.theme || 'default'}.zip`;
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', zipBuffer.length);

    return res.send(zipBuffer);
  } catch (error) {
    console.error('Export error:', error);
    return res.status(500).json({
      error: {
        code: 'EXPORT_FAILED',
        message: error instanceof Error ? error.message : 'Export failed',
      },
    });
  }
});

/**
 * GET /api/export/formats
 * List available export formats and themes
 */
router.get('/formats', (_req, res) => {
  const formats = [
    { id: 'react-tailwind', name: 'React + Tailwind', description: 'Vite-based React project with Tailwind CSS' },
    { id: 'html-css', name: 'HTML + CSS', description: 'Static HTML files (coming soon)', available: false },
    { id: 'next-app', name: 'Next.js App', description: 'Next.js app router project (coming soon)', available: false },
  ];

  const themes = ExportService.getAvailableThemes();

  return res.json({
    formats,
    themes,
    defaultFormat: 'react-tailwind',
    defaultTheme: 'default',
  });
});

export default router;
