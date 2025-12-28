# UI Museum Component Migration Plan

**Created**: 2025-12-22
**Status**: IN PROGRESS
**Source**: `/Users/umangagarwal/Downloads/UI elements/living-comic-&-gamified-lab`
**Target**: `/Users/umangagarwal/Downloads/UI elements/ui-museum`

---

## Overview

| Metric | Count |
|--------|-------|
| Total Source Components | ~96 |
| Currently in Museum | ~72 |
| Components to Add | ~50 |
| Implementation Phases | 4 |

---

## Phase 1: Quick Wins (14 components)
**Status**: COMPLETED

Low complexity components with no special dependencies.

### ComicDemos.tsx (5 components)
| Component | Zone | Status | Notes |
|-----------|------|--------|-------|
| SplashExpansion | pulp-detective | ✅ Done | Comic splash panel expansion |
| ZScrollNoir | pulp-detective | ✅ Done | Noir parallax scroll |
| RipAway | pulp-detective | ✅ Done | Paper rip reveal |
| OrigamiSubmit | artist-studio | ✅ Done | Folding submit button |
| TatteredMap | pulp-detective | ✅ Done | Worn treasure map |

### NarrativeDemos.tsx (5 components)
| Component | Zone | Status | Notes |
|-----------|------|--------|-------|
| WeatherSync | organic-garden | ✅ Done | Weather-reactive UI |
| DeskLampFocus | retro-office | ✅ Done | Desk lamp spotlight |
| FloppyDiskSave | retro-office | ✅ Done | Floppy disk animation |
| RedactedReveal | pulp-detective | ✅ Done | Classified doc reveal |
| InfiniteZoom | cosmic-observatory | ✅ Done | Fractal zoom effect |

### Additional Quick Wins (4 components)
| Component | Source | Zone | Status |
|-----------|--------|------|--------|
| ParallaxScroll | CinematicDemos | cinema-stage | ✅ Done |
| MonocleZoom | FinalDemos | pulp-detective | ✅ Done |
| PolaroidDeveloper | DataToolsDemos | artist-studio | ✅ Done |
| HandDrawnLab | HandDrawnLab | artist-studio | ✅ Done |

---

## Phase 2: Medium Complexity (18 components)
**Status**: IN PROGRESS

### TextureDemos.tsx (5 components)
| Component | Zone | Status | Notes |
|-----------|------|--------|-------|
| TapestryMap | organic-garden | ⬜ Pending | Woven data viz |
| WeatherVaneSort | organic-garden | ⬜ Pending | Rotating sort control |
| TopographyLink | geometry-lab | ⬜ Pending | Contour map link |
| LibraryCardCatalog | retro-office | ⬜ Pending | Drawer search |
| CircuitBoardStatus | hacker-terminal | ⬜ Pending | Trace status |

### TactileDemos.tsx (5 components)
| Component | Zone | Status | Notes |
|-----------|------|--------|-------|
| Rolodex | retro-office | ⬜ Pending | 3D card flip |
| DymoLabeler | retro-office | ⬜ Pending | Label printer |
| OverheadProjector | retro-office | ⬜ Pending | Projection effect |
| PneumaticTube | retro-office | ⬜ Pending | Tube travel |
| InfiniteFloor | geometry-lab | ⬜ Pending | Perspective grid |

### FinalDemos.tsx Missing (6 components)
| Component | Zone | Status | Notes |
|-----------|------|--------|-------|
| SnapCloseButton | arcade-basement | ⬜ Pending | Haptic button |
| TapestryDataMap | organic-garden | ⬜ Pending | Woven data map |
| WeatherVaneTable | organic-garden | ⬜ Pending | Sortable table |
| TopographyMapLink | geometry-lab | ⬜ Pending | Map navigation |
| CircuitBoardFlow | hacker-terminal | ⬜ Pending | Flow animation |
| SnapCloseButton | arcade-basement | ⬜ Pending | Snap close |

### DataToolsDemos.tsx Simpler (2 components)
| Component | Zone | Status | Notes |
|-----------|------|--------|-------|
| AccordionAccordion | retro-office | ⬜ Pending | Bellows accordion |
| PunchCardProgress | retro-office | ⬜ Pending | Punch card tracker |

---

## Phase 3: High Complexity (18 components)
**Status**: NOT STARTED

### AtmosphereDemos.tsx (6 components)
| Component | Zone | Status | Notes |
|-----------|------|--------|-------|
| ThunderstormFlip | cinema-stage | ⬜ Pending | Lightning + shake |
| StickerBook | artist-studio | ⬜ Pending | Draggable stickers |
| PixelDustDelete | arcade-basement | ⬜ Pending | Particle delete (useGameLoop) |
| SpotlightFocus | cinema-stage | ⬜ Pending | Flashlight reading |
| PaperDoll | artist-studio | ⬜ Pending | Draggable clothes |
| TVChannels | retro-office | ⬜ Pending | CRT TV switcher |

### ArchitecturalDemos.tsx (5 components)
| Component | Zone | Status | Notes |
|-----------|------|--------|-------|
| LouveredFeed | geometry-lab | ⬜ Pending | 3D louvered blinds |
| BlueprintUI | geometry-lab | ⬜ Pending | Blueprint mode toggle |
| ElevatorNav | arcade-basement | ⬜ Pending | Elevator with doors |
| InfiniteDesk | retro-office | ⬜ Pending | Infinite canvas desk |
| PrismView | cosmic-observatory | ⬜ Pending | 3D rotating prism |

### DataToolsDemos.tsx Complex (4 components)
| Component | Zone | Status | Notes |
|-----------|------|--------|-------|
| XRaySpecs | mad-science | ⬜ Pending | X-ray lens overlay |
| VCRTracking | retro-office | ⬜ Pending | VCR tracking slider |
| CassettePlayer | retro-office | ⬜ Pending | Spinning reels |

---

## Phase 4: Full Applications (2 components)
**Status**: NOT STARTED

| Component | Zone | Status | Notes |
|-----------|------|--------|-------|
| DesignSystemApp | geometry-lab | ⬜ Pending | 3-theme design system |
| AssetLab | artist-studio | ⬜ Pending | AI asset generation guide |

---

## Zone Summary (After Migration)

| Zone | Before | After | New Components |
|------|--------|-------|----------------|
| arcade-basement | 6 | 9 | +3 |
| pulp-detective | 6 | 12 | +6 |
| hacker-terminal | 5 | 7 | +2 |
| mad-science | 6 | 7 | +1 |
| physics-playground | 5 | 5 | +0 |
| organic-garden | 6 | 10 | +4 |
| cosmic-observatory | 6 | 8 | +2 |
| retro-office | 7 | 19 | +12 |
| cinema-stage | 5 | 8 | +3 |
| geometry-lab | 6 | 11 | +5 |
| artist-studio | 7 | 13 | +6 |

---

## Implementation Log

### 2025-12-22

#### Session Start
- Created migration plan document
- Beginning Phase 1 implementation

#### Phase 1 Complete
- Ported 14 components across 5 zones
- Added registry entries for all Phase 1 components
- TypeScript compiles successfully (only unused variable warnings)
- Beginning Phase 2 implementation

---

## Files Modified

### Library Files
- [ ] `/src/library/pulp-detective/index.tsx` - Add ComicDemos components
- [ ] `/src/library/artist-studio/index.tsx` - Add OrigamiSubmit, PolaroidDeveloper, etc.
- [ ] `/src/library/organic-garden/index.tsx` - Add WeatherSync
- [ ] `/src/library/retro-office/index.tsx` - Add DeskLampFocus, FloppyDiskSave
- [ ] `/src/library/cosmic-observatory/index.tsx` - Add InfiniteZoom
- [ ] `/src/library/cinema-stage/index.tsx` - Add ParallaxScroll

### Registry
- [ ] `/src/data/registry.ts` - Add all new component entries

### Shared
- [ ] `/src/library/shared/icons.tsx` - Add any missing icons

---

## Verification Checklist

### Per Phase
- [ ] All components compile without TypeScript errors
- [ ] All components render in browser
- [ ] All components have registry entries
- [ ] All components appear in correct zones
- [ ] Interactive components respond to user input
- [ ] No console errors

### Final
- [ ] Full build passes (`npm run build`)
- [ ] All 11 zones display correctly
- [ ] Search finds new components
- [ ] Component detail view works for all new components
