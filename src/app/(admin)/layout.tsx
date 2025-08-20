'use client';

import { useState, useRef, useEffect } from 'react';
import IconSidebar from '@/components/IconSidebar';
import ContentSidebar from '@/components/ContentSidebar';
import Header from '@/components/Header';
import { Inter } from 'next/font/google';
import { menuConfig, MenuId } from '../../types/menuConfig';
import '../globals.css';
import { useSidebarStore } from '@/lib/store';
import { useAuth } from '../../context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeMenu, setActiveMenu] = useState<MenuId | null>(null);
  const { isContentSidebarVisible, isPinned, setContentSidebarVisibility } = useSidebarStore();
  const contentSidebarRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);
  

const handleMouseLeave = (event: React.MouseEvent) => {
  const target = event.relatedTarget;

  if (
    !isPinned &&
    contentSidebarRef.current &&
    target instanceof Node &&
    !contentSidebarRef.current.contains(target)
  ) {
    setActiveMenu(null);
    setContentSidebarVisibility(false);
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

  const mainContentMargin =
    isContentSidebarVisible && isPinned ? 'ml-[336px]' : 'ml-20';

  return (

        <div className={`${inter.className} flex h-screen`}>
          <div
            className="flex fixed top-0 left-0 h-full z-10"
            onMouseLeave={handleMouseLeave}
          >
            <IconSidebar
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />

            <ContentSidebar
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
              ref={contentSidebarRef}
            />
          </div>

          <main className={`flex-1 transition-all duration-300 ${mainContentMargin}`}>
            <Header title={currentTitle} />
            <div className="p-4">{children}</div>
          </main>
        </div>
  );
}