"use client";

import { useRef, useMemo, useCallback, useEffect } from "react";
import * as THREE from "three";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useDashboardStore } from "@/hooks/useDashboardStore";
import { getForestData } from "@/data/generateForestData";

const GRID_SIZE = 64;
const TERRAIN_SCALE = 10;

function ndviToHealthColor(ndvi: number): THREE.Color {
  if (ndvi >= 0.7) return new THREE.Color("#1b4332");
  if (ndvi >= 0.5) return new THREE.Color("#6b8f3a");
  if (ndvi >= 0.3) return new THREE.Color("#d4a843");
  return new THREE.Color("#c1121f");
}

function ndviToRiskColor(ndvi: number): THREE.Color {
  if (ndvi >= 0.7) return new THREE.Color("#2d6a4f");
  if (ndvi >= 0.5) return new THREE.Color("#d4a843");
  if (ndvi >= 0.3) return new THREE.Color("#e0832a");
  return new THREE.Color("#c1121f");
}

export default function Terrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  const currentQuarter = useDashboardStore((s) => s.currentQuarter);
  const viewMode = useDashboardStore((s) => s.viewMode);
  const selectedZone = useDashboardStore((s) => s.selectedZone);
  const setSelectedZone = useDashboardStore((s) => s.setSelectedZone);
  const setHoveredZone = useDashboardStore((s) => s.setHoveredZone);
  const data = getForestData();

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(
      TERRAIN_SCALE,
      TERRAIN_SCALE,
      GRID_SIZE,
      GRID_SIZE
    );
    geo.rotateX(-Math.PI / 2);

    const positions = geo.attributes.position;
    const size = GRID_SIZE + 1;

    for (let i = 0; i < positions.count; i++) {
      const ix = Math.floor(i / size);
      const iz = i % size;
      const h = data.heightmap[ix * size + iz] || 0;
      positions.setY(i, h);
    }

    positions.needsUpdate = true;
    geo.computeVertexNormals();

    const colors = new Float32Array(positions.count * 3);
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    return geo;
  }, [data.heightmap]);

  useMemo(() => {
    if (!geometry) return;
    const positions = geometry.attributes.position;
    const colors = geometry.attributes.color;
    const halfScale = TERRAIN_SCALE / 2;
    const colorFn = viewMode === "health" ? ndviToHealthColor : ndviToRiskColor;

    for (let i = 0; i < positions.count; i++) {
      const px = positions.getX(i);
      const pz = positions.getZ(i);

      let zone = data.zones.find(
        (z) =>
          px >= z.bounds.x &&
          px <= z.bounds.x + z.bounds.width &&
          pz >= z.bounds.z &&
          pz <= z.bounds.z + z.bounds.depth
      );

      let color: THREE.Color;
      if (zone) {
        const ndvi = zone.ndvi[currentQuarter];
        color = colorFn(ndvi);
        if (selectedZone === zone.id) {
          color = color.clone().lerp(new THREE.Color("#ffffff"), 0.2);
        }
      } else {
        color = new THREE.Color("#0d1f17");
      }

      colors.setXYZ(i, color.r, color.g, color.b);
    }
    colors.needsUpdate = true;
  }, [geometry, currentQuarter, viewMode, selectedZone, data.zones]);

  const findZone = useCallback(
    (point: THREE.Vector3) => {
      return data.zones.find(
        (z) =>
          point.x >= z.bounds.x &&
          point.x <= z.bounds.x + z.bounds.width &&
          point.z >= z.bounds.z &&
          point.z <= z.bounds.z + z.bounds.depth
      );
    },
    [data.zones]
  );

  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      if (e.point) {
        const zone = findZone(e.point);
        setSelectedZone(zone ? (selectedZone === zone.id ? null : zone.id) : null);
      }
    },
    [findZone, selectedZone, setSelectedZone]
  );

  const handlePointerMove = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (e.point) {
        const zone = findZone(e.point);
        setHoveredZone(zone ? zone.id : null);
      }
    },
    [findZone, setHoveredZone]
  );

  const handlePointerLeave = useCallback(() => {
    setHoveredZone(null);
  }, [setHoveredZone]);

  const deadTreesGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(data.deadTreePoints.length * 3);
    data.deadTreePoints.forEach((p, i) => {
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    });
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [data.deadTreePoints]);

  const gridLineGeos = useMemo(() => {
    return data.zones.map((zone) => {
      const { x, z, width, depth } = zone.bounds;
      const y = 0.02;
      const pts = [x, y, z, x + width, y, z, x + width, y, z + depth, x, y, z + depth, x, y, z];
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts), 3));
      return geo;
    });
  }, [data.zones]);

  return (
    <group>
      <mesh
        ref={meshRef}
        geometry={geometry}
        onClick={handleClick}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <meshStandardMaterial vertexColors side={THREE.DoubleSide} />
      </mesh>

      {gridLineGeos.map((geo, i) => (
        <lineLoop key={i} geometry={geo}>
          <lineBasicMaterial color="#2d6a4f" opacity={0.3} transparent />
        </lineLoop>
      ))}

      <points geometry={deadTreesGeo}>
        <pointsMaterial
          color="#ff2020"
          size={0.06}
          sizeAttenuation
          transparent
          opacity={0.8}
        />
      </points>
    </group>
  );
}
