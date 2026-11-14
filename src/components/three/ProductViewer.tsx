'use client';

import { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import GarmentModel from './GarmentModel';
import LightingStage from './LightingStage';
import Hotspot from './Hotspot';
import ViewerControls from './ViewerControls';
import { ModelHotspot } from '@/types';
import { CAMERA_PRESETS } from '@/lib/constants';

interface ProductViewerProps {
  modelUrl?: string;
  colorHex?: string;
  materialType?: 'cotton' | 'denim' | 'wool' | 'leather' | 'nylon' | 'silk' | 'custom';
  hotspots?: ModelHotspot[];
  fallbackImage?: string;
  className?: string;
}

// Camera interpolator component
function CameraController({
  targetPos,
  targetLookAt,
}: {
  targetPos: [number, number, number];
  targetLookAt: [number, number, number];
}) {
  const { camera } = useThree();

  useFrame(() => {
    // Smoothly slerp/lerp camera position
    camera.position.lerp(new THREE.Vector3(...targetPos), 0.06);
    camera.lookAt(new THREE.Vector3(...targetLookAt));
  });

  return null;
}

function LoaderOverlay() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-50/80 backdrop-blur-xs z-10">
      <div className="w-8 h-8 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin mb-3" />
      <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 font-medium">
        Loading 3D Studio...
      </span>
    </div>
  );
}

export default function ProductViewer({
  modelUrl,
  colorHex = '#171717',
  materialType = 'wool',
  hotspots = [],
  fallbackImage = '/images/products/overcoat-1.jpg',
  className = '',
}: ProductViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const [preset, setPreset] = useState<'front' | 'back' | 'side' | 'detail'>('front');
  const [autoRotate, setAutoRotate] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<ModelHotspot | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Default camera target & positions based on preset
  const currentCameraConfig = CAMERA_PRESETS[preset === 'side' ? 'left' : preset];
  const cameraPos = activeHotspot ? activeHotspot.cameraPosition : currentCameraConfig.position;
  const cameraTarget = activeHotspot ? activeHotspot.cameraTarget : currentCameraConfig.target;

  const handlePresetChange = (newPreset: 'front' | 'back' | 'side' | 'detail') => {
    setActiveHotspot(null);
    setPreset(newPreset);
  };

  const handleReset = () => {
    setActiveHotspot(null);
    setPreset('front');
    controlsRef.current?.reset();
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[480px] bg-gradient-to-b from-neutral-100 to-neutral-200/60 overflow-hidden select-none ${className}`}
    >
      {/* 3D Canvas */}
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 3], fov: 42 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <Suspense fallback={null}>
          <LightingStage />
          <CameraController targetPos={cameraPos} targetLookAt={cameraTarget} />

          <GarmentModel
            modelUrl={modelUrl}
            color={colorHex}
            materialType={materialType}
            autoRotate={autoRotate}
          />

          {/* Interactive Hotspots */}
          {hotspots.map((h) => (
            <Hotspot
              key={h.id}
              hotspot={h}
              active={activeHotspot?.id === h.id}
              onSelect={(selected) => {
                setActiveHotspot(activeHotspot?.id === selected.id ? null : selected);
              }}
            />
          ))}

          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            minDistance={1.4}
            maxDistance={4.2}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 1.85}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>

      {/* Loading overlay */}
      <Suspense fallback={<LoaderOverlay />}>
        <span />
      </Suspense>

      {/* Floating UI controls toolbar */}
      <ViewerControls
        currentPreset={preset}
        onPresetChange={handlePresetChange}
        autoRotate={autoRotate}
        onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
        onReset={handleReset}
        onToggleFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
      />
    </div>
  );
}
