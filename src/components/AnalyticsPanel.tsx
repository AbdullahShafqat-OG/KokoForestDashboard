"use client";

import SummaryCards from "./SummaryCards";
import TimeSeriesChart from "./TimeSeriesChart";
import HealthDistribution from "./HealthDistribution";
import RiskHotspotsTable from "./RiskHotspotsTable";
import BarkBeetleRisk from "./BarkBeetleRisk";

export default function AnalyticsPanel() {
  return (
    <div className="flex flex-col gap-3 p-4">
      <SummaryCards />
      <TimeSeriesChart />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
        <HealthDistribution />
        <BarkBeetleRisk />
      </div>
      <RiskHotspotsTable />
    </div>
  );
}
