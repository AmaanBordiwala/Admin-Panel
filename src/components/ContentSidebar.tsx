'use client';

import React, { useEffect, useState } from 'react';
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
  ({ activeMenu, style }, ref) => {
    const { isContentSidebarVisible } = useSidebarStore();
    const pathname = usePathname();
    const content = activeMenu ? menuConfig[activeMenu] : null;

    const [menuHeight, setMenuHeight] = useState<number>(0);

    useEffect(() => {
      // compute height dynamically based on number of links
      if (content) {
        const height = content.links.length * 53;
        setMenuHeight(height);
      }
    }, [content]);

    if (!isContentSidebarVisible || !activeMenu || (content && content.links.length == 0)) return null;

    return (
      <div
        ref={ref}
        style={{
          ...style,
          minHeight: style?.height ?? 50, // ensure at least icon height
          height: Math.max(menuHeight, Number(style?.height) ?? 50), // fit content
          minWidth: 200,
          padding: '8px',
        }}
        className="fixed left-[81px] rounded-md shadow-lg bg-sidebar  transition-all duration-200 overflow-hidden"
      >
        {content && (
          <nav>
            <ul>
              {content.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-3 py-2 my-1 rounded-md transition-colors duration-150
                      ${pathname === link.href
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-primary/10'}
                    `}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    );
  }
);

ContentSidebar.displayName = 'ContentSidebar';

export default ContentSidebar;
