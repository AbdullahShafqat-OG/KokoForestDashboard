"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Terrain from "./Terrain";

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#1f5a59" wireframe />
    </mesh>
  );
}

export default function ForestMap() {
  return (
    <div className="relative w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [8, 6, 8], fov: 45, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: "#ffffff" }}
      >
        <color attach="background" args={["#ffffff"]} />
        <fog attach="fog" args={["#ffffff", 12, 25]} />
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 8, 3]}
          intensity={0.8}
          castShadow={false}
        />
        <directionalLight position={[-3, 5, -5]} intensity={0.3} />
        <Suspense fallback={<LoadingFallback />}>
          <Terrain />
        </Suspense>
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={3}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
      <div className="absolute bottom-3 left-3 flex gap-2 text-[10px] text-gray-700 bg-white/90 backdrop-blur-sm rounded-md px-3 py-1.5 shadow-sm">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#1b4332]" /> Healthy
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#6b8f3a]" /> Moderate
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#d4a843]" /> Stressed
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#c1121f]" /> Critical
        </span>
        <span className="flex items-center gap-1 ml-2">
          <span className="w-2 h-2 bg-[#ff2020]" /> Dead trees
        </span>
      </div>
    </div>
  );
}
