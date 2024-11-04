import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { SystemStats } from "@/types";
import { useMetrics } from "@/hooks/useMetrics";

interface UptimeCardProps {
  stats: SystemStats;
  metrics: ReturnType<typeof useMetrics>;
}

export function UptimeCard({ stats, metrics }: UptimeCardProps) {
  return (
    <Card className="card border-primary/20 group hover:border-primary/40 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
        <Clock className="w-4 h-4 text-primary group-hover:text-primary/80 transition-colors" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-2xl font-bold">{metrics.formatUptime(stats.uptime)}</p>
          <p className="text-xs text-muted-foreground">Time since last boot</p>
        </div>
      </CardContent>
    </Card>
  );
}