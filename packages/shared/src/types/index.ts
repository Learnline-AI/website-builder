// Shared type definitions for UI Museum
import { z } from 'zod';

// ============================================
// RECIPE CONTENT SCHEMA
// ============================================

export const BlockNodeSchema = z.object({
  id: z.string(),
  type: z.string(),
  props: z.record(z.unknown()).default({}),
  slots: z.record(z.array(z.lazy((): z.ZodType => BlockNodeSchema))).optional(),
});

export type BlockNode = z.infer<typeof BlockNodeSchema>;

export const RecipeContentSchema = z.object({
  root: z.object({
    props: z.record(z.unknown()).default({}),
  }).default({ props: {} }),
  content: z.array(BlockNodeSchema).default([]),
  zones: z.record(z.array(BlockNodeSchema)).optional(),
});

export type RecipeContent = z.infer<typeof RecipeContentSchema>;

// ============================================
// PROJECT SETTINGS SCHEMA
// ============================================

export const ProjectSettingsSchema = z.object({
  theme: z.string().default('default'),
  favicon: z.string().optional(),
  metadata: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }).optional(),
});

export type ProjectSettings = z.infer<typeof ProjectSettingsSchema>;

// ============================================
// API REQUEST/RESPONSE TYPES
// ============================================

// Project
export const CreateProjectSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/),
});

export const UpdateProjectSchema = CreateProjectSchema.partial();

export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>;

// Recipe
export const CreateRecipeSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/),
  content: RecipeContentSchema.optional(),
});

export const UpdateRecipeSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/).optional(),
  content: RecipeContentSchema.optional(),
  isPublished: z.boolean().optional(),
});

export type CreateRecipeInput = z.infer<typeof CreateRecipeSchema>;
export type UpdateRecipeInput = z.infer<typeof UpdateRecipeSchema>;

// ============================================
// WEBSOCKET EVENT TYPES
// ============================================

export type WebSocketEvent =
  | { type: 'recipe:created'; payload: { projectId: string; recipeId: string } }
  | { type: 'recipe:updated'; payload: { projectId: string; recipeId: string } }
  | { type: 'recipe:deleted'; payload: { projectId: string; recipeId: string } }
  | { type: 'project:updated'; payload: { projectId: string } }
  | { type: 'asset:uploaded'; payload: { projectId: string; assetId: string } };

// ============================================
// ERROR TYPES
// ============================================

export interface ApiError {
  error: {
    code: string;
    message: string;
    field?: string;
    details?: unknown;
  };
  timestamp: string;
  requestId: string;
}
