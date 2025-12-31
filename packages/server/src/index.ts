// UI Museum Server
// Express + Socket.io + Vite middleware

import 'dotenv/config';
import express, { type Express } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { projectRoutes } from './routes/projects.js';
import { recipeRoutes } from './routes/recipes.js';
import { assetRoutes } from './routes/assets.js';
import exportRoutes from './routes/export.js';
import { chatRoutes } from './routes/chat.js';
import { errorHandler } from './middleware/error-handler.js';
import { requestLogger } from './middleware/request-logger.js';
import type { WebSocketEvent } from '@ui-museum/shared';

const app: Express = express();
const httpServer = createServer(app);

// Socket.io setup
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5180',
    methods: ['GET', 'POST'],
  },
});

// Make io available to routes
app.set('io', io);

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5180',
}));
app.use(express.json());
app.use(requestLogger);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/chat', chatRoutes);

// Error handler (must be last)
app.use(errorHandler);

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`[WebSocket] Client connected: ${socket.id}`);

  // Join project room for targeted updates
  socket.on('join:project', (projectId: string) => {
    socket.join(`project:${projectId}`);
    console.log(`[WebSocket] ${socket.id} joined project:${projectId}`);
  });

  socket.on('leave:project', (projectId: string) => {
    socket.leave(`project:${projectId}`);
    console.log(`[WebSocket] ${socket.id} left project:${projectId}`);
  });

  socket.on('disconnect', () => {
    console.log(`[WebSocket] Client disconnected: ${socket.id}`);
  });
});

// Helper to broadcast events
export function broadcast(event: WebSocketEvent) {
  if (event.type.startsWith('recipe:') || event.type === 'asset:uploaded') {
    io.to(`project:${event.payload.projectId}`).emit(event.type, event.payload);
  } else {
    io.emit(event.type, event.payload);
  }
}

// Start server
const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                   UI Museum Server                          ║
╠════════════════════════════════════════════════════════════╣
║  API:       http://localhost:${PORT}/api                       ║
║  WebSocket: ws://localhost:${PORT}                             ║
║  Health:    http://localhost:${PORT}/api/health                ║
╚════════════════════════════════════════════════════════════╝
  `);
});

export { app, io };
