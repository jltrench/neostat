import { useState, useCallback } from 'react';
import { SystemStats, ChartData } from '@/types';

const MAX_HISTORY_LENGTH = 30;

export function useChartData() {
  const [cpuHistory, setCpuHistory] = useState<ChartData[][]>([]);
  const [memoryHistory, setMemoryHistory] = useState<ChartData[]>([]);

  const updateChartData = useCallback((stats: SystemStats) => {
    setCpuHistory(prev => {
      const newHistory = stats.cpu_usage.map((usage, index) => {
        const cpuData = prev[index] || [];
        const newData = [
          ...cpuData,
          { name: new Date().toLocaleTimeString(), value: usage }
        ];
        
        if (newData.length > MAX_HISTORY_LENGTH) {
          return newData.slice(-MAX_HISTORY_LENGTH);
        }
        return newData;
      });
      return newHistory;
    });

    setMemoryHistory(prev => {
      const newData = [
        ...prev,
        { name: new Date().toLocaleTimeString(), value: stats.memory_usage }
      ];
      
      if (newData.length > MAX_HISTORY_LENGTH) {
        return newData.slice(-MAX_HISTORY_LENGTH);
      }
      return newData;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setCpuHistory([]);
    setMemoryHistory([]);
  }, []);

  const getChartGradient = useCallback((color: string) => {
    return [
      { offset: '5%', color, opacity: 0.3 },
      { offset: '95%', color, opacity: 0 }
    ];
  }, []);

  return {
    cpuHistory,
    memoryHistory,
    updateChartData,
    clearHistory,
    getChartGradient
  };
}