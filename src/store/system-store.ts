import { create } from 'zustand';
import { SystemStats, ChartData, Alert } from '@/types';

interface SystemStore {
  stats: SystemStats | null;
  cpuHistory: ChartData[][];
  memoryHistory: ChartData[];
  alerts: Alert[];
  theme: string;
  isFullscreen: boolean;
  setStats: (stats: SystemStats) => void;
  addAlert: (alert: Alert) => void;
  clearAlert: (id: string) => void;
  setTheme: (theme: string) => void;
  toggleFullscreen: () => void;
}

export const useSystemStore = create<SystemStore>((set) => ({
  stats: null,
  cpuHistory: [],
  memoryHistory: [],
  alerts: [],
  theme: 'dark',
  isFullscreen: false,
  setStats: (stats) => set({ stats }),
  addAlert: (alert) => set((state) => ({ 
    alerts: [...state.alerts, alert] 
  })),
  clearAlert: (id) => set((state) => ({ 
    alerts: state.alerts.filter(alert => alert.id !== id) 
  })),
  setTheme: (theme) => set({ theme }),
  toggleFullscreen: () => set((state) => ({ 
    isFullscreen: !state.isFullscreen 
  })),
}));