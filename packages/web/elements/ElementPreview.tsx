import React, { Suspense, useState } from 'react';
import { ElementEntry, getElement } from './registry';

// ============================================
// ELEMENT PREVIEW COMPONENT
// ============================================

interface ElementPreviewProps {
  elementId: string;
  className?: string;
  showCode?: boolean;
  interactive?: boolean;
}

/**
 * Renders a live preview of an element from the registry.
 * Handles loading states, errors, and different element types.
 */
export function ElementPreview({
  elementId,
  className = '',
  showCode = false,
  interactive = true,
}: ElementPreviewProps) {
  const element = getElement(elementId);
  const [showCodeView, setShowCodeView] = useState(showCode);

  if (!element) {
    return (
      <div className={`flex items-center justify-center p-4 bg-red-500/10 border border-red-500/20 rounded-xl ${className}`}>
        <span className="text-red-400 text-sm">Element not found: {elementId}</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Preview/Code toggle */}
      {element.codeSnippet && (
        <div className="absolute top-2 right-2 z-10 flex gap-1 p-1 bg-black/40 backdrop-blur-sm rounded-lg">
          <button
            onClick={() => setShowCodeView(false)}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              !showCodeView ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white'
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setShowCodeView(true)}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              showCodeView ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white'
            }`}
          >
            Code
          </button>
        </div>
      )}

      {/* Content */}
      {showCodeView && element.codeSnippet ? (
        <CodePreview code={element.codeSnippet} />
      ) : (
        <LivePreview element={element} interactive={interactive} />
      )}
    </div>
  );
}

// ============================================
// LIVE PREVIEW COMPONENT
// ============================================

interface LivePreviewProps {
  element: ElementEntry;
  interactive: boolean;
}

function LivePreview({ element, interactive }: LivePreviewProps) {
  // Determine background based on element type
  const bgClass = element.previewBg || getDefaultBackground(element);

  return (
    <div
      className={`
        relative w-full h-full min-h-[120px] rounded-xl overflow-hidden
        flex items-center justify-center
        ${bgClass}
        ${!interactive ? 'pointer-events-none' : ''}
      `}
    >
      <Suspense fallback={<LoadingState />}>
        <ElementRenderer element={element} />
      </Suspense>
    </div>
  );
}

// ============================================
// ELEMENT RENDERER
// ============================================

interface ElementRendererProps {
  element: ElementEntry;
}

function ElementRenderer({ element }: ElementRendererProps) {
  // If element has a React component, render it
  if (element.component) {
    const Component = element.component;
    return <Component />;
  }

  // If element has a CSS class, render a demo div with that class
  if (element.cssClass) {
    return (
      <div className={`w-full h-full ${element.cssClass}`}>
        <div className="p-4 text-center">
          <span className="text-xs font-mono opacity-50">.{element.cssClass}</span>
        </div>
      </div>
    );
  }

  // Default placeholder for elements not yet implemented
  return <PlaceholderPreview element={element} />;
}

// ============================================
// PLACEHOLDER PREVIEW
// ============================================

interface PlaceholderPreviewProps {
  element: ElementEntry;
}

function PlaceholderPreview({ element }: PlaceholderPreviewProps) {
  // Layer-specific styling
  const layerStyles: Record<string, { gradient: string; icon: React.ReactNode }> = {
    atom: {
      gradient: 'from-cyan-500/20 to-blue-500/20',
      icon: <circle cx="12" cy="12" r="4" />,
    },
    molecule: {
      gradient: 'from-violet-500/20 to-fuchsia-500/20',
      icon: <><circle cx="8" cy="12" r="3" /><circle cx="16" cy="12" r="3" /><line x1="11" y1="12" x2="13" y2="12" /></>,
    },
    organism: {
      gradient: 'from-amber-500/20 to-orange-500/20',
      icon: <><circle cx="12" cy="8" r="3" /><circle cx="7" cy="15" r="3" /><circle cx="17" cy="15" r="3" /></>,
    },
  };

  const style = layerStyles[element.layer] || layerStyles.atom;

  return (
    <div className={`flex flex-col items-center justify-center p-6 bg-gradient-to-br ${style.gradient}`}>
      <div className="w-16 h-16 rounded-xl border-2 border-white/20 flex items-center justify-center mb-3">
        <svg className="w-8 h-8 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {style.icon}
        </svg>
      </div>
      <span className="text-white/60 text-xs font-medium">{element.name}</span>
      <span className="text-white/30 text-[10px] mt-1">Coming soon</span>
    </div>
  );
}

// ============================================
// CODE PREVIEW COMPONENT
// ============================================

interface CodePreviewProps {
  code: string;
}

function CodePreview({ code }: CodePreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full h-full bg-neutral-900 rounded-xl overflow-hidden">
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 z-10 px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-xs font-medium text-white/70 hover:text-white transition-colors"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>

      {/* Code content */}
      <pre className="p-4 overflow-auto h-full text-xs font-mono text-white/80 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ============================================
// LOADING STATE
// ============================================

function LoadingState() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
    </div>
  );
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function getDefaultBackground(element: ElementEntry): string {
  // Return appropriate background based on element category
  const darkBgCategories = ['backgrounds', 'shadows', 'filters', 'animations'];
  const lightBgCategories = ['typography', 'icons', 'shapes'];

  if (darkBgCategories.includes(element.category)) {
    return 'bg-neutral-900';
  }
  if (lightBgCategories.includes(element.category)) {
    return 'bg-neutral-800';
  }
  return 'bg-neutral-850';
}

// ============================================
// ELEMENT DETAIL MODAL
// ============================================

interface ElementDetailProps {
  elementId: string;
  onClose: () => void;
}

export function ElementDetail({ elementId, onClose }: ElementDetailProps) {
  const element = getElement(elementId);

  if (!element) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-neutral-900 rounded-2xl border border-white/10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`
                px-2 py-0.5 rounded-full text-[10px] font-medium uppercase
                ${element.layer === 'atom' ? 'bg-cyan-500/20 text-cyan-400' : ''}
                ${element.layer === 'molecule' ? 'bg-violet-500/20 text-violet-400' : ''}
                ${element.layer === 'organism' ? 'bg-amber-500/20 text-amber-400' : ''}
              `}>
                {element.layer}
              </span>
              <span className="text-white/30 text-xs">/</span>
              <span className="text-white/50 text-xs">{element.category}</span>
            </div>
            <h2 className="text-xl font-bold text-white">{element.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Preview */}
        <div className="p-6">
          <ElementPreview elementId={elementId} className="h-48" />
        </div>

        {/* Details */}
        <div className="p-6 border-t border-white/10">
          <p className="text-white/60 text-sm mb-4">{element.description}</p>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-white/40 text-xs uppercase tracking-wider">Implementation</span>
              <p className="text-white/80 font-mono text-xs mt-1">{element.implementation}</p>
            </div>
            <div>
              <span className="text-white/40 text-xs uppercase tracking-wider">Theme</span>
              <p className="text-white/80 text-xs mt-1">
                {element.themeAgnostic ? 'Universal' : 'Zone-specific'}
              </p>
            </div>
          </div>

          {/* Tags */}
          {element.tags.length > 0 && (
            <div className="mt-4">
              <span className="text-white/40 text-xs uppercase tracking-wider">Tags</span>
              <div className="flex flex-wrap gap-1 mt-2">
                {element.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-white/5 rounded text-xs text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Source */}
          {element.sourceComponents.length > 0 && (
            <div className="mt-4">
              <span className="text-white/40 text-xs uppercase tracking-wider">Used in</span>
              <div className="flex flex-wrap gap-1 mt-2">
                {element.sourceComponents.map(comp => (
                  <span
                    key={comp}
                    className="px-2 py-0.5 bg-violet-500/10 border border-violet-500/20 rounded text-xs text-violet-300"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
