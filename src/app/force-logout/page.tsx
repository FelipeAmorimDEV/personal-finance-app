'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ForceLogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const forceLogout = async () => {
      // Remove do localStorage
      localStorage.removeItem('access_token');
      
      // Remove todos os cookies
      document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=localhost';
      
      // Chama API de logout
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
        });
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
      
      // Aguarda um pouco e redireciona
      setTimeout(() => {
        router.push('/login');
      }, 1000);
    };

    forceLogout();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#20233B] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#4A69E0] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg">Fazendo logout...</p>
        <p className="text-slate-400 text-sm mt-2">Você será redirecionado para a tela de login</p>
      </div>
    </div>
  );
}
