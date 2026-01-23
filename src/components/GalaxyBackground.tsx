import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Lovable injects `data-lov-*` attributes into JSX elements for editing.
// React Three Fiber interprets dashed props as nested property paths (e.g. `data-lov-id` -> obj.data.lov.id)
// and will crash if the intermediate objects don't exist.
//
// This patch ensures common Three.js instance types have a safe `data.lov` object.
let __lovableThreeDataPatched = false;
function patchPrototypeData(proto: any) {
  if (!proto) return;
  if (Object.getOwnPropertyDescriptor(proto, 'data')) return;

  Object.defineProperty(proto, 'data', {
    configurable: true,
    get() {
      const self = this as any;
      if (!self.__lovableData) self.__lovableData = { lov: {} };
      if (!self.__lovableData.lov) self.__lovableData.lov = {};
      return self.__lovableData;
    },
    set(v) {
      (this as any).__lovableData = v;
    },
  });
}

function ensureLovableThreeDataPatch() {
  if (__lovableThreeDataPatched) return;
  __lovableThreeDataPatched = true;

  patchPrototypeData((THREE as any).Object3D?.prototype);
  patchPrototypeData((THREE as any).Material?.prototype);
  patchPrototypeData((THREE as any).BufferGeometry?.prototype);
  patchPrototypeData((THREE as any).Texture?.prototype);
}

ensureLovableThreeDataPatch();

function StarField({ count = 5000 }) {
  const ref = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 25 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.01) * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

function GalaxySpiral({ count = 8000 }) {
  const ref = useRef<THREE.Points>(null);
  
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    
    const branches = 4;
    const spin = 2;
    const randomness = 0.5;
    const randomnessPower = 3;
    const insideColor = new THREE.Color('#6366f1');
    const outsideColor = new THREE.Color('#ffffff');
    
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 8;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = radius * spin;
      
      const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius;
      const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius * 0.3;
      const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius;
      
      pos[i * 3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      pos[i * 3 + 1] = randomY;
      pos[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
      
      const mixedColor = insideColor.clone();
      mixedColor.lerp(outsideColor, radius / 8);
      
      cols[i * 3] = mixedColor.r;
      cols[i * 3 + 1] = mixedColor.g;
      cols[i * 3 + 2] = mixedColor.b;
    }
    return { positions: pos, colors: cols };
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.9}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function NebulaCloud({ count = 1000 }) {
  const ref = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 15 + 2;
      
      positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 3;
      positions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 5;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = -state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8b5cf6"
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

const GalaxyBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 hidden dark:block">
      <Canvas
        camera={{ position: [0, 3, 12], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.1} />
        <StarField count={3000} />
        <GalaxySpiral count={6000} />
        <NebulaCloud count={800} />
      </Canvas>
    </div>
  );
};

export default GalaxyBackground;
