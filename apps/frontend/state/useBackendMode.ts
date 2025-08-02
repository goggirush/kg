import { create } from 'zustand';

type BackendMode = 'auto' | 'connected' | 'local';

interface BackendState {
  mode: BackendMode;
  isConnected: boolean;
  setMode: (mode: BackendMode) => void;
  setIsConnected: (status: boolean) => void;
}

export const useBackendMode = create<BackendState>((set) => ({
  mode: 'auto',
  isConnected: true,
  setMode: (mode) => set({ mode }),
  setIsConnected: (status) => set({ isConnected: status }),
}));
