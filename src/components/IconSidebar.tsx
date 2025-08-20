import React from 'react';
import { menuConfig, MenuId } from '../types/menuConfig';
import { useSidebarStore } from '../lib/store';

interface SidebarProps {
  activeMenu: MenuId | null;
  setActiveMenu: (value: MenuId | null) => void;
}

const IconSidebar: React.FC<SidebarProps> = ({
  activeMenu,
  setActiveMenu,
}) => {
  const { isPinned, setIsPinned, setContentSidebarVisibility, isContentSidebarVisible } = useSidebarStore();

  const handlePin = (id: MenuId) => {
    if (activeMenu === id && isPinned) {
      setIsPinned(false);
      setContentSidebarVisibility(false);
      setActiveMenu(null);
    } else {
      setActiveMenu(id);
      setContentSidebarVisibility(true);
      setIsPinned(true);
    }
  };

  return (
    <aside
      className="w-20 z-[999] h-full flex flex-col justify-center items-center bg-sidebar text-sidebar-foreground"
    >
      <nav className="flex-1 flex flex-col justify-center">
        {Object.entries(menuConfig).map(([id, item]) => (
          <div
            key={id}
            onMouseEnter={() => {
              if (!isPinned) {
                setActiveMenu(id as MenuId);
                setContentSidebarVisibility(true);
              }
            }}
            onMouseLeave={() => {
              if (!isPinned) {
                setActiveMenu(null);
                setContentSidebarVisibility(false);
              }
            }}
            onClick={() => handlePin(id as MenuId)}
            className={`
              p-4 my-2 rounded-lg cursor-pointer transition-colors duration-200
              ${activeMenu === id && (isContentSidebarVisible || isPinned)
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'}
            `}
          >
            {item.icon}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default IconSidebar;
