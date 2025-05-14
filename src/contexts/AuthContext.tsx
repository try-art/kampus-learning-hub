
import React, { createContext, useState, useContext, useEffect } from 'react';
import { users as mockUsers } from '@/data/mockData';

// Define user types
export type UserRole = 'admin' | 'instructor' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  website?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
  isInstructor: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Using mock users from mockData instead of duplicating them
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('lmsUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user by email (in a real app, you'd verify password too)
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (!foundUser) {
      setIsLoading(false);
      throw new Error('Usuario o contraseña incorrectos');
    }
    
    // Save user to state and localStorage
    setUser(foundUser);
    localStorage.setItem('lmsUser', JSON.stringify(foundUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lmsUser');
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };
  
  const isInstructor = () => {
    return user?.role === 'instructor';
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        logout,
        isAdmin,
        isInstructor
      }}
    >
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
