import React, { Suspense } from 'react';

// Import all zone component maps
import { arcadeComponents } from './arcade';
import { hackerComponents } from './hacker';
import { madScienceComponents } from './mad-science';
import { physicsComponents } from './physics';
import { organicComponents } from './organic';
import { cosmicComponents } from './cosmic';
import { cinemaComponents } from './cinema';
import { geometryComponents } from './geometry';
import { pulpComponents } from './pulp';
import { retroOfficeComponents } from './retro-office';
import { artistStudioComponents } from './artist-studio';
// New zones
import { underwaterComponents } from './underwater-depths';
import { steampunkComponents } from './steampunk-workshop';
import { cyberpunkComponents } from './cyberpunk-district';
import { medievalComponents } from './medieval-scriptorium';
import { spaceStationComponents } from './space-station';
// Phase 2 zones
import { luxuryShowroomComponents } from './luxury-showroom';
import { brutalistBunkerComponents } from './brutalist-bunker';
import { vaporwaveDreamscapeComponents } from './vaporwave-dreamscape';
import { indieAppWorkshopComponents } from './indie-app-workshop';
import { dataDashboardComponents } from './data-dashboard';
// Phase 3 zones
import { zenGardenComponents } from './zen-garden';
import { neonTokyoComponents } from './neon-tokyo';
import { hauntedMansionComponents } from './haunted-mansion';
import { candyKingdomComponents } from './candy-kingdom';
import { noirJazzClubComponents } from './noir-jazz-club';
import { bendayDotsComponents } from './benday-dots';
import { artDecoLoungeComponents } from './art-deco-lounge';
import { wireframeProtoComponents } from './wireframe-proto';
// Phase 4 zones
import { nordicFrostComponents } from './nordic-frost';
import { moroccanBazaarComponents } from './moroccan-bazaar';
import { origamiFoldComponents } from './origami-fold';
import { diaDeLosmuertosComponents } from './dia-de-los-muertos';
import { swissChaletComponents } from './swiss-chalet';
// Blueprint Draft zone
import { blueprintDraftComponents } from './blueprint-draft';
// Tropical Paradise zone
import { tropicalParadiseComponents } from './tropical-paradise';
// Victorian Parlor zone
import { victorianParlorComponents } from './victorian-parlor';
// Desert Mirage zone
import { desertMirageComponents } from './desert-mirage';
// Disco Inferno zone
import { discoInfernoComponents } from './disco-inferno';
// Glitch Matrix zone
import { glitchMatrixComponents } from './glitch-matrix';
// Ancient Scrolls zone
import { ancientScrollsComponents } from './ancient-scrolls';
// Jungle Temple zone
import { jungleTempleComponents } from './jungle-temple';
// Effects Library
import { scrollEffects } from './effects/scroll';
import { textEffects } from './effects/text';
import { cursorEffects } from './effects/cursor';

// Combine all components into a single registry
export const componentRegistry: Record<string, React.FC> = {
  ...arcadeComponents,
  ...hackerComponents,
  ...madScienceComponents,
  ...physicsComponents,
  ...organicComponents,
  ...cosmicComponents,
  ...cinemaComponents,
  ...geometryComponents,
  ...pulpComponents,
  ...retroOfficeComponents,
  ...artistStudioComponents,
  // New zones
  ...underwaterComponents,
  ...steampunkComponents,
  ...cyberpunkComponents,
  ...medievalComponents,
  ...spaceStationComponents,
  // Phase 2 zones
  ...luxuryShowroomComponents,
  ...brutalistBunkerComponents,
  ...vaporwaveDreamscapeComponents,
  ...indieAppWorkshopComponents,
  ...dataDashboardComponents,
  // Phase 3 zones
  ...zenGardenComponents,
  ...neonTokyoComponents,
  ...hauntedMansionComponents,
  ...candyKingdomComponents,
  ...noirJazzClubComponents,
  ...bendayDotsComponents,
  // Art Deco Lounge
  ...artDecoLoungeComponents,
  // Wireframe Proto
  ...wireframeProtoComponents,
  // Phase 4 zones
  ...nordicFrostComponents,
  // Moroccan Bazaar
  ...moroccanBazaarComponents,
  // Origami Fold
  ...origamiFoldComponents,
  // Dia de los Muertos
  ...diaDeLosmuertosComponents,
  // Swiss Chalet
  ...swissChaletComponents,
  // Blueprint Draft
  ...blueprintDraftComponents,
  // Tropical Paradise
  ...tropicalParadiseComponents,
  // Victorian Parlor
  ...victorianParlorComponents,
  // Desert Mirage
  ...desertMirageComponents,
  // Disco Inferno
  ...discoInfernoComponents,
  // Glitch Matrix
  ...glitchMatrixComponents,
  // Ancient Scrolls
  ...ancientScrollsComponents,
  // Jungle Temple
  ...jungleTempleComponents,
  // Effects Library - Scroll Effects
  ...scrollEffects,
  // Effects Library - Cursor Effects
  ...cursorEffects,
  // Effects Library - Text Effects
  ...textEffects,
};

// Error boundary for individual component previews
class ComponentErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="h-full flex items-center justify-center bg-red-950/50 text-red-400 p-4">
          <div className="text-center">
            <p className="font-mono text-xs">⚠️ Component Error</p>
            <p className="text-[10px] mt-1 opacity-70">{this.state.error?.message}</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Loading fallback
const LoadingFallback = () => (
  <div className="h-full flex items-center justify-center bg-zinc-800">
    <div className="w-6 h-6 border-2 border-zinc-600 border-t-zinc-300 rounded-full animate-spin" />
  </div>
);

// Get a component by ID
export const getComponent = (id: string): React.FC | null => {
  return componentRegistry[id] || null;
};

// Render a component by ID with error handling
export const ComponentPreview: React.FC<{
  componentId: string;
  className?: string;
}> = ({ componentId, className = '' }) => {
  const Component = getComponent(componentId);

  if (!Component) {
    return (
      <div className={`h-full flex items-center justify-center bg-zinc-800 text-zinc-500 ${className}`}>
        <div className="text-center">
          <p className="font-mono text-xs">Component not found</p>
          <p className="text-[10px] mt-1 opacity-70">{componentId}</p>
        </div>
      </div>
    );
  }

  return (
    <ComponentErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <div className={`h-full w-full overflow-hidden ${className}`}>
          <Component />
        </div>
      </Suspense>
    </ComponentErrorBoundary>
  );
};

// List all available component IDs
export const getAllComponentIds = (): string[] => {
  return Object.keys(componentRegistry);
};

// Check if a component exists
export const hasComponent = (id: string): boolean => {
  return id in componentRegistry;
};

export default componentRegistry;
