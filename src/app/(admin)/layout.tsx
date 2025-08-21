'use client';

import { useState, useRef, useEffect } from 'react';
import IconSidebar from '@/components/IconSidebar';
import ContentSidebar from '@/components/ContentSidebar';
import Header from '@/components/Header';
import { Inter } from 'next/font/google';
import { menuConfig, MenuId } from '../../types/menuConfig';
import '../globals.css';
import { useSidebarStore } from '@/lib/store';

import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react'; // Import useSession

const inter = Inter({ subsets: ['latin'] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeMenu, setActiveMenu] = useState<MenuId | null>(null);
  const [hoveredMenuEl, setHoveredMenuEl] = useState<HTMLDivElement | null>(null);

  const {
    isContentSidebarVisible,
    isPinned,
    setContentSidebarVisibility,
  } = useSidebarStore();

  const contentSidebarRef = useRef<HTMLDivElement>(null);
  const iconSidebarRef = useRef<HTMLDivElement>(null);

  const { data: session, status } = useSession(); // Use useSession
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (status === "unauthenticated") { // Check for unauthenticated status
      router.push('/login');
    }
  }, [status, router]); // Depend on status

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

  let currentTitle = 'Dashboard';
  for (const menuKey in menuConfig) {
    const menu = menuConfig[menuKey as MenuId];
    if (pathname.startsWith(`/${menuKey}`)) {
      const matchedLink = menu.links.find(link => link.href === pathname);
      if (matchedLink) {
        currentTitle = matchedLink.label;
        break;
      } else if (pathname === `/${menuKey}` || pathname.startsWith(`/${menuKey}/`)) {
        currentTitle = menu.label;
      }
    }
  }

  const sidebarStyle = {
    top: hoveredMenuEl?.offsetTop ?? 0,
    height: hoveredMenuEl?.offsetHeight ?? 'auto',
  };

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
          setHoveredElement={setHoveredMenuEl}
        />

        <ContentSidebar
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          ref={contentSidebarRef}
          style={sidebarStyle}
        />
      </div>

      <main className={`flex-1 transition-all duration-300 ml-20`}>
        <Header title={currentTitle} />
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
}
