import React from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = localStorage.getItem('session');
        if (session) {
          setUser(JSON.parse(session));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      localStorage.setItem('session', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const login = async (email: string, password: string) => {
    const mockUser: User = {
      id: '1',
      email,
      goals: [],
      progress: {},
    };
    
    localStorage.setItem('session', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const signup = async (email: string, password: string) => {
    await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem('session');
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    console.log('Password reset requested for:', email);
  };

  const value = React.useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      signup,
      logout,
      resetPassword,
      updateUser,
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}