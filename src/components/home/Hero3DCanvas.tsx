'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

function FloatingHeroMannequin() {
  const groupRef = useRef<THREE.Group>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Gentle auto-spin
      groupRef.current.rotation.y += delta * 0.25;
      // Subtle mouse tracking parallax
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mousePos.y * 0.15, 0.05);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -mousePos.x * 0.15, 0.05);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} position={[0, -0.3, 0]} scale={[1.1, 1.1, 1.1]}>
        {/* Luxury Overcoat Torso */}
        <mesh castShadow receiveShadow position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.38, 0.46, 1.1, 32, 16]} />
          <meshStandardMaterial
            color="#141414"
            roughness={0.88}
            metalness={0.05}
          />
        </mesh>

        {/* Shoulders */}
        <mesh castShadow position={[0, 1.35, 0]}>
          <sphereGeometry args={[0.44, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshStandardMaterial color="#141414" roughness={0.88} />
        </mesh>

        {/* Left Sleeve */}
        <mesh castShadow position={[-0.48, 0.85, 0]} rotation={[0, 0, 0.12]}>
          <cylinderGeometry args={[0.13, 0.11, 0.95, 24]} />
          <meshStandardMaterial color="#141414" roughness={0.88} />
        </mesh>

        {/* Right Sleeve */}
        <mesh castShadow position={[0.48, 0.85, 0]} rotation={[0, 0, -0.12]}>
          <cylinderGeometry args={[0.13, 0.11, 0.95, 24]} />
          <meshStandardMaterial color="#141414" roughness={0.88} />
        </mesh>

        {/* Collar & Lapel */}
        <mesh position={[0, 1.32, 0.18]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[0.34, 0.28, 0.08]} />
          <meshStandardMaterial color="#1f1f1f" roughness={0.7} />
        </mesh>

        {/* Inner Turtleneck with warm accent tone */}
        <mesh position={[0, 1.48, 0]}>
          <cylinderGeometry args={[0.14, 0.15, 0.24, 24]} />
          <meshStandardMaterial color="#8b7355" roughness={0.6} />
        </mesh>

        {/* Floating Halo Ring */}
        <mesh position={[0, 1.7, 0]} rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[0.45, 0.008, 16, 100]} />
          <meshStandardMaterial color="#ffffff" opacity={0.6} transparent roughness={0.1} />
        </mesh>
      </group>
    </Float>
  );
}

export default function Hero3DCanvas() {
  return (
    <div className="absolute inset-0 z-[2] pointer-events-none opacity-80 md:opacity-100">
      <Canvas
        camera={{ position: [1.2, 0.8, 3.2], fov: 38 }}
        dpr={[1, 1.5]}
        className="w-full h-full"
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-4, 2, -2]} intensity={0.5} color="#dbeafe" />
        <directionalLight position={[0, -2, 2]} intensity={0.4} color="#fef3c7" />

        <Suspense fallback={null}>
          <FloatingHeroMannequin />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
