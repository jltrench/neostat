import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MemoryStick } from "lucide-react";
import { SystemStats } from "@/types";
import { useMetrics } from "@/hooks/useMetrics";

interface MemoryCardProps {
  stats: SystemStats;
  metrics: ReturnType<typeof useMetrics>;
}

export function MemoryCard({ stats, metrics }: MemoryCardProps) {
  const memoryPercentage = (stats.memory_used / stats.memory_total) * 100;

  return (
    <Card className="card border-secondary/20 group hover:border-secondary/40 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
        <MemoryStick className="w-4 h-4 text-secondary group-hover:text-secondary/80 transition-colors" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Progress value={memoryPercentage} className="h-2" />
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold value-change">
              {memoryPercentage.toFixed(1)}%
            </p>
            <div className="text-xs text-muted-foreground">
              {metrics.formatBytes(stats.memory_used)} / {metrics.formatBytes(stats.memory_total)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}