import { useEffect, useState } from 'react';
import { invoke } from "@tauri-apps/api/core";
import { SystemStats } from '@/types';
import { useChartData } from '@/hooks/useChartData';
import { useAlerts } from '@/hooks/useAlerts';

export function useSystemStats() {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const { checkAlerts } = useAlerts();
  const { updateChartData } = useChartData();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const newStats: SystemStats = await invoke("get_system_stats");
        setStats(newStats);
        checkAlerts(newStats);
        updateChartData(newStats);
        setLastUpdate(new Date());
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

  return { stats, lastUpdate, isLoading, error };
}