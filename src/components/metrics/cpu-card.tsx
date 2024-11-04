import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Cpu } from "lucide-react";
import { SystemStats } from "@/types";
import { useMetrics } from "@/hooks/useMetrics";

interface CPUCardProps {
  stats: SystemStats;
  metrics: ReturnType<typeof useMetrics>;
}

export function CPUCard({ stats, metrics }: CPUCardProps) {
  const avgCpuUsage = metrics.calculateCPUAverage(stats);
  
  return (
    <Card className="card border-primary/20 group hover:border-primary/40 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
        <Cpu className="w-4 h-4 text-primary group-hover:text-primary/80 transition-colors" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Progress
            value={avgCpuUsage}
            className="h-2"
          />
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold value-change">
              {avgCpuUsage.toFixed(1)}%
            </p>
            <Badge variant="outline" className="border-primary/20">
              {stats.cpu_usage.length} cores
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}