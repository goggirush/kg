import { create } from 'zustand';

export type NodeType = 'class' | 'individual' | 'literal';
export type ThemeName = 'Default' | 'Professional' | 'IceCream' | 'SoftOcean' | 'Evergreen';

type ThemeNodeColor = {
  background: string;
  border: string;
};

type ThemeColors = {
  [key in NodeType]: ThemeNodeColor;
};

type UserSettingsStore = {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  getNodeColor: (type: NodeType) => ThemeNodeColor;
};

const themes: Record<ThemeName, ThemeColors> = {
  Default: {
    class: {
      background: '#afd4c8ff',
      border: '#7bb3a1',
    },
    individual: {
      background: '#a9bbdfff',
      border: '#6a84b3',
    },
    literal: {
      background: '#f3d6bfff',
      border: '#e0a577',
    },
  },
  Professional: {
    class: {
      background: '#b6c8ccff',
      border: '#7a9ba1',
    },
    individual: {
      background: '#cac1d8ff',
      border: '#9584b3',
    },
    literal: {
      background: '#c2c4cfff',
      border: '#8e90a1',
    },
  },
  IceCream: {
    class: {
      background: '#d6ebff',
      border: '#a0c4ff',
    },
    individual: {
      background: '#f7d6ff',
      border: '#e0b0ff',
    },
    literal: {
      background: '#e6f7e6',
      border: '#b0e6b0',
    },
  },
  SoftOcean: {
    class: {
      background: '#c6dce7',
      border: '#92b9cd',
    },
    individual: {
      background: '#aacfd1',
      border: '#7db6b9',
    },
    literal: {
      background: '#8fbfc4',
      border: '#609fa6',
    },
  },
  Evergreen: {
    class: {
      background: '#cadfc4',
      border: '#95b89a',
    },
    individual: {
      background: '#b3d9b2',
      border: '#80c080',
    },
    literal: {
      background: '#99caa2',
      border: '#69a873',
    },
  },
};

export const useUserSettings = create<UserSettingsStore>((set, get) => ({
  currentTheme: 'Professional',
  setTheme: (theme) => set({ currentTheme: theme }),
  getNodeColor: (type) => {
    const theme = get().currentTheme;
    return themes[theme][type];
  },
}));
