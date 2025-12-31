/**
 * FigmaExportButton
 *
 * Button component for exporting a UI component to Figma.
 * Shows export status with visual feedback.
 * Disabled when not connected to Figma.
 */

import { useState, useCallback } from 'react';
import { useFigma, type ExportStatus, type FigmaExportOptions } from './FigmaProvider';

// ============================================================================
// ICONS
// ============================================================================

const ExportIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const LoadingSpinner = () => (
  <svg
    className="w-4 h-4 animate-spin"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="3"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const SuccessIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ErrorIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const FigmaIcon = () => (
  <svg
    className="w-3.5 h-3.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 24C10.2091 24 12 22.2091 12 20V16H8C5.79086 16 4 17.7909 4 20C4 22.2091 5.79086 24 8 24Z"
      fill="#0ACF83"
    />
    <path
      d="M4 12C4 9.79086 5.79086 8 8 8H12V16H8C5.79086 16 4 14.2091 4 12Z"
      fill="#A259FF"
    />
    <path
      d="M4 4C4 1.79086 5.79086 0 8 0H12V8H8C5.79086 8 4 6.20914 4 4Z"
      fill="#F24E1E"
    />
    <path
      d="M12 0H16C18.2091 0 20 1.79086 20 4C20 6.20914 18.2091 8 16 8H12V0Z"
      fill="#FF7262"
    />
    <path
      d="M20 12C20 14.2091 18.2091 16 16 16C13.7909 16 12 14.2091 12 12C12 9.79086 13.7909 8 16 8C18.2091 8 20 9.79086 20 12Z"
      fill="#1ABCFE"
    />
  </svg>
);

// ============================================================================
// STATUS CONFIG
// ============================================================================

const statusConfig: Record<
  ExportStatus,
  {
    icon: React.ReactNode;
    label: string;
    className: string;
  }
> = {
  idle: {
    icon: <ExportIcon />,
    label: 'Export to Figma',
    className: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white',
  },
  exporting: {
    icon: <LoadingSpinner />,
    label: 'Exporting...',
    className: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white cursor-wait',
  },
  success: {
    icon: <SuccessIcon />,
    label: 'Exported!',
    className: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white',
  },
  error: {
    icon: <ErrorIcon />,
    label: 'Export Failed',
    className: 'bg-gradient-to-r from-red-600 to-rose-600 text-white',
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

interface FigmaExportButtonProps {
  componentId: string;
  componentName?: string;
  className?: string;
  variant?: 'default' | 'compact' | 'icon';
  exportOptions?: FigmaExportOptions;
  onExportStart?: () => void;
  onExportComplete?: (url: string | null) => void;
  onExportError?: (error: Error) => void;
}

export function FigmaExportButton({
  componentId,
  componentName,
  className = '',
  variant = 'default',
  exportOptions = { format: 'svg' },
  onExportStart,
  onExportComplete,
  onExportError,
}: FigmaExportButtonProps) {
  const { isConnected, exportComponent } = useFigma();
  const [status, setStatus] = useState<ExportStatus>('idle');
  const [_lastExportUrl, setLastExportUrl] = useState<string | null>(null);

  const handleExport = useCallback(async () => {
    if (!isConnected || status === 'exporting') return;

    setStatus('exporting');
    onExportStart?.();

    try {
      const url = await exportComponent(componentId, exportOptions);

      if (url) {
        setStatus('success');
        setLastExportUrl(url);
        onExportComplete?.(url);

        // Reset to idle after a delay
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        throw new Error('Export returned no URL');
      }
    } catch (error) {
      setStatus('error');
      onExportError?.(error instanceof Error ? error : new Error('Export failed'));

      // Reset to idle after a delay
      setTimeout(() => setStatus('idle'), 3000);
    }
  }, [isConnected, status, componentId, exportOptions, exportComponent, onExportStart, onExportComplete, onExportError]);

  const config = statusConfig[status];

  // Disabled state when not connected
  if (!isConnected) {
    return (
      <button
        disabled
        className={`
          group relative flex items-center justify-center gap-2 px-4 py-2.5
          bg-gray-800/50 border border-white/5
          rounded-xl
          text-white/30 text-sm font-medium
          cursor-not-allowed
          ${variant === 'icon' ? 'w-10 h-10 px-0' : ''}
          ${variant === 'compact' ? 'px-3 py-2 text-xs' : ''}
          ${className}
        `}
        title="Connect to Figma to export"
      >
        <FigmaIcon />
        {variant !== 'icon' && (
          <span className={variant === 'compact' ? 'hidden sm:inline' : ''}>
            Connect to Export
          </span>
        )}

        {/* Tooltip on hover */}
        <div className="
          absolute bottom-full left-1/2 -translate-x-1/2 mb-2
          px-3 py-1.5 rounded-lg
          bg-gray-900 border border-white/10
          text-xs text-white/70
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
          pointer-events-none
          whitespace-nowrap
          shadow-lg
        ">
          Connect to Figma first
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </div>
      </button>
    );
  }

  // Active state
  return (
    <button
      onClick={handleExport}
      disabled={status === 'exporting'}
      className={`
        group relative flex items-center justify-center gap-2 px-4 py-2.5
        ${config.className}
        border border-white/10 hover:border-white/20
        rounded-xl
        text-sm font-medium
        transition-all duration-300
        shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20
        disabled:shadow-none
        ${status === 'exporting' ? 'animate-pulse' : ''}
        ${variant === 'icon' ? 'w-10 h-10 px-0' : ''}
        ${variant === 'compact' ? 'px-3 py-2 text-xs' : ''}
        ${className}
      `}
      title={`Export ${componentName || componentId} to Figma`}
    >
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </div>

      {/* Icon */}
      <span className="relative z-10">{config.icon}</span>

      {/* Label */}
      {variant !== 'icon' && (
        <span className={`relative z-10 ${variant === 'compact' ? 'hidden sm:inline' : ''}`}>
          {config.label}
        </span>
      )}

      {/* Success animation */}
      {status === 'success' && (
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-green-400/20 animate-ping" />
        </div>
      )}
    </button>
  );
}

// ============================================================================
// EXPORT DROPDOWN VARIANT
// ============================================================================

interface FigmaExportDropdownProps extends Omit<FigmaExportButtonProps, 'exportOptions'> {
  formats?: Array<'svg' | 'png' | 'jpg' | 'pdf'>;
}

export function FigmaExportDropdown({
  componentId,
  componentName,
  className = '',
  formats = ['svg', 'png', 'jpg'],
  onExportStart,
  onExportComplete,
  onExportError,
}: FigmaExportDropdownProps) {
  const { isConnected, exportComponent } = useFigma();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<ExportStatus>('idle');
  const [_selectedFormat, setSelectedFormat] = useState<typeof formats[number]>('svg');

  const handleExport = useCallback(
    async (format: typeof formats[number]) => {
      if (!isConnected || status === 'exporting') return;

      setSelectedFormat(format);
      setStatus('exporting');
      setIsOpen(false);
      onExportStart?.();

      try {
        const url = await exportComponent(componentId, { format });

        if (url) {
          setStatus('success');
          onExportComplete?.(url);
          setTimeout(() => setStatus('idle'), 3000);
        } else {
          throw new Error('Export returned no URL');
        }
      } catch (error) {
        setStatus('error');
        onExportError?.(error instanceof Error ? error : new Error('Export failed'));
        setTimeout(() => setStatus('idle'), 3000);
      }
    },
    [isConnected, status, componentId, exportComponent, onExportStart, onExportComplete, onExportError]
  );

  if (!isConnected) {
    return (
      <FigmaExportButton
        componentId={componentId}
        componentName={componentName}
        className={className}
      />
    );
  }

  const config = statusConfig[status];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => status === 'idle' && setIsOpen(!isOpen)}
        disabled={status === 'exporting'}
        className={`
          group relative flex items-center gap-2 px-4 py-2.5
          ${config.className}
          border border-white/10 hover:border-white/20
          rounded-xl
          text-sm font-medium
          transition-all duration-300
          shadow-lg shadow-purple-500/10
        `}
      >
        <span>{config.icon}</span>
        <span>{status === 'idle' ? 'Export' : config.label}</span>
        {status === 'idle' && (
          <svg
            className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        )}
      </button>

      {/* Format dropdown */}
      {isOpen && (
        <div className="
          absolute right-0 mt-2 w-40 py-2
          bg-gray-900/95 backdrop-blur-xl
          border border-white/10
          rounded-xl shadow-2xl shadow-black/40
          z-50
        ">
          <div className="px-3 py-1.5 text-[10px] font-semibold text-white/40 uppercase tracking-wider">
            Export Format
          </div>
          {formats.map(format => (
            <button
              key={format}
              onClick={() => handleExport(format)}
              className="
                w-full flex items-center justify-between px-3 py-2
                text-white/70 hover:text-white hover:bg-white/5
                transition-colors text-sm
              "
            >
              <span className="uppercase font-medium">{format}</span>
              <span className="text-xs text-white/30">
                {format === 'svg' && 'Vector'}
                {format === 'png' && '2x'}
                {format === 'jpg' && 'Compressed'}
                {format === 'pdf' && 'Print'}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
