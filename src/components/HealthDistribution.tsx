"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useDashboardStore } from "@/hooks/useDashboardStore";
import { getForestData } from "@/data/generateForestData";

const COLORS = ["#428b6F", "#1f5a59", "#d4a843", "#c1121f"];
const LABELS = ["Healthy", "Moderate", "High Stress", "Critical"];

export default function HealthDistribution() {
  const currentQuarter = useDashboardStore((s) => s.currentQuarter);
  const data = getForestData();
  const dist = data.quarterly[currentQuarter].healthDistribution;

  const pieData = [
    { name: LABELS[0], value: dist.healthy },
    { name: LABELS[1], value: dist.moderate },
    { name: LABELS[2], value: dist.highStress },
    { name: LABELS[3], value: dist.critical },
  ];

  return (
    <div className="bg-white border border-forest-border rounded-lg p-4 shadow-sm">
      <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-heading font-semibold">
        Health Distribution
      </h3>
      <div className="flex items-center gap-4">
        <ResponsiveContainer width={120} height={120}>
          <PieChart>
            <Pie
              data={pieData}
              innerRadius={30}
              outerRadius={55}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                fontSize: 12,
                color: "#0b2434",
              }}
              formatter={(value) => `${value}%`}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-1.5 text-xs">
          {pieData.map((d, i) => (
            <div key={d.name} className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: COLORS[i] }}
              />
              <span className="text-gray-500">{d.name}</span>
              <span className="font-medium text-forest-header ml-auto">
                {d.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
