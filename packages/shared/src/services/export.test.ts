/**
 * ExportService Tests
 */

import { describe, it, expect } from 'vitest';
import { ExportService } from './export.js';
import type { RecipeContent } from '../types/index.js';

// Sample recipe for testing
const sampleRecipe: RecipeContent = {
  root: { props: {} },
  content: [
    { id: 'block-1', type: 'hero-centered', props: { title: 'Test Title', subtitle: 'Test Subtitle' } },
    { id: 'block-2', type: 'feature-grid', props: { heading: 'Features' } },
    { id: 'block-3', type: 'pricing-table', props: {} },
    { id: 'block-4', type: 'cta-banner', props: { title: 'Get Started' } },
  ],
};

const defaultOptions = {
  format: 'react-tailwind' as const,
  theme: 'default',
  includeTheme: true,
  projectName: 'Test Project',
  recipeName: 'Test Recipe',
};

describe('ExportService', () => {
  describe('getAvailableThemes', () => {
    it('should return all available themes', () => {
      const themes = ExportService.getAvailableThemes();

      expect(themes).toContain('default');
      expect(themes).toContain('dark');
      expect(themes).toContain('brutal');
      expect(themes).toContain('neon');
      expect(themes).toContain('cosmic');
      expect(themes).toContain('glass');
      expect(themes.length).toBe(6);
    });
  });

  describe('getThemeCSS', () => {
    it('should return CSS for a valid theme', () => {
      const css = ExportService.getThemeCSS('dark');

      expect(css).toContain(':root');
      expect(css).toContain('--color-primary');
      expect(css).toContain('--color-background');
    });

    it('should return default CSS for invalid theme', () => {
      const css = ExportService.getThemeCSS('nonexistent');
      const defaultCss = ExportService.getThemeCSS('default');

      expect(css).toBe(defaultCss);
    });
  });

  describe('exportRecipe - React Tailwind', () => {
    it('should generate correct file structure', async () => {
      const result = await ExportService.exportRecipe(sampleRecipe, defaultOptions);

      const filePaths = result.files.map(f => f.path);

      // Check for essential files
      expect(filePaths).toContain('package.json');
      expect(filePaths).toContain('vite.config.ts');
      expect(filePaths).toContain('tsconfig.json');
      expect(filePaths).toContain('tailwind.config.js');
      expect(filePaths).toContain('postcss.config.js');
      expect(filePaths).toContain('index.html');
      expect(filePaths).toContain('main.tsx');
      expect(filePaths).toContain('pages/index.tsx');
      expect(filePaths).toContain('styles/globals.css');
      expect(filePaths).toContain('styles/theme.css');
      expect(filePaths).toContain('README.md');
    });

    it('should generate component files for each recipe block', async () => {
      const result = await ExportService.exportRecipe(sampleRecipe, defaultOptions);

      const filePaths = result.files.map(f => f.path);

      expect(filePaths).toContain('components/HeroCentered.tsx');
      expect(filePaths).toContain('components/FeatureGrid.tsx');
      expect(filePaths).toContain('components/PricingTable.tsx');
      expect(filePaths).toContain('components/CtaBanner.tsx');
      expect(filePaths).toContain('components/index.ts');
    });

    it('should generate valid package.json', async () => {
      const result = await ExportService.exportRecipe(sampleRecipe, defaultOptions);

      const packageJsonFile = result.files.find(f => f.path === 'package.json');
      expect(packageJsonFile).toBeDefined();

      const packageJson = JSON.parse(packageJsonFile!.content);

      expect(packageJson.name).toBe('test-project');
      expect(packageJson.dependencies.react).toBeDefined();
      expect(packageJson.dependencies['react-dom']).toBeDefined();
      expect(packageJson.devDependencies.tailwindcss).toBeDefined();
      expect(packageJson.devDependencies.vite).toBeDefined();
      expect(packageJson.scripts.dev).toBe('vite');
    });

    it('should not include theme file when includeTheme is false', async () => {
      const result = await ExportService.exportRecipe(sampleRecipe, {
        ...defaultOptions,
        includeTheme: false,
      });

      const filePaths = result.files.map(f => f.path);

      expect(filePaths).not.toContain('styles/theme.css');
    });

    it('should use correct theme CSS', async () => {
      const result = await ExportService.exportRecipe(sampleRecipe, {
        ...defaultOptions,
        theme: 'neon',
      });

      const themeFile = result.files.find(f => f.path === 'styles/theme.css');
      expect(themeFile).toBeDefined();
      expect(themeFile!.content).toContain('Neon');
    });
  });

  describe('exportRecipe - HTML CSS', () => {
    it('should generate correct file structure', async () => {
      const result = await ExportService.exportRecipe(sampleRecipe, {
        ...defaultOptions,
        format: 'html-css',
      });

      const filePaths = result.files.map(f => f.path);

      expect(filePaths).toContain('index.html');
      expect(filePaths).toContain('css/styles.css');
      expect(filePaths).toContain('css/theme.css');
      expect(filePaths).toContain('README.md');

      // Should NOT have React/build files
      expect(filePaths).not.toContain('package.json');
      expect(filePaths).not.toContain('vite.config.ts');
    });

    it('should generate valid HTML with all sections', async () => {
      const result = await ExportService.exportRecipe(sampleRecipe, {
        ...defaultOptions,
        format: 'html-css',
      });

      const htmlFile = result.files.find(f => f.path === 'index.html');
      expect(htmlFile).toBeDefined();

      const html = htmlFile!.content;

      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('<html lang="en">');
      expect(html).toContain('class="hero-centered"');
      expect(html).toContain('class="feature-grid"');
      expect(html).toContain('class="pricing-table"');
      expect(html).toContain('class="cta-banner"');
      expect(html).toContain('Test Title');
    });

    it('should generate comprehensive CSS', async () => {
      const result = await ExportService.exportRecipe(sampleRecipe, {
        ...defaultOptions,
        format: 'html-css',
      });

      const cssFile = result.files.find(f => f.path === 'css/styles.css');
      expect(cssFile).toBeDefined();

      const css = cssFile!.content;

      expect(css).toContain('.container');
      expect(css).toContain('.btn');
      expect(css).toContain('.hero-centered');
      expect(css).toContain('.feature-grid');
      expect(css).toContain('.pricing-table');
      expect(css).toContain('@media');
    });
  });

  describe('exportRecipe - Next.js App', () => {
    it('should generate correct file structure', async () => {
      const result = await ExportService.exportRecipe(sampleRecipe, {
        ...defaultOptions,
        format: 'next-app',
      });

      const filePaths = result.files.map(f => f.path);

      // App Router structure
      expect(filePaths).toContain('app/layout.tsx');
      expect(filePaths).toContain('app/page.tsx');
      expect(filePaths).toContain('app/globals.css');

      // Config files
      expect(filePaths).toContain('package.json');
      expect(filePaths).toContain('next.config.js');
      expect(filePaths).toContain('tsconfig.json');
      expect(filePaths).toContain('tailwind.config.ts');
      expect(filePaths).toContain('postcss.config.js');
      expect(filePaths).toContain('.gitignore');
      expect(filePaths).toContain('next-env.d.ts');

      // Components
      expect(filePaths).toContain('components/index.ts');
    });

    it('should generate valid Next.js package.json', async () => {
      const result = await ExportService.exportRecipe(sampleRecipe, {
        ...defaultOptions,
        format: 'next-app',
      });

      const packageJsonFile = result.files.find(f => f.path === 'package.json');
      const packageJson = JSON.parse(packageJsonFile!.content);

      expect(packageJson.dependencies.next).toBeDefined();
      expect(packageJson.scripts.dev).toBe('next dev');
      expect(packageJson.scripts.build).toBe('next build');
      expect(packageJson.scripts.start).toBe('next start');
    });

    it('should generate App Router layout with metadata', async () => {
      const result = await ExportService.exportRecipe(sampleRecipe, {
        ...defaultOptions,
        format: 'next-app',
      });

      const layoutFile = result.files.find(f => f.path === 'app/layout.tsx');
      expect(layoutFile).toBeDefined();

      const layout = layoutFile!.content;

      expect(layout).toContain("import type { Metadata }");
      expect(layout).toContain('export const metadata: Metadata');
      expect(layout).toContain('Test Recipe');
      expect(layout).toContain('export default function RootLayout');
    });

    it('should use @/ path alias in imports', async () => {
      const result = await ExportService.exportRecipe(sampleRecipe, {
        ...defaultOptions,
        format: 'next-app',
      });

      const pageFile = result.files.find(f => f.path === 'app/page.tsx');
      expect(pageFile).toBeDefined();
      expect(pageFile!.content).toContain("from '@/components'");
    });

    it('should configure path alias in tsconfig', async () => {
      const result = await ExportService.exportRecipe(sampleRecipe, {
        ...defaultOptions,
        format: 'next-app',
      });

      const tsconfigFile = result.files.find(f => f.path === 'tsconfig.json');
      const tsconfig = JSON.parse(tsconfigFile!.content);

      expect(tsconfig.compilerOptions.paths).toBeDefined();
      expect(tsconfig.compilerOptions.paths['@/*']).toContain('./*');
    });
  });

  describe('exportAsZip', () => {
    it('should create a zip buffer', async () => {
      const buffer = await ExportService.exportAsZip(sampleRecipe, defaultOptions);

      expect(buffer).toBeInstanceOf(Buffer);
      expect(buffer.length).toBeGreaterThan(0);

      // Check for ZIP magic number
      expect(buffer[0]).toBe(0x50); // P
      expect(buffer[1]).toBe(0x4B); // K
    });
  });

  describe('Edge cases', () => {
    it('should handle empty recipe content', async () => {
      const emptyRecipe: RecipeContent = {
        root: { props: {} },
        content: [],
      };

      const result = await ExportService.exportRecipe(emptyRecipe, defaultOptions);

      expect(result.files.length).toBeGreaterThan(0);

      const pageFile = result.files.find(f => f.path === 'pages/index.tsx');
      expect(pageFile).toBeDefined();
    });

    it('should handle special characters in project name', async () => {
      const result = await ExportService.exportRecipe(sampleRecipe, {
        ...defaultOptions,
        projectName: "My Project's Name & More!",
      });

      const packageJsonFile = result.files.find(f => f.path === 'package.json');
      const packageJson = JSON.parse(packageJsonFile!.content);

      // Should be slugified
      expect(packageJson.name).toBe("my-project's-name-&-more!");
    });

    it('should handle unknown component types gracefully', async () => {
      const recipeWithUnknown: RecipeContent = {
        root: { props: {} },
        content: [
          { id: 'block-unknown', type: 'unknown-component-type', props: { title: 'Test' } },
        ],
      };

      const result = await ExportService.exportRecipe(recipeWithUnknown, defaultOptions);

      const componentFile = result.files.find(f => f.path === 'components/UnknownComponentType.tsx');
      expect(componentFile).toBeDefined();
      expect(componentFile!.content).toContain('placeholder');
    });
  });
});
