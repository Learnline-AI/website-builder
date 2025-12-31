// Asset routes
import { Router, type IRouter } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { AssetService } from '@ui-museum/shared';
import { asyncHandler } from '../middleware/async-handler.js';

const router: IRouter = Router();

// Configure multer for file uploads
const UPLOADS_DIR = process.env.UI_MUSEUM_UPLOADS_DIR || path.join(process.cwd(), 'data', 'uploads');

// Ensure uploads directory exists
fs.mkdir(UPLOADS_DIR, { recursive: true }).catch(console.error);

const storage = multer.diskStorage({
  destination: async (req, _file, cb) => {
    const projectId = req.query.projectId as string;
    const projectDir = path.join(UPLOADS_DIR, projectId);
    await fs.mkdir(projectDir, { recursive: true });
    cb(null, projectDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
  },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
      'font/woff', 'font/woff2', 'font/ttf', 'font/otf',
      'application/font-woff', 'application/font-woff2',
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} not allowed`));
    }
  },
});

// GET /api/assets?projectId=xxx - List assets by project
router.get('/', asyncHandler(async (req, res) => {
  const { projectId } = req.query;
  if (!projectId || typeof projectId !== 'string') {
    res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'projectId query parameter required' } });
    return;
  }
  const assets = await AssetService.findByProject(projectId);
  res.json(assets);
}));

// GET /api/assets/:id - Get asset by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const asset = await AssetService.findById(req.params.id);
  if (!asset) {
    res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Asset not found' } });
    return;
  }
  res.json(asset);
}));

// POST /api/assets/upload?projectId=xxx - Upload asset
router.post('/upload', upload.single('file'), asyncHandler(async (req, res) => {
  const { projectId } = req.query;
  if (!projectId || typeof projectId !== 'string') {
    res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'projectId query parameter required' } });
    return;
  }

  if (!req.file) {
    res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'No file uploaded' } });
    return;
  }

  const asset = await AssetService.create(projectId, {
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
    path: `${projectId}/${req.file.filename}`,
  });

  // Broadcast upload
  const io = req.app.get('io');
  io.to(`project:${projectId}`).emit('asset:uploaded', { projectId, assetId: asset.id });

  res.status(201).json(asset);
}));

// DELETE /api/assets/:id - Delete asset
router.delete('/:id', asyncHandler(async (req, res) => {
  const asset = await AssetService.findById(req.params.id);
  if (!asset) {
    res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Asset not found' } });
    return;
  }

  // Delete file from disk
  const filePath = path.join(UPLOADS_DIR, asset.path);
  try {
    await fs.unlink(filePath);
  } catch (e) {
    console.warn(`Failed to delete file ${filePath}:`, e);
  }

  await AssetService.delete(req.params.id);
  res.status(204).send();
}));

// GET /api/assets/file/:projectId/:filename - Serve asset file
router.get('/file/:projectId/:filename', asyncHandler(async (req, res) => {
  const filePath = path.join(UPLOADS_DIR, req.params.projectId, req.params.filename);

  try {
    await fs.access(filePath);
    res.sendFile(filePath);
  } catch {
    res.status(404).json({ error: { code: 'NOT_FOUND', message: 'File not found' } });
  }
}));

export { router as assetRoutes };
