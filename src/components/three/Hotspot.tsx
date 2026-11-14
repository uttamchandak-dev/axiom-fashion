'use client';

import { Html } from '@react-three/drei';
import { ModelHotspot } from '@/types';

interface HotspotProps {
  hotspot: ModelHotspot;
  active: boolean;
  onSelect: (hotspot: ModelHotspot) => void;
}

export default function Hotspot({ hotspot, active, onSelect }: HotspotProps) {
  return (
    <group position={hotspot.position}>
      <Html distanceFactor={4} center>
        <div className="relative group pointer-events-auto">
          {/* Animated pulse dot */}
          <button
            onClick={() => onSelect(hotspot)}
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${
              active
                ? 'bg-neutral-900 text-white scale-110 shadow-lg'
                : 'bg-white/90 text-neutral-900 shadow-md hover:scale-110'
            }`}
            aria-label={hotspot.label}
          >
            <span
              className={`absolute inset-0 rounded-full animate-ping opacity-30 ${
                active ? 'bg-neutral-900' : 'bg-white'
              }`}
            />
            <span className="w-2 h-2 rounded-full bg-current" />
          </button>

          {/* Popover Callout */}
          {active && (
            <div className="absolute left-8 top-1/2 -translate-y-1/2 w-48 p-3 bg-white/95 backdrop-blur-md border border-neutral-200/80 shadow-xl rounded-xs z-50 text-left animate-fade-in pointer-events-auto">
              <p className="text-[11px] font-medium text-neutral-900 tracking-wide uppercase mb-1">
                {hotspot.label}
              </p>
              <p className="text-[10px] text-neutral-500 font-light leading-relaxed">
                {hotspot.description}
              </p>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}
