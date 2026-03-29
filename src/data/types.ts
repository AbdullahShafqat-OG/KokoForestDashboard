export interface ForestZone {
  id: string;
  name: string;
  area: number;
  centroid: [number, number];
  bounds: { x: number; z: number; width: number; depth: number };
  ndvi: number[];
  deadTrees: number[];
  riskLevel: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  changeSinceLastScan: number;
}

export interface DeadTreePoint {
  x: number;
  y: number;
  z: number;
  zoneId: string;
}

export interface QuarterlyData {
  quarter: string;
  year: number;
  q: number;
  totalDeadTrees: number;
  avgNdvi: number;
  canopyLoss: number;
  healthDistribution: {
    healthy: number;
    moderate: number;
    highStress: number;
    critical: number;
  };
  degreeDays: number;
}

export interface ForestData {
  zones: ForestZone[];
  deadTreePoints: DeadTreePoint[];
  quarterly: QuarterlyData[];
  heightmap: number[];
}

export type ViewMode = "health" | "risk";
