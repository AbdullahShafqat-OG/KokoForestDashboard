"use client";

import { useDashboardStore } from "@/hooks/useDashboardStore";
import { getForestData } from "@/data/generateForestData";

export default function RiskHotspotsTable() {
  const currentQuarter = useDashboardStore((s) => s.currentQuarter);
  const selectedZone = useDashboardStore((s) => s.selectedZone);
  const setSelectedZone = useDashboardStore((s) => s.setSelectedZone);
  const data = getForestData();

  const sorted = [...data.zones]
    .sort((a, b) => b.deadTrees[currentQuarter] - a.deadTrees[currentQuarter])
    .slice(0, 5);

  const riskColor = (level: string) => {
    switch (level) {
      case "CRITICAL":
        return "text-danger";
      case "HIGH":
        return "text-red-400";
      case "MODERATE":
        return "text-amber-warn";
      default:
        return "text-forest-accent";
    }
  };

  return (
    <div className="bg-white border border-forest-border rounded-lg p-4 shadow-sm">
      <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-heading font-semibold">
        Risk Hotspots
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-gray-500 border-b border-forest-border">
              <th className="text-left py-1.5 font-medium font-heading">Zone</th>
              <th className="text-right py-1.5 font-medium font-heading">Area</th>
              <th className="text-right py-1.5 font-medium font-heading">Dead</th>
              <th className="text-right py-1.5 font-medium font-heading">Risk</th>
              <th className="text-right py-1.5 font-medium font-heading">Change</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((zone) => (
              <tr
                key={zone.id}
                onClick={() =>
                  setSelectedZone(
                    selectedZone === zone.id ? null : zone.id
                  )
                }
                className={`border-b border-forest-border/50 cursor-pointer transition-colors hover:bg-forest-green/10 ${
                  selectedZone === zone.id ? "bg-forest-green/20" : ""
                }`}
              >
                <td className="py-1.5">
                  <span className="text-forest-header">{zone.name}</span>
                  <span className="text-gray-400 ml-1">{zone.id}</span>
                </td>
                <td className="text-right text-gray-500">{zone.area} ha</td>
                <td className="text-right text-forest-header">
                  {zone.deadTrees[currentQuarter].toLocaleString()}
                </td>
                <td className={`text-right font-medium ${riskColor(zone.riskLevel)}`}>
                  {zone.riskLevel}
                </td>
                <td className="text-right">
                  <span
                    className={
                      zone.changeSinceLastScan > 20
                        ? "text-danger"
                        : "text-amber-warn"
                    }
                  >
                    +{zone.changeSinceLastScan}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
