// Error handler middleware
import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const requestId = crypto.randomUUID();
  const timestamp = new Date().toISOString();

  console.error(`[Error ${requestId}]`, err);

  // Zod validation errors
  if (err instanceof ZodError) {
    res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid request data',
        details: err.errors,
      },
      timestamp,
      requestId,
    });
    return;
  }

  // Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      res.status(409).json({
        error: {
          code: 'CONFLICT',
          message: 'A record with this value already exists',
          field: (err.meta?.target as string[])?.join(', '),
        },
        timestamp,
        requestId,
      });
      return;
    }

    if (err.code === 'P2025') {
      res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: 'Record not found',
        },
        timestamp,
        requestId,
      });
      return;
    }
  }

  // Multer errors
  if (err.name === 'MulterError') {
    res.status(400).json({
      error: {
        code: 'UPLOAD_ERROR',
        message: err.message,
      },
      timestamp,
      requestId,
    });
    return;
  }

  // Generic error
  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'production'
        ? 'An unexpected error occurred'
        : err.message,
    },
    timestamp,
    requestId,
  });
}
