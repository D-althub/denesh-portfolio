"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function DustParticles() {
  const pointsRef = useRef<THREE.Points>(null!);

  const count = 120;
  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      sc[i] = Math.random() * 0.04 + 0.015;
    }
    return [pos, sc];
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#D4AF37"
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function ThreeAtmosphere() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden opacity-80"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        <DustParticles />
      </Canvas>
    </div>
  );
}
