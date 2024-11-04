import { SystemStats } from "@/types";
import { useMetrics } from "@/hooks/useMetrics";
import { MetricsGrid } from "@/components/metrics/metrics-grid";
import { ChartsGrid } from "@/components/charts/charts";

interface ChartData {
  name: string;
  value: number;
}

interface OverviewTabProps {
  stats: SystemStats;
  metrics: ReturnType<typeof useMetrics>;
  cpuHistory: ChartData[][];
  memoryHistory: ChartData[];
}

export function OverviewTab({
  stats,
  metrics,
  cpuHistory,
  memoryHistory,
}: OverviewTabProps) {
  const firstCoreHistory = cpuHistory[0] || [];
  
  console.log('CPU History:', firstCoreHistory); // Para debug
  console.log('Memory History:', memoryHistory); // Para debug

  return (
    <div className="space-y-6">
      <MetricsGrid stats={stats} metrics={metrics} />
      {(firstCoreHistory.length > 0 || memoryHistory.length > 0) && (
        <ChartsGrid 
          cpuData={firstCoreHistory}
          memoryData={memoryHistory}
        />
      )}
    </div>
  );
}