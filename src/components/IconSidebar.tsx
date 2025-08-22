import React from 'react';
import { menuConfig, MenuId } from '../types/menuConfig';
import { useSidebarStore } from '../lib/store';

interface SidebarProps {
  activeMenu: MenuId | null;
  setActiveMenu: (value: MenuId | null) => void;
}

const IconSidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ activeMenu, setActiveMenu }, ref) => {
    const {
      isPinned,
      setIsPinned,
      setContentSidebarVisibility,
      isContentSidebarVisible,
    } = useSidebarStore();

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
        ref={ref}
        className={`
          fixed top-0 left-0 h-full w-16  flex flex-col bg-sidebar border text-sidebar-foreground shadow-lg z-50 rounded-[30px]
          transition-all duration-300 ease-in-out
        `}
      >
        <nav className="flex-1 flex flex-col justify-center">
          {Object.entries(menuConfig).map(([id, item]) => (
            <div
                key={id}
                onClick={() => handlePin(id as MenuId)}
                className={`
                     p-2.5 my-2 mx-[7px] rounded-lg cursor-pointer transition-colors duration-200 flex items-center justify-center
                    ${activeMenu === id && (isContentSidebarVisible || isPinned)
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-primary hover:text-primary-foreground'}
                  `}
              >
                {item.icon}
              </div>
          ))}
        </nav>
      </aside>
    );
  }
);

IconSidebar.displayName = 'IconSidebar';

export default IconSidebar;

