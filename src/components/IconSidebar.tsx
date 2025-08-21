import React from 'react';
import Link from 'next/link';
import { menuConfig, MenuId } from '../types/menuConfig';
import { useSidebarStore } from '../lib/store';

interface SidebarProps {
  activeMenu: MenuId | null;
  setActiveMenu: (value: MenuId | null) => void;
  setHoveredElement: (value: HTMLDivElement | null) => void;
}

const IconSidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ activeMenu, setActiveMenu, setHoveredElement }, ref) => {
    const {
      isPinned,
      // setIsPinned,
      setContentSidebarVisibility,
      isContentSidebarVisible,
    } = useSidebarStore();

    // const handlePin = (id: MenuId) => {
    //   if (activeMenu === id && isPinned) {
    //     setIsPinned(false);
    //     setContentSidebarVisibility(false);
    //     setActiveMenu(null);
    //     setHoveredElement(null);
    //   } else {
    //     setActiveMenu(id);
    //     setContentSidebarVisibility(true);
    //     setIsPinned(true);
    //   }
    // };

    return (
      <aside
        ref={ref}
        className="w-20 z-[999] h-full flex flex-col justify-center items-center bg-sidebar text-sidebar-foreground"
      >
        <nav className="flex-1 flex flex-col justify-center">
          {Object.entries(menuConfig).map(([id, item]) => (
            <Link href={item.parenthref || '#'} key={id}>
              <div
                onMouseEnter={(e) => {
                  if (!isPinned) {
                    setActiveMenu(id as MenuId);
                    setContentSidebarVisibility(true);
                    setHoveredElement(e.currentTarget);
                  }
                }}
                // onClick={() => handlePin(id as MenuId)}
                className={`
                    p-4 my-2 rounded-lg cursor-pointer transition-colors duration-200
                    ${activeMenu === id && (isContentSidebarVisible || isPinned)
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'}
                  `}
              >
                {item.icon}
              </div>
            </Link>
          ))}
        </nav>
      </aside>
    );
  }
);

IconSidebar.displayName = 'IconSidebar';

export default IconSidebar;

