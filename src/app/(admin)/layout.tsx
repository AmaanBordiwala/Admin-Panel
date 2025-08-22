"use client";

import { useState, useRef, useEffect } from "react";
import IconSidebar from "@/components/IconSidebar";
import ContentSidebar from "@/components/ContentSidebar";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import { MenuId } from "../../types/menuConfig";
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
  const [activeMenu, setActiveMenu] = useState<MenuId | null>(null);
  const [hoveredMenuEl, setHoveredMenuEl] = useState<HTMLDivElement | null>(
    null
  );
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
  }, [pathname]);
  
  useEffect(() => {
    if (status === "unauthenticated") {
      // Check for unauthenticated status
      router.replace("/login");
    }
  }, [status, router]); // Depend on status

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
      setActiveMenu(null);
      setContentSidebarVisibility(false);
      setHoveredMenuEl(null);
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
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />

        <ContentSidebar
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          ref={contentSidebarRef}
        />
      </div>

       <main className={`flex-1 transition-all duration-500 ${mainContentMargin}`}>
        <Header title={currentTitle} />
        <div className="p-4 mt-[72px]">{children}</div>
      </main>
    </div>
  );
}
