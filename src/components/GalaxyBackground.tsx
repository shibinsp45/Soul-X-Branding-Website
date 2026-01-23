import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';

// ============================================================================
// ROBUST PROXY PATCH FOR LOVABLE DATA-LOV-* ATTRIBUTES
// ============================================================================
// Lovable injects `data-lov-*` attributes into JSX elements for editing.
// React Three Fiber interprets dashed props as nested property paths:
//   data-lov-path → instance.data.lov.path
// R3F walks the path via reduce: keys.reduce((acc, k) => acc[k], instance)
// If any intermediate is undefined, it crashes.
//
// This patch creates a deep auto-vivifying Proxy on `data.lov` so any access
// like `data.lov.path.anything.more` never throws—missing nodes become objects.
// ============================================================================

let __lovableThreeDataPatched = false;

// Create a deeply auto-vivifying proxy that returns itself for any property access
function createAutoVivifyingProxy(): any {
  const handler: ProxyHandler<object> = {
    get(target, prop) {
      if (prop === Symbol.toPrimitive || prop === 'valueOf' || prop === 'toString') {
        return () => '';
      }
      if (prop === Symbol.toStringTag) {
        return 'LovableDataProxy';
      }
      if (!(prop in target)) {
        (target as any)[prop] = new Proxy({}, handler);
      }
      return (target as any)[prop];
    },
    set(target, prop, value) {
      (target as any)[prop] = value;
      return true;
    },
  };
  return new Proxy({}, handler);
}

function patchPrototypeData(proto: any) {
  if (!proto) return;

  // Get existing descriptor if any
  const existingDescriptor = Object.getOwnPropertyDescriptor(proto, 'data');

  // Storage key for our internal data
  const storageKey = '__lovableData';

  Object.defineProperty(proto, 'data', {
    configurable: true,
    enumerable: false,
    get() {
      // Check if we already have our storage object
      if (!this[storageKey]) {
        // If there was an existing getter, try to get its value
        let existingData = {};
        if (existingDescriptor?.get) {
          try {
            existingData = existingDescriptor.get.call(this) || {};
          } catch {
            existingData = {};
          }
        }
        // Create our storage with the existing data merged in
        this[storageKey] = { ...existingData };
      }
      // Ensure .lov exists and is an auto-vivifying proxy
      if (!this[storageKey].lov || typeof this[storageKey].lov !== 'object') {
        this[storageKey].lov = createAutoVivifyingProxy();
      }
      return this[storageKey];
    },
    set(v) {
      if (!this[storageKey]) {
        this[storageKey] = {};
      }
      // Merge the new value but preserve our lov proxy
      const lovProxy = this[storageKey].lov || createAutoVivifyingProxy();
      if (typeof v === 'object' && v !== null) {
        Object.assign(this[storageKey], v);
      } else {
        this[storageKey] = { value: v };
      }
      this[storageKey].lov = lovProxy;
    },
  });
}

function ensureLovableThreeDataPatch() {
  if (__lovableThreeDataPatched) return;
  __lovableThreeDataPatched = true;

  // Patch all relevant Three.js prototypes
  const prototypesToPatch = [
    (THREE as any).Object3D?.prototype,
    (THREE as any).Material?.prototype,
    (THREE as any).BufferGeometry?.prototype,
    (THREE as any).Texture?.prototype,
    (THREE as any).EventDispatcher?.prototype,
    (THREE as any).BufferAttribute?.prototype,
    (THREE as any).InterleavedBufferAttribute?.prototype,
  ];

  prototypesToPatch.forEach(patchPrototypeData);
}

// Run patch immediately at module load time (before Canvas mounts)
ensureLovableThreeDataPatch();

// ============================================================================
// WEBGL SUPPORT CHECK
// ============================================================================
function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch {
    return false;
  }
}

// ============================================================================
// GALAXY COMPONENTS
// ============================================================================

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

// ============================================================================
// SHOOTING STARS WITH BURSTS (Performance-optimized with refs)
// ============================================================================

interface ShootingStar {
  id: number;
  start: [number, number, number];
  end: [number, number, number];
  progress: number;
  speed: number;
  opacity: number;
  willBurst: boolean;
}

interface Burst {
  id: number;
  center: [number, number, number];
  particles: { offset: [number, number, number]; velocity: [number, number, number] }[];
  progress: number;
  opacity: number;
}

function ShootingStarsWithBursts({ reducedMotion }: { reducedMotion: boolean }) {
  const starsRef = useRef<ShootingStar[]>([]);
  const burstsRef = useRef<Burst[]>([]);
  const nextIdRef = useRef(0);
  const [, forceUpdate] = useState(0);
  const lastSpawnRef = useRef(0);

  // Spawn new stars periodically
  useFrame((state) => {
    if (reducedMotion) return;

    const now = state.clock.getElapsedTime() * 1000;
    
    // Spawn logic (every ~800ms with 30% chance)
    if (now - lastSpawnRef.current > 800) {
      lastSpawnRef.current = now;
      if (Math.random() > 0.7) {
        const x = (Math.random() - 0.5) * 30;
        const y = Math.random() * 10 + 5;
        const z = (Math.random() - 0.5) * 20;
        
        const angle = Math.random() * Math.PI * 0.5 + Math.PI * 0.25;
        const length = Math.random() * 3 + 2;
        
        const newStar: ShootingStar = {
          id: nextIdRef.current++,
          start: [x, y, z],
          end: [x + Math.cos(angle) * length, y - Math.sin(angle) * length, z],
          progress: 0,
          speed: Math.random() * 0.02 + 0.015,
          opacity: 1,
          willBurst: Math.random() < 0.25, // 25% chance to burst
        };
        
        starsRef.current.push(newStar);
      }
    }

    // Update stars
    const completedStars: ShootingStar[] = [];
    starsRef.current = starsRef.current.filter(star => {
      star.progress += star.speed;
      star.opacity = star.progress > 0.7 ? 1 - (star.progress - 0.7) / 0.3 : 1;
      
      if (star.progress >= 1) {
        if (star.willBurst) {
          completedStars.push(star);
        }
        return false;
      }
      return true;
    });

    // Spawn bursts for completed stars
    completedStars.forEach(star => {
      const particles = [];
      const particleCount = 6 + Math.floor(Math.random() * 4);
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2 + Math.random() * 0.3;
        const speed = 0.02 + Math.random() * 0.02;
        particles.push({
          offset: [0, 0, 0] as [number, number, number],
          velocity: [
            Math.cos(angle) * speed,
            Math.sin(angle) * speed * 0.5 + Math.random() * 0.01,
            (Math.random() - 0.5) * speed * 0.3,
          ] as [number, number, number],
        });
      }
      
      burstsRef.current.push({
        id: nextIdRef.current++,
        center: star.end,
        particles,
        progress: 0,
        opacity: 1,
      });
    });

    // Update bursts
    burstsRef.current = burstsRef.current.filter(burst => {
      burst.progress += 0.03;
      burst.opacity = 1 - burst.progress;
      
      burst.particles.forEach(p => {
        p.offset[0] += p.velocity[0];
        p.offset[1] += p.velocity[1];
        p.offset[2] += p.velocity[2];
        // Slow down
        p.velocity[0] *= 0.95;
        p.velocity[1] *= 0.95;
        p.velocity[2] *= 0.95;
      });
      
      return burst.progress < 1;
    });

    // Force re-render when we have visual changes
    forceUpdate(n => n + 1);
  });

  if (reducedMotion) return null;

  return (
    <>
      {/* Shooting star streaks */}
      {starsRef.current.map(star => {
        const currentPos: [number, number, number] = [
          star.start[0] + (star.end[0] - star.start[0]) * star.progress,
          star.start[1] + (star.end[1] - star.start[1]) * star.progress,
          star.start[2] + (star.end[2] - star.start[2]) * star.progress,
        ];
        
        const tailLength = 0.15;
        const tailStart = Math.max(0, star.progress - tailLength);
        const tailPos: [number, number, number] = [
          star.start[0] + (star.end[0] - star.start[0]) * tailStart,
          star.start[1] + (star.end[1] - star.start[1]) * tailStart,
          star.start[2] + (star.end[2] - star.start[2]) * tailStart,
        ];

        return (
          <Line
            key={star.id}
            points={[tailPos, currentPos]}
            color="#ffffff"
            lineWidth={2}
            transparent
            opacity={star.opacity * 0.8}
          />
        );
      })}

      {/* Burst particles */}
      {burstsRef.current.map(burst => (
        <group key={burst.id} position={burst.center}>
          {burst.particles.map((particle, i) => (
            <mesh key={i} position={particle.offset}>
              <sphereGeometry args={[0.02, 4, 4]} />
              <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={burst.opacity * 0.9}
              />
            </mesh>
          ))}
        </group>
      ))}
    </>
  );
}

// ============================================================================
// MAIN COMPONENT WITH DARK MODE GATING
// ============================================================================

const GalaxyBackground: React.FC = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [webGLSupported] = useState(() => isWebGLSupported());

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Watch for dark mode changes via MutationObserver
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    // Initial check
    checkDarkMode();

    // Watch for class changes on <html>
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkDarkMode();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  // Only render Canvas in dark mode with WebGL support
  if (!isDarkMode || !webGLSupported) {
    return null;
  }

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 3, 12], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.1} />
        <StarField count={3000} />
        <GalaxySpiral count={6000} />
        <NebulaCloud count={800} />
        <ShootingStarsWithBursts reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
};

export default GalaxyBackground;
