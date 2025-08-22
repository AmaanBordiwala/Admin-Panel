"use client";

import { useState, useRef, useEffect } from "react";
import IconSidebar from "@/components/IconSidebar";
import ContentSidebar from "@/components/ContentSidebar";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import { MenuId, menuConfig } from "../../types/menuConfig";
import "../globals.css";
import { useSidebarStore } from "@/lib/store";
import FullScreenLoader from "@/components/FullScreenLoader";

import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { getBreadcrumbs } from "../../../utils/getBreadcrumbs";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedMenu, setSelectedMenu] = useState<MenuId | null>(null);
  const [currentTitle, setCurrentTitle] = useState("Dashboard");
  const { isPinned, setContentSidebarVisibility , isContentSidebarVisible } = useSidebarStore();

  const contentSidebarRef = useRef<HTMLDivElement>(null);
  const iconSidebarRef = useRef<HTMLDivElement>(null);

  const { status } = useSession(); // Use useSession
  const router = useRouter();
  const pathname = usePathname();

    useEffect(() => {
    const breadcrumbs = getBreadcrumbs(pathname);
    setCurrentTitle(breadcrumbs.join(" / "));

    // New logic for default redirection
    if (selectedMenu && isContentSidebarVisible) {
      const menuItem = menuConfig[selectedMenu];
      if (menuItem && menuItem.parenthref) {
        let isSublinkActive = false;
        if (menuItem.links) {
          for (const link of menuItem.links) {
            if (pathname === link.href) {
              isSublinkActive = true;
              break;
            }
            if (link.submenu) {
              for (const subItem of link.submenu) {
                if (pathname === subItem.href) {
                  isSublinkActive = true;
                  break;
                }
              }
            }
            if (isSublinkActive) break;
          }
        }

        if (!isSublinkActive && pathname !== menuItem.parenthref) {
          router.push(menuItem.parenthref);
        } else {
        }
      }
    }

    if (status === "unauthenticated") {
      // Check for unauthenticated status
      router.replace("/login");
    }
  }, [pathname, selectedMenu, isContentSidebarVisible, router, status]);

  // Add conditional rendering here
  if (status === "loading" || status === "unauthenticated") {
    return <FullScreenLoader />;
  }

  const handleMouseLeave = (event: React.MouseEvent) => {
    const target = event.relatedTarget;

    if (
      !isPinned &&
      contentSidebarRef.current &&
      iconSidebarRef.current &&
      target instanceof Node &&
      !contentSidebarRef.current.contains(target) &&
      !iconSidebarRef.current.contains(target)
    ) {
      setSelectedMenu(null);
      setContentSidebarVisibility(false);
    }
  };


    const mainContentMargin =
    isContentSidebarVisible && isPinned ? 'ml-[280px]' : 'ml-16';

  return (
    <div className={`${inter.className} flex h-screen`}>
      <div
        className="flex fixed top-0 left-0 h-full z-10"
        onMouseLeave={handleMouseLeave}
      >
        <IconSidebar
          ref={iconSidebarRef}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />

        <ContentSidebar
          ref={contentSidebarRef}
          setSelectedMenu={setSelectedMenu}
        />
      </div>

       <main className={`flex-1 transition-all duration-500 ${mainContentMargin}`}>
        <Header title={currentTitle} />
        <div className="p-4 mt-[72px]">{children}</div>
      </main>
    </div>
  );
}
