import { create } from "zustand";
import { ViewMode } from "@/data/types";

interface DashboardState {
  selectedZone: string | null;
  hoveredZone: string | null;
  currentQuarter: number;
  viewMode: ViewMode;
  setSelectedZone: (id: string | null) => void;
  setHoveredZone: (id: string | null) => void;
  setCurrentQuarter: (q: number) => void;
  setViewMode: (mode: ViewMode) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  selectedZone: null,
  hoveredZone: null,
  currentQuarter: 15,
  viewMode: "health",
  setSelectedZone: (id) => set({ selectedZone: id }),
  setHoveredZone: (id) => set({ hoveredZone: id }),
  setCurrentQuarter: (q) => set({ currentQuarter: q }),
  setViewMode: (mode) => set({ viewMode: mode }),
}));
