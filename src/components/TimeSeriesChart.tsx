"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDashboardStore } from "@/hooks/useDashboardStore";
import { getForestData } from "@/data/generateForestData";

export default function TimeSeriesChart() {
  const currentQuarter = useDashboardStore((s) => s.currentQuarter);
  const selectedZone = useDashboardStore((s) => s.selectedZone);
  const data = getForestData();

  const chartData = data.quarterly.slice(0, currentQuarter + 1).map((q, i) => {
    if (selectedZone) {
      const zone = data.zones.find((z) => z.id === selectedZone);
      return {
        name: q.quarter,
        deadTrees: zone ? zone.deadTrees[i] : q.totalDeadTrees,
      };
    }
    return { name: q.quarter, deadTrees: q.totalDeadTrees };
  });

  return (
    <div className="bg-forest-card border border-forest-border rounded-lg p-4">
      <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">
        Dead Tree Count 2022–2025
        {selectedZone && (
          <span className="text-forest-accent ml-2">
            ({data.zones.find((z) => z.id === selectedZone)?.name})
          </span>
        )}
      </h3>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="deadTreeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#c1121f" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#c1121f" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2e26" />
          <XAxis
            dataKey="name"
            tick={{ fill: "#6b7280", fontSize: 10 }}
            axisLine={{ stroke: "#1e2e26" }}
            interval={3}
          />
          <YAxis
            tick={{ fill: "#6b7280", fontSize: 10 }}
            axisLine={{ stroke: "#1e2e26" }}
            width={50}
          />
          <Tooltip
            contentStyle={{
              background: "#111916",
              border: "1px solid #1e2e26",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Area
            type="monotone"
            dataKey="deadTrees"
            stroke="#c1121f"
            fill="url(#deadTreeGrad)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
