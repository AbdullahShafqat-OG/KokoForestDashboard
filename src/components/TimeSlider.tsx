"use client";

import { useDashboardStore } from "@/hooks/useDashboardStore";

const LABELS = [
  "Q1 '22", "Q2 '22", "Q3 '22", "Q4 '22",
  "Q1 '23", "Q2 '23", "Q3 '23", "Q4 '23",
  "Q1 '24", "Q2 '24", "Q3 '24", "Q4 '24",
  "Q1 '25", "Q2 '25", "Q3 '25", "Q4 '25",
];

export default function TimeSlider() {
  const currentQuarter = useDashboardStore((s) => s.currentQuarter);
  const setCurrentQuarter = useDashboardStore((s) => s.setCurrentQuarter);
  const viewMode = useDashboardStore((s) => s.viewMode);
  const setViewMode = useDashboardStore((s) => s.setViewMode);

  return (
    <div className="bg-white border-t border-forest-border px-6 py-3">
      <div className="flex items-center gap-4">
        <button
          onClick={() =>
            setViewMode(viewMode === "health" ? "risk" : "health")
          }
          className={`text-xs px-3 py-1.5 rounded-md border transition-colors shrink-0 font-heading font-semibold ${
            viewMode === "risk"
              ? "bg-danger/10 border-danger/40 text-danger"
              : "bg-forest-green/10 border-forest-green/40 text-forest-green"
          }`}
        >
          {viewMode === "health" ? "Health View" : "Risk View"}
        </button>
        <div className="flex-1 flex items-center gap-3">
          <span className="text-[10px] text-gray-500 shrink-0 w-14 font-heading font-semibold">
            {LABELS[currentQuarter]}
          </span>
          <input
            type="range"
            min={0}
            max={15}
            value={currentQuarter}
            onChange={(e) => setCurrentQuarter(Number(e.target.value))}
            className="flex-1 h-1.5 appearance-none rounded-full bg-forest-border cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-forest-green
              [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-forest-teal
              [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
          />
          <span className="text-[10px] text-gray-500 shrink-0 font-heading">2022-2025</span>
        </div>
      </div>
    </div>
  );
}
