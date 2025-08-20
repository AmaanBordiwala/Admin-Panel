'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UserCircle, LogOut, Sun, Moon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="p-4 flex items-center justify-between bg-sidebar text-foreground shadow-md">
      <h1 className="text-xl font-semibold">{title}</h1>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full cursor-pointer hover:bg-muted"
        >
        {theme === 'dark' ? ( <Sun className="w-6 h-6 text-yellow-500" /> ) : ( <Moon className="w-6 h-6 text-gray-700" /> )}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-full cursor-pointer hover:bg-muted">
              <UserCircle className="w-6 h-6 text-foreground" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-40 bg-popover text-popover-foreground"
          >
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer hover:bg-muted"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
