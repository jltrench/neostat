import { useState, useEffect } from 'react';
import { invoke } from "@tauri-apps/api/core";
import { nanoid } from 'nanoid';
import { useMetrics } from './useMetrics'; // Importe o hook useMetrics
import type { Alert, ChartData, SystemStats } from '@/types';

export function useSystemMonitor() {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [cpuHistory, setCpuHistory] = useState<ChartData[][]>([]);
  const [memoryHistory, setMemoryHistory] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const metrics = useMetrics();


  const checkAlerts = (stats: SystemStats) => {
    const newAlerts: Alert[] = [];
    const avgCpuUsage = stats.cpu_usage.reduce((a, b) => a + b, 0) / stats.cpu_usage.length;

    if (avgCpuUsage > 90) {
      newAlerts.push({
        id: nanoid(),
        type: 'error',
        message: 'High CPU usage detected!',
        timestamp: new Date()
      });
    } else if (avgCpuUsage > 70) {
      newAlerts.push({
        id: nanoid(),
        type: 'warning',
        message: 'CPU usage is getting high',
        timestamp: new Date()
      });
    }

    if (stats.memory_usage > 90) {
      newAlerts.push({
        id: nanoid(),
        type: 'error',
        message: 'Memory usage critical!',
        timestamp: new Date()
      });
    } else if (stats.memory_usage > 70) {
      newAlerts.push({
        id: nanoid(),
        type: 'warning',
        message: 'Memory usage is getting high',
        timestamp: new Date()
      });
    }

    setAlerts(newAlerts);
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const newStats: SystemStats = await invoke("get_system_stats");
        setStats(newStats);
        checkAlerts(newStats);
        setLastUpdate(new Date());

        setCpuHistory(prev => {
          const newHistory = newStats.cpu_usage.map((usage, index) => {
            const cpuData = prev[index] || [];
            if (cpuData.length > 30) cpuData.shift();
            return [
              ...cpuData,
              { name: new Date().toLocaleTimeString(), value: usage }
            ];
          });
          return newHistory;
        });

        setMemoryHistory(prev => {
          if (prev.length > 30) prev.shift();
          return [
            ...prev,
            { name: new Date().toLocaleTimeString(), value: newStats.memory_usage }
          ];
        });

        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    };

    const interval = setInterval(fetchStats, 1000);
    fetchStats();

    return () => clearInterval(interval);
  }, []);

  return {
    stats,
    cpuHistory,
    memoryHistory,
    isLoading,
    error,
    lastUpdate,
    alerts,
    metrics,
  };
}