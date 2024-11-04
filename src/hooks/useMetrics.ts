import { useCallback } from 'react';
import type { SystemStats, Metrics } from '@/types';

export function useMetrics(): Metrics {
  const formatUptime = useCallback((seconds: number): string => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    parts.push(`${minutes}m`);
    
    return parts.join(' ');
  }, []);

  const formatBytes = useCallback((bytes: number): string => {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
  }, []);

  const calculateCPUAverage = useCallback((stats: SystemStats): number => {
    return stats.cpu_usage.reduce((a, b) => a + b, 0) / stats.cpu_usage.length;
  }, []);

  const getStatusColor = useCallback((value: number): string => {
    if (value >= 90) return 'destructive';
    if (value >= 70) return 'warning';
    return 'success';
  }, []);

  const getMetricTrend = useCallback((current: number, previous: number) => {
    const diff = current - previous;
    return {
      direction: diff > 0 ? 'up' as const : diff < 0 ? 'down' as const : 'stable' as const,
      percentage: Math.abs((diff / previous) * 100)
    };
  }, []);

  return {
    formatUptime,
    formatBytes,
    calculateCPUAverage,
    getStatusColor,
    getMetricTrend
  };
}