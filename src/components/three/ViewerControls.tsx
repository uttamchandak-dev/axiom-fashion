'use client';

import ARButton from './ARButton';

interface ViewerControlsProps {
  currentPreset: string;
  onPresetChange: (preset: 'front' | 'back' | 'side' | 'detail') => void;
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  onReset: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

export default function ViewerControls({
  currentPreset,
  onPresetChange,
  autoRotate,
  onToggleAutoRotate,
  onReset,
  onToggleFullscreen,
  isFullscreen,
}: ViewerControlsProps) {
  return (
    <div className="absolute inset-x-4 bottom-4 flex items-center justify-between pointer-events-none z-20 gap-2">
      {/* Camera angle presets */}
      <div className="flex items-center gap-1.5 bg-white/85 backdrop-blur-md px-2.5 py-1.5 rounded-xs border border-neutral-200/60 shadow-sm pointer-events-auto">
        {(['front', 'side', 'back', 'detail'] as const).map((preset) => (
          <button
            key={preset}
            onClick={() => onPresetChange(preset)}
            className={`px-2.5 py-1 text-[10px] tracking-[0.14em] uppercase font-medium rounded-xs transition-colors ${
              currentPreset === preset
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-1.5 pointer-events-auto">
        {/* AR Quick View */}
        <ARButton className="!py-1.5 !px-3" />

        {/* Auto rotate toggle */}
        <button
          onClick={onToggleAutoRotate}
          className={`p-2 rounded-xs border border-neutral-200/60 shadow-sm backdrop-blur-md transition-colors ${
            autoRotate
              ? 'bg-neutral-900 text-white'
              : 'bg-white/85 text-neutral-700 hover:bg-white'
          }`}
          title={autoRotate ? 'Pause Rotation' : 'Auto Rotate'}
          aria-label="Toggle auto rotation"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
        </button>

        {/* Reset Camera */}
        <button
          onClick={onReset}
          className="p-2 rounded-xs border border-neutral-200/60 shadow-sm bg-white/85 backdrop-blur-md text-neutral-700 hover:bg-white transition-colors"
          title="Reset Camera"
          aria-label="Reset camera"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>

        {/* Fullscreen */}
        <button
          onClick={onToggleFullscreen}
          className="p-2 rounded-xs border border-neutral-200/60 shadow-sm bg-white/85 backdrop-blur-md text-neutral-700 hover:bg-white transition-colors"
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          aria-label="Toggle fullscreen"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            {isFullscreen ? (
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
            ) : (
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            )}
          </svg>
        </button>
      </div>
    </div>
  );
}
