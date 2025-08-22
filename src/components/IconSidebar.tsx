import React from 'react';
import { menuConfig, MenuId } from '../types/menuConfig';
import { useSidebarStore } from '../lib/store';
import Image from 'next/image';

interface SidebarProps {
  selectedMenu: MenuId | null;
  setSelectedMenu: (value: MenuId | null) => void;
}

const IconSidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ selectedMenu, setSelectedMenu }, ref) => {
    const {
      isPinned,
      setIsPinned,
      setContentSidebarVisibility,
      isContentSidebarVisible,
    } = useSidebarStore();

    const handlePin = (id: MenuId) => {
      if (selectedMenu === id && isPinned) {
        setIsPinned(false);
        setContentSidebarVisibility(false);
        setSelectedMenu(null);
      } else {
        setSelectedMenu(id);
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
        <div className="flex items-center justify-center p-4">
          {/* <Link href="/dashboard"> */}
            <Image src="/logo.svg" alt="Logo" width={35} height={35} className="transition-transform duration-300 ease-in-out transform hover:scale-110" />
          {/* </Link> */}
        </div>
        <nav className="flex-1 flex flex-col justify-center mt-4">
          {Object.entries(menuConfig).map(([id, item]) => (
            <div
                key={id}
                onClick={() => handlePin(id as MenuId)}
                className={`
                     p-2.5 my-2 mx-[7px] rounded-lg cursor-pointer transition-colors duration-200 flex items-center justify-center
                    ${selectedMenu === id && (isContentSidebarVisible || isPinned)
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

