import { create } from 'zustand';

interface SidebarState {
  isContentSidebarVisible: boolean;
  isPinned: boolean;
  setContentSidebarVisibility: (value: boolean) => void;
  setIsPinned: (value: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isContentSidebarVisible: false,
  isPinned: false,
  setContentSidebarVisibility: (value: boolean) => set(() => ({ isContentSidebarVisible: value })),
  setIsPinned: (value: boolean) => set(() => ({ isPinned: value })),
}));
