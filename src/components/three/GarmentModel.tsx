'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { ModelHotspot } from '@/types';

interface GarmentModelProps {
  modelUrl?: string;
  color: string;
  materialType?: 'cotton' | 'denim' | 'wool' | 'leather' | 'nylon' | 'silk' | 'custom';
  roughness?: number;
  metalness?: number;
  autoRotate?: boolean;
}

// Shader/Material property configurations for different luxury fabrics
const MATERIAL_PRESETS = {
  cotton: { roughness: 0.85, metalness: 0.05, clearcoat: 0 },
  wool: { roughness: 0.95, metalness: 0.02, clearcoat: 0 },
  denim: { roughness: 0.8, metalness: 0.08, clearcoat: 0 },
  leather: { roughness: 0.35, metalness: 0.15, clearcoat: 0.3 },
  silk: { roughness: 0.25, metalness: 0.2, clearcoat: 0.6 },
  nylon: { roughness: 0.4, metalness: 0.1, clearcoat: 0.2 },
  custom: { roughness: 0.7, metalness: 0.1, clearcoat: 0 },
};

function ProceduralMannequinAndGarment({
  color,
  materialType = 'wool',
  autoRotate = false,
}: GarmentModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  const matProps = MATERIAL_PRESETS[materialType] || MATERIAL_PRESETS.wool;

  // Animate slow subtle breathing / rotation if autoRotate is true
  useFrame((state, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]} dispose={null}>
      {/* ─── Coat / Torso Garment ─── */}
      <mesh castShadow receiveShadow position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.38, 0.46, 1.1, 32, 16]} />
        <meshStandardMaterial
          color={color}
          roughness={matProps.roughness}
          metalness={matProps.metalness}
          bumpScale={0.02}
        />
      </mesh>

      {/* ─── Shoulders & Lapel Structure ─── */}
      <mesh castShadow position={[0, 1.35, 0]}>
        <sphereGeometry args={[0.44, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial
          color={color}
          roughness={matProps.roughness}
          metalness={matProps.metalness}
        />
      </mesh>

      {/* Left Sleeve */}
      <mesh castShadow position={[-0.48, 0.85, 0]} rotation={[0, 0, 0.12]}>
        <cylinderGeometry args={[0.13, 0.11, 0.95, 24]} />
        <meshStandardMaterial
          color={color}
          roughness={matProps.roughness}
          metalness={matProps.metalness}
        />
      </mesh>

      {/* Right Sleeve */}
      <mesh castShadow position={[0.48, 0.85, 0]} rotation={[0, 0, -0.12]}>
        <cylinderGeometry args={[0.13, 0.11, 0.95, 24]} />
        <meshStandardMaterial
          color={color}
          roughness={matProps.roughness}
          metalness={matProps.metalness}
        />
      </mesh>

      {/* Coat Collar & Lapel */}
      <mesh position={[0, 1.32, 0.18]} rotation={[0.4, 0, 0]}>
        <boxGeometry args={[0.34, 0.28, 0.08]} />
        <meshStandardMaterial
          color={color}
          roughness={Math.max(0.2, matProps.roughness - 0.1)}
          metalness={matProps.metalness}
        />
      </mesh>

      {/* Inner Turtle-neck Shirt */}
      <mesh position={[0, 1.48, 0]}>
        <cylinderGeometry args={[0.14, 0.15, 0.24, 24]} />
        <meshStandardMaterial color="#171717" roughness={0.9} />
      </mesh>

      {/* ─── Trousers / Lower Base ─── */}
      <mesh castShadow receiveShadow position={[-0.16, -0.15, 0]}>
        <cylinderGeometry args={[0.15, 0.12, 0.85, 24]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.16, -0.15, 0]}>
        <cylinderGeometry args={[0.15, 0.12, 0.85, 24]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
      </mesh>

      {/* Minimal Pedestal Stand */}
      <mesh position={[0, -0.62, 0]} receiveShadow>
        <cylinderGeometry args={[0.55, 0.6, 0.08, 48]} />
        <meshStandardMaterial color="#e5e5e5" roughness={0.4} metalness={0.2} />
      </mesh>
    </group>
  );
}

function ExternalGLTFModel({
  modelUrl,
  color,
  autoRotate,
}: {
  modelUrl: string;
  color: string;
  autoRotate?: boolean;
}) {
  const { scene } = useGLTF(modelUrl);
  const groupRef = useRef<THREE.Group>(null);

  // Clone scene so we don't mutate the cached GLTF across instances
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          mat.color.set(color);
          mesh.material = mat;
        }
      }
    });
    return clone;
  }, [scene, color]);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={[1.5, 1.5, 1.5]}>
      <primitive object={clonedScene} />
    </group>
  );
}

export default function GarmentModel({
  modelUrl,
  color,
  materialType = 'wool',
  autoRotate = false,
}: GarmentModelProps) {
  if (modelUrl) {
    return <ExternalGLTFModel modelUrl={modelUrl} color={color} autoRotate={autoRotate} />;
  }

  return (
    <ProceduralMannequinAndGarment
      color={color}
      materialType={materialType}
      autoRotate={autoRotate}
    />
  );
}
