import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { User } from '../types';
import * as blogService from '../services/blogService';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  login: (credentials: Pick<User, 'email' | 'password'>) => Promise<void>;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'status' | 'isAdmin' | 'avatarUrl'>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = () => {
      try {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to parse user from session storage", error);
        sessionStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = async (credentials: Pick<User, 'email' | 'password'>) => {
    const loggedInUser = await blogService.loginUser(credentials);
    sessionStorage.setItem('user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  const register = async (userData: Omit<User, 'id' | 'status' | 'isAdmin' | 'avatarUrl'>) => {
    await blogService.registerUser(userData);
  };

  const value = {
    user,
    loading,
    isAdmin: user?.isAdmin ?? false,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};