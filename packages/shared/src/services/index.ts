// Service layer for UI Museum
// These services are used by both the server and MCP packages

import type { Prisma } from '@prisma/client';
import { prisma } from '../prisma/index.js';
import type { CreateProjectInput, UpdateProjectInput, CreateRecipeInput, UpdateRecipeInput } from '../types/index.js';

// Re-export ExportService
export { ExportService, type ExportOptions, type ExportResult, type ExportFile, type ExportFormat } from './export.js';

// ============================================
// PROJECT SERVICE
// ============================================

export const ProjectService = {
  async findAll() {
    return prisma.project.findMany({
      orderBy: { updatedAt: 'desc' },
    });
  },

  async findById(id: string) {
    return prisma.project.findUnique({
      where: { id },
      include: {
        recipes: {
          orderBy: { updatedAt: 'desc' },
        },
        assets: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  },

  async findBySlug(slug: string) {
    return prisma.project.findUnique({
      where: { slug },
      include: {
        recipes: {
          orderBy: { updatedAt: 'desc' },
        },
      },
    });
  },

  async create(data: CreateProjectInput) {
    return prisma.project.create({
      data,
    });
  },

  async update(id: string, data: UpdateProjectInput) {
    return prisma.project.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return prisma.project.delete({
      where: { id },
    });
  },
};

// ============================================
// RECIPE SERVICE
// ============================================

export const RecipeService = {
  async findByProject(projectId: string) {
    return prisma.recipe.findMany({
      where: { projectId },
      orderBy: { updatedAt: 'desc' },
    });
  },

  async findById(id: string) {
    return prisma.recipe.findUnique({
      where: { id },
    });
  },

  async findBySlug(projectId: string, slug: string) {
    return prisma.recipe.findUnique({
      where: {
        projectId_slug: { projectId, slug },
      },
    });
  },

  async create(projectId: string, data: CreateRecipeInput) {
    const defaultContent = { root: { props: {} }, content: [] };
    return prisma.recipe.create({
      data: {
        ...data,
        projectId,
        content: (data.content ?? defaultContent) as Prisma.InputJsonValue,
      },
    });
  },

  async update(id: string, data: UpdateRecipeInput) {
    // Increment version on content change
    const updateData: Record<string, unknown> = { ...data };
    if (data.content) {
      const current = await prisma.recipe.findUnique({ where: { id } });
      if (current) {
        updateData.version = current.version + 1;
      }
    }

    return prisma.recipe.update({
      where: { id },
      data: updateData,
    });
  },

  async delete(id: string) {
    return prisma.recipe.delete({
      where: { id },
    });
  },
};

// ============================================
// ASSET SERVICE
// ============================================

export const AssetService = {
  async findByProject(projectId: string) {
    return prisma.asset.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
    });
  },

  async findById(id: string) {
    return prisma.asset.findUnique({
      where: { id },
    });
  },

  async create(projectId: string, data: {
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    path: string;
    width?: number;
    height?: number;
    alt?: string;
  }) {
    return prisma.asset.create({
      data: {
        ...data,
        projectId,
      },
    });
  },

  async update(id: string, data: { alt?: string }) {
    return prisma.asset.update({
      where: { id },
      data,
    });
  },

  async delete(id: string) {
    return prisma.asset.delete({
      where: { id },
    });
  },
};
