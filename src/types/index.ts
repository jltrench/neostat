export interface SystemStats {
  cpu_usage: number[];
  memory_used: number;
  memory_total: number;
  memory_usage: number;
  processes_count: number;
  uptime: number;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface Alert {
  id: string;
  type: 'warning' | 'error';
  message: string;
  timestamp: Date;
}

export interface Metrics {
  formatUptime: (seconds: number) => string;
  formatBytes: (bytes: number) => string;
  calculateCPUAverage: (stats: SystemStats) => number;
  getStatusColor: (value: number) => string;
  getMetricTrend: (current: number, previous: number) => {
    direction: 'up' | 'down' | 'stable';
    percentage: number;
  };
}