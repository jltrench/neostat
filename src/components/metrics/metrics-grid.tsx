import { SystemStats } from "@/types";
import { useMetrics } from "@/hooks/useMetrics";
import { CPUCard } from "@/components/metrics/cpu-card";
import { MemoryCard } from "@/components/metrics/memory-card";
import { ProcessesCard } from "@/components/metrics/processes-card";
import { UptimeCard } from "@/components/metrics/uptime-card";

interface MetricsGridProps {
  stats: SystemStats;
  metrics: ReturnType<typeof useMetrics>;
}

export function MetricsGrid({ stats, metrics }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <CPUCard stats={stats} metrics={metrics} />
      <MemoryCard stats={stats} metrics={metrics} />
      <ProcessesCard stats={stats} />
      <UptimeCard stats={stats} metrics={metrics} />
    </div>
  );
}