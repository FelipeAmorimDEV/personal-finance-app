'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Verifica se há token no localStorage
    const storedToken = localStorage.getItem('access_token');
    
    if (storedToken) {
      setToken(storedToken);
      // Salva no cookie também para o middleware
      document.cookie = `access_token=${storedToken}; path=/; max-age=86400; SameSite=Lax`;
    } else {
      // Se não há token e não está em página pública, redireciona
      const publicPages = ['/login', '/register', '/force-logout'];
      if (!publicPages.includes(pathname)) {
        router.push('/login');
      }
    }
    
    setIsLoading(false);
  }, [pathname, router]);

  const login = (newToken: string) => {
    localStorage.setItem('access_token', newToken);
    // Salva no cookie também para o middleware (expira em 1 dia)
    document.cookie = `access_token=${newToken}; path=/; max-age=86400; SameSite=Lax`;
    setToken(newToken);
  };

  const logout = async () => {
    try {
      // Chama a API para remover o cookie do servidor
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      // Remove do localStorage
      localStorage.removeItem('access_token');
      // Remove o cookie do cliente
      document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      setToken(null);
      router.push('/login');
    }
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isLoading,
      token,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
