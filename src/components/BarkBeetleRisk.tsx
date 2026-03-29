"use client";

import { useDashboardStore } from "@/hooks/useDashboardStore";
import { getForestData } from "@/data/generateForestData";

export default function BarkBeetleRisk() {
  const currentQuarter = useDashboardStore((s) => s.currentQuarter);
  const data = getForestData();
  const current = data.quarterly[currentQuarter];
  const dd = current.degreeDays;

  const gen1Complete = dd >= 700;
  const gen2Progress = Math.min(100, Math.max(0, ((dd - 700) / 800) * 100));

  return (
    <div className="bg-white border border-forest-border rounded-lg p-4 shadow-sm">
      <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-1 font-heading font-semibold">
        Bark Beetle
      </h3>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl font-bold text-amber-warn font-heading">{dd}</span>
        <span className="text-xs text-gray-500">d.d. cumulative</span>
      </div>
      <div className="space-y-2 text-xs">
        <div>
          <div className="flex justify-between text-gray-500 mb-1">
            <span>1st Generation (700 d.d.)</span>
            <span className={gen1Complete ? "text-danger" : "text-amber-warn"}>
              {gen1Complete ? "COMPLETE" : `${Math.round((dd / 700) * 100)}%`}
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, (dd / 700) * 100)}%`,
                background: gen1Complete
                  ? "#c1121f"
                  : "linear-gradient(90deg, #d4a843, #e0832a)",
              }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-gray-500 mb-1">
            <span>2nd Generation (1500 d.d.)</span>
            <span
              className={
                dd >= 1500 ? "text-danger" : "text-amber-warn"
              }
            >
              {dd >= 1500 ? "COMPLETE" : `${Math.round(gen2Progress)}%`}
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${gen2Progress}%`,
                background:
                  dd >= 1500
                    ? "#c1121f"
                    : "linear-gradient(90deg, #d4a843, #e0832a)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
