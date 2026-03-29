"use client";

import { useDashboardStore } from "@/hooks/useDashboardStore";
import { getForestData } from "@/data/generateForestData";
import { useEffect, useState } from "react";

export default function ZoneTooltip() {
  const hoveredZone = useDashboardStore((s) => s.hoveredZone);
  const currentQuarter = useDashboardStore((s) => s.currentQuarter);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  if (!hoveredZone) return null;

  const data = getForestData();
  const zone = data.zones.find((z) => z.id === hoveredZone);
  if (!zone) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 bg-white/95 backdrop-blur-md border border-forest-border rounded-lg px-3 py-2 text-xs shadow-xl"
      style={{
        left: mousePos.x + 12,
        top: mousePos.y - 10,
      }}
    >
      <div className="font-medium text-forest-accent mb-1 font-heading">
        {zone.name}{" "}
        <span className="text-gray-400">{zone.id}</span>
      </div>
      <div className="text-gray-500">
        NDVI: <span className="text-forest-header">{zone.ndvi[currentQuarter]}</span>
      </div>
      <div className="text-gray-500">
        Dead trees:{" "}
        <span className="text-forest-header">
          {zone.deadTrees[currentQuarter].toLocaleString()}
        </span>
      </div>
      <div className="text-gray-500">
        Area: <span className="text-forest-header">{zone.area} ha</span>
      </div>
    </div>
  );
}
