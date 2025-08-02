import { create } from 'zustand';

interface ConnectionSettings {
  endpoint: string;
  database: string;
  username: string;
  reasoning: boolean;
  isConnected: boolean;
  setEndpoint: (value: string) => void;
  setDatabase: (value: string) => void;
  setUsername: (value: string) => void;
  setReasoning: (value: boolean) => void;
  setIsConnected: (value: boolean) => void;
  setSettings: (values: Partial<Omit<ConnectionSettings, 'set*'>>) => void;
}

// Pull from env vars with safe fallbacks
const defaultSettings = {
  endpoint: process.env.NEXT_PUBLIC_STARDOG_ENDPOINT || '',
  database: process.env.NEXT_PUBLIC_STARDOG_DATABASE || '',
  username: process.env.NEXT_PUBLIC_STARDOG_USERNAME || '',
  reasoning: process.env.NEXT_PUBLIC_STARDOG_REASONING === 'true',
};

export const useConnectionSettings = create<ConnectionSettings>((set) => ({
  ...defaultSettings,
  isConnected: false,
  setEndpoint: (endpoint) => set({ endpoint }),
  setDatabase: (database) => set({ database }),
  setUsername: (username) => set({ username }),
  setReasoning: (reasoning) => set({ reasoning }),
  setIsConnected: (isConnected) => set({ isConnected }),
  setSettings: (values) => set(values),
}));
