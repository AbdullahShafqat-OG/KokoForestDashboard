"use client";

import dynamic from "next/dynamic";
import Header from "./Header";
import Footer from "./Footer";
import AnalyticsPanel from "./AnalyticsPanel";
import TimeSlider from "./TimeSlider";
import ZoneTooltip from "./ZoneTooltip";

const ForestMap = dynamic(() => import("./ForestMap"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-forest-bg">
      <div className="text-forest-accent text-sm animate-pulse">
        Loading 3D terrain...
      </div>
    </div>
  ),
});

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen bg-forest-bg text-forest-header">
      <Header />
      <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
        <div className="w-full lg:w-[60%] h-[50vh] lg:h-auto border-b lg:border-b-0 lg:border-r border-forest-border">
          <ForestMap />
        </div>
        <div className="w-full lg:w-[40%] overflow-y-auto">
          <AnalyticsPanel />
        </div>
      </div>
      <TimeSlider />
      <ZoneTooltip />
      <Footer />
    </div>
  );
}
