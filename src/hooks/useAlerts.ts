import { useState, useCallback, useEffect } from 'react';
import { SystemStats, Alert } from '@/types';
import { nanoid } from 'nanoid';

interface AlertThreshold {
  cpu: number;
  memory: number;
}

export function useAlerts(thresholds: AlertThreshold = { cpu: 90, memory: 90 }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const checkAlerts = useCallback((stats: SystemStats) => {
    const newAlerts: Alert[] = [];
    
    // Check CPU usage
    const avgCpuUsage = stats.cpu_usage.reduce((a, b) => a + b, 0) / stats.cpu_usage.length;
    if (avgCpuUsage > thresholds.cpu) {
      newAlerts.push({
        id: nanoid(),
        type: 'error',
        message: `High CPU usage detected! (${avgCpuUsage.toFixed(1)}%)`,
        timestamp: new Date()
      });
    } else if (avgCpuUsage > thresholds.cpu - 20) {
      newAlerts.push({
        id: nanoid(),
        type: 'warning',
        message: `CPU usage is getting high (${avgCpuUsage.toFixed(1)}%)`,
        timestamp: new Date()
      });
    }
    
    // Check Memory usage
    if (stats.memory_usage > thresholds.memory) {
      newAlerts.push({
        id: nanoid(),
        type: 'error',
        message: `Memory usage critical! (${stats.memory_usage.toFixed(1)}%)`,
        timestamp: new Date()
      });
    } else if (stats.memory_usage > thresholds.memory - 20) {
      newAlerts.push({
        id: nanoid(),
        type: 'warning',
        message: `Memory usage is getting high (${stats.memory_usage.toFixed(1)}%)`,
        timestamp: new Date()
      });
    }
    
    setAlerts(newAlerts);
  }, [thresholds]);

  const clearAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  const clearAllAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  // Limpar alertas antigos automaticamente
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setAlerts(prev => prev.filter(alert => {
        const alertAge = now.getTime() - alert.timestamp.getTime();
        return alertAge < 5000; // Remove alertas mais antigos que 5 segundos
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    alerts,
    checkAlerts,
    clearAlert,
    clearAllAlerts
  };
}