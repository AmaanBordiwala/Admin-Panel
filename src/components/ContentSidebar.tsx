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
  isParentDefaultSelected: boolean;
}

const ContentSidebar = React.forwardRef<HTMLDivElement, ContentSidebarProps>(
  ({ activeMenu, setActiveMenu }, ref) => {
    const { isContentSidebarVisible, setContentSidebarVisibility, setIsPinned } =
      useSidebarStore();
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
        className={`fixed pl-16 top-0 h-full w-72 bg-background border rounded-l-[30px] rounded-r-[20px] text-sidebar-foreground border-l border-sidebar-border shadow-md flex flex-col
          transition-all duration-500 ease-in-out
          ${
            isContentSidebarVisible && content
              ? 'translate-x-0 opacity-100'
              : '-translate-x-full opacity-0'
          }
        `}
      >
        {content && content.links.length > 0 && (
          <>
            {/* Close Icon at Top */}
            <div className="h-16 p-4 flex items-center justify-end border-b border-sidebar-border">
              <button
                onClick={handleClose}
                className="p-1 rounded-full hover:bg-muted text-muted-foreground"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Menu list */}
            <nav className="p-4">
              <ul>
                {/* Parent item styled as distinct heading */}
                <li className="mb-3">
                  <Link
                    href={content.parenthref || '#'}
                    className={`block p-2 pl-3 rounded-md text-lg font-bold tracking-wide transition-colors duration-150
                      ${
                        pathname === content.parenthref
                          ? 'bg-primary text-primary-foreground'
                          : 'text-sidebar-foreground  hover:bg-muted'
                      }
                    `}
                  >
                    {content.label}
                  </Link>
                </li>

                {/* Child links */}
                {content.links.map((link) => (
                  <li
                    key={link.href}
                    onMouseEnter={() =>
                      link.submenu && setHoveredLink(link.href)
                    }
                    onMouseLeave={() =>
                      link.submenu && setHoveredLink(null)
                    }
                    className="relative"
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between p-2 px-3 my-1.5 rounded-md transition-colors duration-150
                        ${
                          pathname === link.href
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }
                      `}
                    >
                      <span>{link.label}</span>
                      {link.submenu && (
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${
                            hoveredLink === link.href ? 'rotate-90' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      )}
                    </Link>

             {hoveredLink === link.href && link.submenu && (
  <div className="absolute left-full top-0 w-42 bg-muted rounded-r-[20px] shadow-lg ">
    {/* Small left polygon arrow */}
    <span className="absolute -left-2 top-3 w-0 h-0 border-t-10 border-b-10 border-r-10 border-t-transparent border-b-transparent border-r-muted"></span>

    <nav className="p-3">
      <ul>
        {link.submenu.map((subItem) => (
          <li key={subItem.href}>
            <Link
              href={subItem.href}
              className={`block p-2 rounded-md transition-colors duration-150
                ${
                  pathname === subItem.href
                    ? 'bg-muted text-sm text-primary-foreground'
                    : 'hover:bg-sidebar'
                }
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
