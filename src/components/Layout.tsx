
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from './Sidebar';
import { Navigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  requireAuth = true,
  requireAdmin = false 
}) => {
  const { isAuthenticated, isLoading, isAdmin } = useAuth();
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to login if authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Redirect to dashboard if admin access is required but user is not an admin
  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/my-courses" />;
  }

  // If no authentication is required or user is authenticated, render the layout
  return (
    <div className="flex h-screen overflow-hidden">
      {isAuthenticated && <Sidebar />}
      <main className="flex-1 overflow-y-auto bg-background">
        {children}
      </main>
    </div>
  );
};

export default Layout;
