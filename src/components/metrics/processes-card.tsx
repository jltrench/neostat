import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { SystemStats } from "@/types";

interface ProcessesCardProps {
  stats: SystemStats;
}

export function ProcessesCard({ stats }: ProcessesCardProps) {
  return (
    <Card className="card border-accent/20 group hover:border-accent/40 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Processes</CardTitle>
        <Activity className="w-4 h-4 text-accent group-hover:text-accent/80 transition-colors" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-2xl font-bold value-change">{stats.processes_count}</p>
          <p className="text-xs text-muted-foreground">Active processes</p>
        </div>
      </CardContent>
    </Card>
  );
}