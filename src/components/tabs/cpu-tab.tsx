import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SystemStats } from "@/types";
import { useMetrics } from "@/hooks/useMetrics";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface CPUTabProps {
  stats: SystemStats;
  metrics: ReturnType<typeof useMetrics>;
  cpuHistory: Array<Array<{ name: string; value: number }>>;
}

export function CPUTab({ stats, metrics, cpuHistory }: CPUTabProps) {
  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle>CPU Cores Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.cpu_usage.map((usage, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Core {index}</span>
                <span className="text-muted-foreground">{usage.toFixed(1)}%</span>
              </div>
              <Progress value={usage} className="h-2" />
              <div className="h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cpuHistory[index] || []}>
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
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={`hsl(${index * 30}, 70%, 50%)`}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}