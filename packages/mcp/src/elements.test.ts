/**
 * Element Metadata Service Tests
 */

import { describe, it, expect } from 'vitest';
import {
  searchElements,
  getElementById,
  getCategories,
  getElementsByLayer,
  getThemeById,
  getAllZones,
  getZoneById,
  searchZones,
  elementCatalog,
  themes,
  zones,
  type ElementLayer,
} from './elements.js';

describe('Element Search Functions', () => {
  describe('searchElements', () => {
    it('should return all elements when no options provided', () => {
      const results = searchElements();
      expect(results.length).toBe(elementCatalog.length);
    });

    it('should filter by layer', () => {
      const atoms = searchElements({ layer: 'atom' });
      const molecules = searchElements({ layer: 'molecule' });
      const organisms = searchElements({ layer: 'organism' });
      const templates = searchElements({ layer: 'template' });

      expect(atoms.every(el => el.layer === 'atom')).toBe(true);
      expect(molecules.every(el => el.layer === 'molecule')).toBe(true);
      expect(organisms.every(el => el.layer === 'organism')).toBe(true);
      expect(templates.every(el => el.layer === 'template')).toBe(true);

      // All layers should add up to total
      expect(atoms.length + molecules.length + organisms.length + templates.length)
        .toBe(elementCatalog.length);
    });

    it('should filter by category', () => {
      const buttons = searchElements({ category: 'buttons' });
      const cards = searchElements({ category: 'cards' });

      expect(buttons.every(el => el.category === 'buttons')).toBe(true);
      expect(cards.every(el => el.category === 'cards')).toBe(true);
      expect(buttons.length).toBeGreaterThan(0);
      expect(cards.length).toBeGreaterThan(0);
    });

    it('should filter by tags', () => {
      const buttonTagged = searchElements({ tags: ['button'] });
      const animationTagged = searchElements({ tags: ['animation'] });

      expect(buttonTagged.length).toBeGreaterThan(0);
      expect(animationTagged.length).toBeGreaterThan(0);

      // Each result should have at least one matching tag
      buttonTagged.forEach(el => {
        expect(el.tags.some(t => t.toLowerCase().includes('button'))).toBe(true);
      });
    });

    it('should filter by query (searches name, description, tags)', () => {
      const heroResults = searchElements({ query: 'hero' });
      const cardResults = searchElements({ query: 'card' });
      const pricingResults = searchElements({ query: 'pricing' });

      expect(heroResults.length).toBeGreaterThan(0);
      expect(cardResults.length).toBeGreaterThan(0);
      expect(pricingResults.length).toBeGreaterThan(0);

      // Verify results contain query in name, description, or tags
      heroResults.forEach(el => {
        const hasMatch =
          el.name.toLowerCase().includes('hero') ||
          el.description.toLowerCase().includes('hero') ||
          el.tags.some(t => t.toLowerCase().includes('hero'));
        expect(hasMatch).toBe(true);
      });
    });

    it('should be case-insensitive', () => {
      const lowerResults = searchElements({ query: 'button' });
      const upperResults = searchElements({ query: 'BUTTON' });
      const mixedResults = searchElements({ query: 'BuTtOn' });

      expect(lowerResults.length).toBe(upperResults.length);
      expect(upperResults.length).toBe(mixedResults.length);
    });

    it('should apply limit', () => {
      const limited5 = searchElements({ limit: 5 });
      const limited10 = searchElements({ limit: 10 });
      const limited1 = searchElements({ limit: 1 });

      expect(limited5.length).toBe(5);
      expect(limited10.length).toBe(10);
      expect(limited1.length).toBe(1);
    });

    it('should combine multiple filters', () => {
      const results = searchElements({
        layer: 'molecule',
        category: 'buttons',
      });

      expect(results.length).toBeGreaterThan(0);
      results.forEach(el => {
        expect(el.layer).toBe('molecule');
        expect(el.category).toBe('buttons');
      });
    });

    it('should handle empty results gracefully', () => {
      const results = searchElements({ query: 'nonexistentxyz123' });
      expect(results).toEqual([]);
    });

    it('should handle multiple tags', () => {
      const results = searchElements({ tags: ['button', 'primary'] });

      expect(results.length).toBeGreaterThan(0);
      results.forEach(el => {
        const hasMatchingTag = el.tags.some(t =>
          ['button', 'primary'].includes(t.toLowerCase())
        );
        expect(hasMatchingTag).toBe(true);
      });
    });
  });

  describe('getElementById', () => {
    it('should return element for valid ID', () => {
      const element = getElementById('btn-primary');
      expect(element).toBeDefined();
      expect(element?.id).toBe('btn-primary');
      expect(element?.name).toBe('Primary Button');
    });

    it('should return undefined for invalid ID', () => {
      const element = getElementById('nonexistent-element');
      expect(element).toBeUndefined();
    });

    it('should find elements from all layers', () => {
      // Atom
      expect(getElementById('bg-grid')).toBeDefined();
      // Molecule
      expect(getElementById('btn-primary')).toBeDefined();
      // Organism
      expect(getElementById('hero-centered')).toBeDefined();
      // Template
      expect(getElementById('template-landing')).toBeDefined();
    });

    it('should return complete metadata', () => {
      const element = getElementById('hero-centered');

      expect(element).toBeDefined();
      expect(element?.id).toBe('hero-centered');
      expect(element?.name).toBe('Centered Hero');
      expect(element?.layer).toBe('organism');
      expect(element?.category).toBe('layout');
      expect(element?.description).toBeDefined();
      expect(element?.tags).toBeInstanceOf(Array);
      expect(element?.tags.length).toBeGreaterThan(0);
      expect(element?.composedOf).toBeInstanceOf(Array);
      expect(element?.variants).toBeInstanceOf(Array);
      expect(element?.slots).toBeInstanceOf(Array);
    });
  });

  describe('getCategories', () => {
    it('should return all categories with counts', () => {
      const categories = getCategories();

      expect(Object.keys(categories).length).toBeGreaterThan(0);

      // Check that each category has count and layer
      Object.values(categories).forEach(cat => {
        expect(cat.count).toBeGreaterThan(0);
        expect(['atom', 'molecule', 'organism', 'template']).toContain(cat.layer);
      });
    });

    it('should include expected categories', () => {
      const categories = getCategories();

      expect(categories['buttons']).toBeDefined();
      expect(categories['cards']).toBeDefined();
      expect(categories['backgrounds']).toBeDefined();
      expect(categories['layout']).toBeDefined();
    });

    it('should have counts matching filtered results', () => {
      const categories = getCategories();

      // Verify count matches actual filtered count
      const buttonCount = searchElements({ category: 'buttons' }).length;
      expect(categories['buttons'].count).toBe(buttonCount);

      const cardCount = searchElements({ category: 'cards' }).length;
      expect(categories['cards'].count).toBe(cardCount);
    });
  });

  describe('getElementsByLayer', () => {
    it('should return all elements of a layer', () => {
      const layers: ElementLayer[] = ['atom', 'molecule', 'organism', 'template'];

      layers.forEach(layer => {
        const elements = getElementsByLayer(layer);
        expect(elements.length).toBeGreaterThan(0);
        elements.forEach(el => {
          expect(el.layer).toBe(layer);
        });
      });
    });

    it('should return same results as searchElements with layer filter', () => {
      const layers: ElementLayer[] = ['atom', 'molecule', 'organism', 'template'];

      layers.forEach(layer => {
        const byFunction = getElementsByLayer(layer);
        const bySearch = searchElements({ layer });
        expect(byFunction.length).toBe(bySearch.length);
      });
    });
  });
});

describe('Theme Functions', () => {
  describe('getThemeById', () => {
    it('should return theme for valid ID', () => {
      const theme = getThemeById('default');
      expect(theme).toBeDefined();
      expect(theme?.id).toBe('default');
      expect(theme?.name).toBe('Default');
    });

    it('should return undefined for invalid ID', () => {
      const theme = getThemeById('nonexistent-theme');
      expect(theme).toBeUndefined();
    });

    it('should return all available themes', () => {
      const themeIds = ['default', 'dark', 'brutal', 'neon', 'cosmic', 'glass'];

      themeIds.forEach(id => {
        const theme = getThemeById(id);
        expect(theme).toBeDefined();
        expect(theme?.id).toBe(id);
      });
    });

    it('should return complete theme data', () => {
      const theme = getThemeById('neon');

      expect(theme).toBeDefined();
      expect(theme?.id).toBe('neon');
      expect(theme?.name).toBe('Neon');
      expect(theme?.description).toBeDefined();
      expect(theme?.colors).toBeDefined();
      expect(theme?.colors.primary).toBeDefined();
      expect(theme?.colors.background).toBeDefined();
      expect(theme?.colors.surface).toBeDefined();
      expect(theme?.colors.text).toBeDefined();
      expect(theme?.colors.accent).toBeDefined();
    });
  });

  describe('themes array', () => {
    it('should have 6 themes', () => {
      expect(themes.length).toBe(6);
    });

    it('should have unique IDs', () => {
      const ids = themes.map(t => t.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(themes.length);
    });

    it('should have valid color formats', () => {
      themes.forEach(theme => {
        const { colors } = theme;
        // Check for hex color or rgba format
        const colorRegex = /^(#[0-9a-fA-F]{6}|rgba?\([^)]+\))$/;

        expect(colors.primary).toMatch(colorRegex);
        expect(colors.background).toMatch(colorRegex);
        expect(colors.text).toMatch(colorRegex);
        expect(colors.accent).toMatch(colorRegex);
      });
    });
  });
});

describe('Zone Functions', () => {
  describe('getAllZones', () => {
    it('should return all zones', () => {
      const allZones = getAllZones();
      expect(allZones.length).toBe(zones.length);
      expect(allZones).toEqual(zones);
    });

    it('should return at least 10 zones', () => {
      const allZones = getAllZones();
      expect(allZones.length).toBeGreaterThanOrEqual(10);
    });
  });

  describe('getZoneById', () => {
    it('should return zone for valid ID', () => {
      const zone = getZoneById('arcade');
      expect(zone).toBeDefined();
      expect(zone?.id).toBe('arcade');
      expect(zone?.name).toBe('Arcade Basement');
    });

    it('should return undefined for invalid ID', () => {
      const zone = getZoneById('nonexistent-zone');
      expect(zone).toBeUndefined();
    });

    it('should return complete zone data', () => {
      const zone = getZoneById('cosmic');

      expect(zone).toBeDefined();
      expect(zone?.id).toBe('cosmic');
      expect(zone?.name).toBe('Cosmic Observatory');
      expect(zone?.description).toBeDefined();
      expect(zone?.aesthetic).toBeDefined();
      expect(zone?.colors).toBeDefined();
      expect(zone?.colors.primary).toBeDefined();
      expect(zone?.colors.secondary).toBeDefined();
      expect(zone?.colors.accent).toBeDefined();
      expect(zone?.colors.background).toBeDefined();
      expect(zone?.componentCount).toBeDefined();
      expect(zone?.tags).toBeInstanceOf(Array);
      expect(zone?.tags.length).toBeGreaterThan(0);
    });
  });

  describe('searchZones', () => {
    it('should return all zones when no query provided', () => {
      const results = searchZones();
      expect(results.length).toBe(zones.length);
    });

    it('should return all zones when undefined query', () => {
      const results = searchZones(undefined);
      expect(results.length).toBe(zones.length);
    });

    it('should filter by name', () => {
      const results = searchZones('arcade');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(z => z.id === 'arcade')).toBe(true);
    });

    it('should filter by description', () => {
      const results = searchZones('gaming');
      expect(results.length).toBeGreaterThan(0);
    });

    it('should filter by aesthetic', () => {
      const results = searchZones('neon');
      expect(results.length).toBeGreaterThan(0);
    });

    it('should filter by tags', () => {
      const results = searchZones('space');
      expect(results.length).toBeGreaterThan(0);
      // Should match cosmic observatory and space station
      expect(results.some(z => z.tags.includes('space'))).toBe(true);
    });

    it('should be case-insensitive', () => {
      const lowerResults = searchZones('arcade');
      const upperResults = searchZones('ARCADE');
      const mixedResults = searchZones('ArCaDe');

      expect(lowerResults.length).toBe(upperResults.length);
      expect(upperResults.length).toBe(mixedResults.length);
    });

    it('should handle empty results gracefully', () => {
      const results = searchZones('nonexistentxyz123');
      expect(results).toEqual([]);
    });
  });

  describe('zones array', () => {
    it('should have unique IDs', () => {
      const ids = zones.map(z => z.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(zones.length);
    });

    it('should have valid color formats', () => {
      zones.forEach(zone => {
        const { colors } = zone;
        const colorRegex = /^#[0-9a-fA-F]{6}$/;

        expect(colors.primary).toMatch(colorRegex);
        expect(colors.secondary).toMatch(colorRegex);
        expect(colors.accent).toMatch(colorRegex);
        expect(colors.background).toMatch(colorRegex);
      });
    });

    it('should have positive component counts', () => {
      zones.forEach(zone => {
        expect(zone.componentCount).toBeGreaterThan(0);
      });
    });

    it('should have at least one tag per zone', () => {
      zones.forEach(zone => {
        expect(zone.tags.length).toBeGreaterThan(0);
      });
    });
  });
});

describe('Element Catalog Integrity', () => {
  it('should have unique element IDs', () => {
    const ids = elementCatalog.map(el => el.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(elementCatalog.length);
  });

  it('should have valid layers for all elements', () => {
    const validLayers = ['atom', 'molecule', 'organism', 'template'];
    elementCatalog.forEach(el => {
      expect(validLayers).toContain(el.layer);
    });
  });

  it('should have at least one tag per element', () => {
    elementCatalog.forEach(el => {
      expect(el.tags.length).toBeGreaterThan(0);
    });
  });

  it('should have non-empty names and descriptions', () => {
    elementCatalog.forEach(el => {
      expect(el.name.length).toBeGreaterThan(0);
      expect(el.description.length).toBeGreaterThan(0);
    });
  });

  it('should have composedOf referencing valid IDs for complex elements', () => {
    const allIds = new Set(elementCatalog.map(el => el.id));

    elementCatalog.forEach(el => {
      if (el.composedOf) {
        el.composedOf.forEach(composedId => {
          expect(allIds.has(composedId)).toBe(true);
        });
      }
    });
  });

  it('should have slots with valid types for organisms and templates', () => {
    const validSlotTypes = ['text', 'richText', 'node', 'component', 'list', 'image', 'link', 'action'];

    elementCatalog.forEach(el => {
      if (el.slots) {
        el.slots.forEach(slot => {
          expect(validSlotTypes).toContain(slot.type);
          expect(slot.id.length).toBeGreaterThan(0);
          expect(slot.name.length).toBeGreaterThan(0);
          expect(typeof slot.required).toBe('boolean');
        });
      }
    });
  });
});
