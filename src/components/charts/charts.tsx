import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  name: string;
  value: number;
}

interface ChartCardProps {
  title: string;
  data: ChartData[];
  color: string;
  gradientId: string;
}

export function ChartCard({ title, data, color, gradientId }: ChartCardProps) {
  // Verificar se temos dados válidos
  if (!data || data.length === 0) {
    return (
      <Card className={`card border-${color}/20`}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            No data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`card border-${color}/20`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={`hsl(var(--${color}))`} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={`hsl(var(--${color}))`} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                className="stroke-muted" 
                vertical={false}
              />
              <XAxis
                dataKey="name"
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => value.split(' ')[1] || value} // Mostra apenas a hora
              />
              <YAxis
                domain={[0, 100]}
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem',
                }}
                formatter={(value: number) => [`${value.toFixed(1)}%`, 'Usage']}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={`hsl(var(--${color}))`}
                fill={`url(#${gradientId})`}
                fillOpacity={1}
                isAnimationActive={true}
                animationDuration={300}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function ChartsGrid({ cpuData, memoryData }: {
  cpuData: ChartData[];
  memoryData: ChartData[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartCard
        title="CPU Usage History"
        data={cpuData}
        color="primary"
        gradientId="cpuGradient"
      />
      <ChartCard
        title="Memory Usage History"
        data={memoryData}
        color="secondary"
        gradientId="memoryGradient"
      />
    </div>
  );
}