'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useSidebarStore } from '../lib/store';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof document !== 'undefined') {
      return document.cookie.includes('isAuthenticated=true');
    }
    return false;
  });

  const login = () => {
    setIsAuthenticated(true);
    // Create a cookie that the middleware can read
    document.cookie = 'isAuthenticated=true; path=/;';
  };

  const logout = () => {
    setIsAuthenticated(false);

    // Remove cookie (expires in the past)
    document.cookie =
      'isAuthenticated=true; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';

    // Reset sidebar state
    const { setContentSidebarVisibility, setIsPinned } = useSidebarStore.getState();
    setContentSidebarVisibility(false);
    setIsPinned(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
