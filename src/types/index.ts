
export type MenuId = 'dashboard' | 'analytics' | 'settings' | 'home';

export interface SidebarProps {
  activeMenu: MenuId | null;
  setActiveMenu: (menuId: MenuId | null) => void;
  isPinned: boolean;
  setIsPinned: (isPinned: boolean) => void;
}
