"use client";

import React, { useState } from "react";
import { menuConfig, MenuId } from "../types/menuConfig";
import { useSidebarStore } from "../lib/store";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface ContentSidebarProps {
  style?: React.CSSProperties;
  setSelectedMenu: (value: MenuId | null) => void;
}

const ContentSidebar = React.forwardRef<HTMLDivElement, ContentSidebarProps>(
  ({ setSelectedMenu }, ref) => {
    const {
      isContentSidebarVisible,
      setContentSidebarVisibility,
      setIsPinned,
    } = useSidebarStore();
    const pathname = usePathname();
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    const handleClose = () => {
      setContentSidebarVisibility(false);
      setIsPinned(false);
      setSelectedMenu(null);
    };

    return (
      <aside
        ref={ref}
        className={`fixed pl-16 top-0 h-full w-72 bg-background border rounded-l-[30px] rounded-r-[20px] text-sidebar-foreground border-l border-sidebar-border shadow-md flex flex-col
          transition-all duration-500 ease-in-out
          ${
            isContentSidebarVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }
        `}
      >
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

        <nav className="p-4">
          <ul>
            {Object.entries(menuConfig).map(([menuId, content]) => (
              <li key={menuId} className="mb-3">
                {/* parent menu - just change selectedMenu, don't navigate */}
                <button
                  onClick={() => setSelectedMenu(menuId as MenuId)}
                  className={`w-full cursor-pointer text-left flex items-center justify-between p-2 pl-3 rounded-md text-lg font-bold tracking-wide transition-colors duration-150
                    ${
                      pathname === content.parenthref
                        ? "bg-primary text-primary-foreground"
                        : "text-sidebar-foreground hover:bg-muted"
                    }
                  `}
                >
                  <span>{content.label}</span>
                </button>

                {/* sub links */}
                <ul className="pl-4 mt-2">
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
                        className={`group flex items-center justify-between p-2 px-3 my-1.5 rounded-md transition-colors duration-150
                          ${
                            pathname === link.href
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-primary/10"
                          }
                        `}
                      >
                        <span>{link.label}</span>
                        {link.submenu && (
                          <svg
                            className={`w-4 h-4 transition-transform duration-300 rotate-90 group-hover:rotate-0`}
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
                        <div className="absolute left-full top-0 w-48 bg-background border rounded-r-[20px] shadow-lg">
                          <span className="absolute -left-2 top-3 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-background"></span>
                          <nav className="p-3">
                            <ul>
                              {link.submenu.map((subItem) => (
                                <li key={subItem.href}>
                                  <Link
                                    href={subItem.href}
                                    className={`block p-2 rounded-md transition-colors duration-150
                                      ${
                                        pathname === subItem.href
                                          ? "bg-muted text-sm text-primary-foreground"
                                          : "hover:bg-primary/10"
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
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    );
  }
);

ContentSidebar.displayName = "ContentSidebar";

export default ContentSidebar;
