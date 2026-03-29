import { ForestZone, DeadTreePoint, QuarterlyData, ForestData } from "./types";

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(42);

const GRID_SIZE = 64;
const TERRAIN_SCALE = 10;
const HEIGHT_SCALE = 1.5;

function generateHeightmap(): number[] {
  const size = GRID_SIZE + 1;
  const map: number[] = new Array(size * size).fill(0);

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const nx = i / size;
      const nz = j / size;
      const h =
        Math.sin(nx * Math.PI * 2) * 0.3 +
        Math.cos(nz * Math.PI * 3) * 0.2 +
        Math.sin((nx + nz) * Math.PI * 4) * 0.15 +
        rand() * 0.2;
      map[i * size + j] = h * HEIGHT_SCALE;
    }
  }
  return map;
}

function getHeight(heightmap: number[], x: number, z: number): number {
  const size = GRID_SIZE + 1;
  const nx = ((x / TERRAIN_SCALE + 0.5) * (size - 1));
  const nz = ((z / TERRAIN_SCALE + 0.5) * (size - 1));
  const ix = Math.min(Math.max(Math.floor(nx), 0), size - 2);
  const iz = Math.min(Math.max(Math.floor(nz), 0), size - 2);
  const fx = nx - ix;
  const fz = nz - iz;
  const h00 = heightmap[ix * size + iz];
  const h10 = heightmap[(ix + 1) * size + iz];
  const h01 = heightmap[ix * size + iz + 1];
  const h11 = heightmap[(ix + 1) * size + iz + 1];
  return h00 * (1 - fx) * (1 - fz) + h10 * fx * (1 - fz) + h01 * (1 - fx) * fz + h11 * fx * fz;
}

const ZONE_NAMES = [
  "Kauppi North", "Kauppi South", "Niihama East", "Niihama West",
  "Pyynikki Ridge", "Hervanta Forest", "Leinola Stand", "Kaukajärvi Shore",
  "Tohloppi Grove", "Ikuri Plantation", "Messukylä Edge", "Kaleva Park",
  "Pispala Slope", "Vuores South", "Hallila Block", "Peltolammi Bog",
  "Multisilta Strip", "Aitolahti Reserve",
];

function generateZones(): ForestZone[] {
  const zones: ForestZone[] = [];
  const cols = 6;
  const rows = 3;
  const cellW = TERRAIN_SCALE / cols;
  const cellD = TERRAIN_SCALE / rows;
  const halfScale = TERRAIN_SCALE / 2;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      if (idx >= 18) break;

      const x = -halfScale + c * cellW + cellW * 0.5;
      const z = -halfScale + r * cellD + cellD * 0.5;
      const area = 300 + rand() * 500;

      const isHotspot = idx === 2 || idx === 3 || idx === 8 || idx === 14 || idx === 11;
      const baseNdvi = isHotspot ? 0.3 + rand() * 0.2 : 0.55 + rand() * 0.25;

      const ndviOverTime: number[] = [];
      const deadTreesOverTime: number[] = [];

      for (let q = 0; q < 16; q++) {
        const degradation = isHotspot
          ? 0.015 * q + rand() * 0.02
          : 0.005 * q + rand() * 0.01;
        const ndvi = Math.max(0.15, baseNdvi - degradation);
        ndviOverTime.push(Math.round(ndvi * 100) / 100);

        const baseDeadTrees = isHotspot ? 200 + rand() * 300 : 20 + rand() * 80;
        const growth = isHotspot ? Math.pow(1.12, q) : Math.pow(1.05, q);
        deadTreesOverTime.push(Math.round(baseDeadTrees * growth));
      }

      const currentNdvi = ndviOverTime[15];
      const currentDead = deadTreesOverTime[15];
      const prevDead = deadTreesOverTime[11];
      const change = prevDead > 0 ? Math.round(((currentDead - prevDead) / prevDead) * 100) : 0;

      let riskLevel: ForestZone["riskLevel"] = "LOW";
      if (currentNdvi < 0.3) riskLevel = "CRITICAL";
      else if (currentNdvi < 0.5) riskLevel = "HIGH";
      else if (currentNdvi < 0.7) riskLevel = "MODERATE";

      zones.push({
        id: `Z-${String(idx + 1).padStart(2, "0")}`,
        name: ZONE_NAMES[idx],
        area: Math.round(area),
        centroid: [x, z],
        bounds: {
          x: -halfScale + c * cellW + 0.05,
          z: -halfScale + r * cellD + 0.05,
          width: cellW - 0.1,
          depth: cellD - 0.1,
        },
        ndvi: ndviOverTime,
        deadTrees: deadTreesOverTime,
        riskLevel,
        changeSinceLastScan: change,
      });
    }
  }
  return zones;
}

function generateDeadTrees(zones: ForestZone[], heightmap: number[]): DeadTreePoint[] {
  const points: DeadTreePoint[] = [];
  const hotspotIds = new Set(["Z-03", "Z-04", "Z-09", "Z-15", "Z-12"]);

  for (const zone of zones) {
    const count = hotspotIds.has(zone.id)
      ? 30 + Math.floor(rand() * 20)
      : 5 + Math.floor(rand() * 10);

    const cx = zone.bounds.x + zone.bounds.width / 2;
    const cz = zone.bounds.z + zone.bounds.depth / 2;

    for (let i = 0; i < count; i++) {
      const clusterOffset = rand() < 0.6 ? 0.3 : 1.0;
      const angle = rand() * Math.PI * 2;
      const dist = rand() * zone.bounds.width * 0.4 * clusterOffset;

      const px = cx + Math.cos(angle) * dist;
      const pz = cz + Math.sin(angle) * dist;
      const py = getHeight(heightmap, px, pz);

      if (
        px >= zone.bounds.x &&
        px <= zone.bounds.x + zone.bounds.width &&
        pz >= zone.bounds.z &&
        pz <= zone.bounds.z + zone.bounds.depth
      ) {
        points.push({ x: px, y: py + 0.05, z: pz, zoneId: zone.id });
      }
    }
  }
  return points;
}

function generateQuarterlyData(zones: ForestZone[]): QuarterlyData[] {
  const quarters: QuarterlyData[] = [];
  const labels = ["Q1", "Q2", "Q3", "Q4"];
  const baseDegDays = [100, 350, 650, 750];

  for (let q = 0; q < 16; q++) {
    const year = 2022 + Math.floor(q / 4);
    const qIdx = q % 4;

    let totalDead = 0;
    let ndviSum = 0;
    let totalArea = 0;

    for (const zone of zones) {
      totalDead += zone.deadTrees[q];
      ndviSum += zone.ndvi[q] * zone.area;
      totalArea += zone.area;
    }

    const avgNdvi = Math.round((ndviSum / totalArea) * 100) / 100;
    const yearFactor = (year - 2022) * 50;
    const degreeDays = Math.min(1600, baseDegDays[qIdx] + yearFactor + Math.round(rand() * 30));

    const healthy = Math.max(30, 78 - q * 1.2 + rand() * 3);
    const critical = Math.min(25, 2 + q * 0.45 + rand() * 1);
    const highStress = Math.min(20, 5 + q * 0.5 + rand() * 1);
    const moderate = 100 - healthy - critical - highStress;

    quarters.push({
      quarter: `${labels[qIdx]} ${year}`,
      year,
      q: qIdx + 1,
      totalDeadTrees: totalDead,
      avgNdvi,
      canopyLoss: Math.round((1 + q * 0.18 + rand() * 0.3) * 10) / 10,
      healthDistribution: {
        healthy: Math.round(healthy),
        moderate: Math.round(moderate),
        highStress: Math.round(highStress),
        critical: Math.round(critical),
      },
      degreeDays,
    });
  }
  return quarters;
}

let cachedData: ForestData | null = null;

export function getForestData(): ForestData {
  if (cachedData) return cachedData;

  const heightmap = generateHeightmap();
  const zones = generateZones();
  const deadTreePoints = generateDeadTrees(zones, heightmap);
  const quarterly = generateQuarterlyData(zones);

  cachedData = { zones, deadTreePoints, quarterly, heightmap };
  return cachedData;
}
