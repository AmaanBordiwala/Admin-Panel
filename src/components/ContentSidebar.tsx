'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menuConfig, MenuId } from '../types/menuConfig';
import { useSidebarStore } from '../lib/store';
import React, { forwardRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface ContentSidebarProps {
  activeMenu: MenuId | null;
  setActiveMenu: (value: MenuId | null) => void;
}

const ContentSidebar = forwardRef<HTMLDivElement, ContentSidebarProps>((
  { activeMenu, setActiveMenu },
  ref
) => {
  const pathname = usePathname();
  const { isContentSidebarVisible, setContentSidebarVisibility, setIsPinned } = useSidebarStore();
  const { theme } = useTheme();
  const content = activeMenu ? menuConfig[activeMenu] : null;

  const handleClose = () => {
    setContentSidebarVisibility(false);
    setIsPinned(false);
    setActiveMenu(null);
  };

  return (
    <aside
      ref={ref}
      className={`
        w-64 bg-sidebar text-sidebar-foreground border-l border-sidebar-border h-full shadow-md flex flex-col
        transition-all duration-500 ease-out
        ${isContentSidebarVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
      `}
    >
      {content && (
        <>
          <div className="h-16 p-4 flex items-center justify-between border-b border-sidebar-border">
            <h2 className="text-xl font-bold text-sidebar-foreground">{content.label}</h2>
            <button
              onClick={handleClose}
              className="p-1 rounded-full hover:bg-muted text-muted-foreground"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="p-4">
            <ul>
              {content.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block p-2 rounded-md transition-colors duration-150
                      ${pathname === link.href
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'}
                    `}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </aside>
  );
});

ContentSidebar.displayName = 'ContentSidebar';

export default ContentSidebar;
