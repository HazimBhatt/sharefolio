"use client";

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verify token with server
  const verifyToken = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsAuthenticated(true);
        

        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('tokenVerified', 'true');
        localStorage.setItem('tokenVerifiedAt', Date.now().toString());
        
        return data.user;
      } else {
        // throw new Error('Token verification failed');
      }
    } catch (error) {
      console.error('Token verification error:', error);
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
      localStorage.removeItem('tokenVerified');
      localStorage.removeItem('tokenVerifiedAt');
      return null;
    }
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        await verifyToken(); 
        return { success: true, user: data.user };
      } else {
        const error = await response.json();
        return { success: false, error: error.error || 'Login failed' };
      }
    } catch (error) {
      return { success: false, error: 'Network error occurred' };
    }
  }, [verifyToken]);

 
  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
      localStorage.removeItem('tokenVerified');
      localStorage.removeItem('tokenVerifiedAt');
    }
  }, []);

  const shouldVerifyToken = useCallback(() => {
    const verifiedAt = localStorage.getItem('tokenVerifiedAt');
    if (!verifiedAt) return true;
    
    const thirtyMinutes = 30 * 60 * 1000; 
    const timeSinceVerification = Date.now() - parseInt(verifiedAt);
    
    return timeSinceVerification > thirtyMinutes;
  }, []);


  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      const storedUser = localStorage.getItem('user');
      const tokenVerified = localStorage.getItem('tokenVerified');
      
      if (storedUser && tokenVerified === 'true' && !shouldVerifyToken()) {
 
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
        setLoading(false);
      } else {
  
        await verifyToken();
        setLoading(false);
      }
    };

    initializeAuth();
  }, [verifyToken, shouldVerifyToken]);

  
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      verifyToken();
    }, 25 * 60 * 1000); 

    return () => clearInterval(interval);
  }, [isAuthenticated, verifyToken]);

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    verifyToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}