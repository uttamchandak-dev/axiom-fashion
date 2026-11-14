'use client';

import { ContactShadows, Environment } from '@react-three/drei';

export default function LightingStage() {
  return (
    <>
      {/* Soft studio ambient light */}
      <ambientLight intensity={0.7} />

      {/* Main directional key light */}
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-2}
        shadow-camera-right={2}
        shadow-camera-top={2}
        shadow-camera-bottom={-2}
        shadow-bias={-0.0001}
      />

      {/* Fill light */}
      <directionalLight position={[-4, 3, -2]} intensity={0.4} color="#f0f4f8" />

      {/* Warm rim light from back */}
      <directionalLight position={[0, 4, -4]} intensity={0.8} color="#fff8f0" />

      {/* Ground contact shadow */}
      <ContactShadows
        position={[0, -0.66, 0]}
        opacity={0.4}
        scale={6}
        blur={2}
        far={3}
        color="#101010"
      />

      {/* Environment reflections */}
      <Environment preset="city" />
    </>
  );
}
