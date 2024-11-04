import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SystemStats } from "@/types";
import { useMetrics } from "@/hooks/useMetrics";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface MemoryTabProps {
  stats: SystemStats;
  metrics: ReturnType<typeof useMetrics>;
  memoryHistory: Array<{ name: string; value: number }>;
}

export function MemoryTab({ stats, metrics, memoryHistory }: MemoryTabProps) {
  // Calcula a porcentagem de uso de memória
  const memoryPercentage = (stats.memory_used / stats.memory_total) * 100;
  const freeMemoryPercentage = 100 - memoryPercentage;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-secondary/20">
        <CardHeader>
          <CardTitle>Memory Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Used Memory</span>
                <span className="text-muted-foreground">
                  {metrics.formatBytes(stats.memory_used)}
                </span>
              </div>
              <Progress value={memoryPercentage} className="h-4" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Free Memory</span>
                <span className="text-muted-foreground">
                  {metrics.formatBytes(stats.memory_total - stats.memory_used)}
                </span>
              </div>
              <Progress 
                value={freeMemoryPercentage} 
                className="h-4 bg-success/20"
              />
            </div>

            <div className="pt-4 border-t border-border">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Memory</p>
                  <p className="text-2xl font-bold">
                    {metrics.formatBytes(stats.memory_total)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Usage Trend</p>
                  <p className={`text-2xl font-bold ${
                    memoryPercentage > 90 
                      ? 'text-destructive' 
                      : memoryPercentage > 70 
                      ? 'text-warning' 
                      : 'text-success'
                  }`}>
                    {memoryPercentage.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-secondary/20">
        <CardHeader>
          <CardTitle>Memory Usage Pattern</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={memoryHistory}>
                <defs>
                  <linearGradient id="memoryPatternGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="name"
                  className="text-xs"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis
                  domain={[0, 100]}
                  className="text-xs"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem',
                  }}
                  formatter={(value: number) => [`${value.toFixed(1)}%`, 'Memory Usage']}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--secondary))"
                  fillOpacity={1}
                  fill="url(#memoryPatternGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}