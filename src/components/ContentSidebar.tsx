'use client';

import React, { useState } from 'react';
import { menuConfig, MenuId } from '../types/menuConfig';
import { useSidebarStore } from '../lib/store';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface ContentSidebarProps {
  activeMenu: MenuId | null;
  setActiveMenu: (value: MenuId | null) => void;
  style?: React.CSSProperties;
}

const ContentSidebar = React.forwardRef<HTMLDivElement, ContentSidebarProps>(
  ({ activeMenu, setActiveMenu }, ref) => {
    const { isContentSidebarVisible, setContentSidebarVisibility, setIsPinned } = useSidebarStore();
    const pathname = usePathname();
    const content = activeMenu ? menuConfig[activeMenu] : null;
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    const handleClose = () => {
      setContentSidebarVisibility(false);
      setIsPinned(false);
      setActiveMenu(null);
    };

    return (
      <aside
        ref={ref}
        className={`
          fixed pl-20 top-0 h-full w-72 bg-background rounded-r-[20px] text-sidebar-foreground border-l border-sidebar-border shadow-md flex flex-col
          transition-all duration-500 ease-in-out
          ${isContentSidebarVisible && content ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
        `}
      >
        {content && content.links.length > 0 && (
          <>
            <div className="h-16 p-4 flex items-center justify-between border-b border-sidebar-border">
              <h2 className="text-xl font-bold text-sidebar-foreground">{content.label}</h2>
              <button onClick={handleClose} className="p-1 rounded-full hover:bg-muted text-muted-foreground">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="p-4">
              <ul>
                {content.links.map((link) => (
                  <li
                    key={link.href}
                    onMouseEnter={() => link.submenu && setHoveredLink(link.href)}
                    onMouseLeave={() => link.submenu && setHoveredLink(null)}
                    className="relative"
                  >
                    <Link
                      href={link.href}
                      className={`block p-2 rounded-md transition-colors duration-150
                        ${pathname === link.href
                          ? 'bg-muted text-primary-foreground'
                          : 'hover:bg-muted'}
                      `}
                    >
                      {link.label}
                    </Link>
                    {hoveredLink === link.href && link.submenu && (
                      <div className="absolute left-full pl-2 top-0 w-56 bg-background rounded-r-[20px] shadow-lg">
                        <nav className="p-2">
                          <ul>
                            {link.submenu.map((subItem) => (
                              <li key={subItem.href}>
                                <Link
                                  href={subItem.href}
                                  className={`block p-2 rounded-md transition-colors duration-150
                                    ${pathname === subItem.href
                                      ? 'bg-muted text-primary-foreground'
                                      : 'hover:bg-muted'}
                                  `}
                                >
                                  {subItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </nav>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </>
        )}
      </aside>
    );
  }
);

ContentSidebar.displayName = 'ContentSidebar';

export default ContentSidebar;
