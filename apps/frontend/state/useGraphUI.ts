import { create } from 'zustand';
import type { Node } from '@xyflow/react';

type GraphUIState = {
  selectedNode: Node | null;
  setSelectedNode: (node: Node | null) => void;
  showSidebar: boolean;
  setShowSidebar: (visible: boolean) => void;
};

export const useGraphUI = create<GraphUIState>((set) => ({
  selectedNode: null,
  setSelectedNode: (node) => set({ selectedNode: node }),
  showSidebar: false,
  setShowSidebar: (visible) => set({ showSidebar: visible }),
}));