"use client";

import { useDashboardStore } from "@/hooks/useDashboardStore";
import { getForestData } from "@/data/generateForestData";

export default function SummaryCards() {
  const currentQuarter = useDashboardStore((s) => s.currentQuarter);
  const data = getForestData();
  const q = data.quarterly[currentQuarter];
  const totalArea = data.zones.reduce((sum, z) => sum + z.area, 0);

  const riskLevel =
    q.avgNdvi < 0.5 ? "CRITICAL" : q.avgNdvi < 0.6 ? "HIGH" : "MODERATE";
  const riskColor =
    riskLevel === "CRITICAL"
      ? "text-danger"
      : riskLevel === "HIGH"
        ? "text-red-400"
        : "text-amber-warn";

  const cards = [
    {
      label: "Area Monitored",
      value: `${totalArea.toLocaleString()} ha`,
      sub: null,
    },
    {
      label: "Dead Trees",
      value: q.totalDeadTrees.toLocaleString(),
      sub: null,
    },
    {
      label: "Canopy Loss (YoY)",
      value: `${q.canopyLoss}%`,
      sub: null,
    },
    {
      label: "Risk Level",
      value: riskLevel,
      sub: riskColor,
    },
    {
      label: "Avg NDVI",
      value: q.avgNdvi.toFixed(2),
      sub: null,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
      {cards.map((c) => (
        <div
          key={c.label}
          className="bg-forest-card border border-forest-border rounded-lg p-3 backdrop-blur-sm"
        >
          <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
            {c.label}
          </div>
          <div
            className={`text-lg font-bold ${c.sub || "text-forest-accent"}`}
          >
            {c.value}
          </div>
        </div>
      ))}
    </div>
  );
}
