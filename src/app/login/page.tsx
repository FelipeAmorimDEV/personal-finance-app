'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao fazer login');
      }

      const data = await response.json();
      
      // Salva o token no localStorage
      localStorage.setItem('access_token', data.access_token);
      
      // Salva no cookie também para o middleware (expira em 1 dia)
      document.cookie = `access_token=${data.access_token}; path=/; max-age=86400; SameSite=Lax`;
      
      toast.success('Login realizado com sucesso!');
      router.push('/');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error instanceof Error ? error.message : 'Credenciais inválidas');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#20233B] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-3xl p-8 shadow-2xl">
          {/* Logo ou título */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Personal Finance
            </h1>
            <p className="text-slate-400">
              Faça login para acessar sua conta
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-white text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-400"
                required
                disabled={isLoading}
              />
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-white text-sm font-medium">
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-400"
                required
                disabled={isLoading}
              />
            </div>

            {/* Botão de Login */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#4A69E0] text-white py-4 rounded-lg font-medium text-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {/* Links extras */}
          <div className="mt-6 text-center space-y-3">
            <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors block">
              Esqueceu sua senha?
            </a>
            <p className="text-sm text-slate-400">
              Não tem uma conta?{' '}
              <a href="/register" className="text-[#4A69E0] hover:text-blue-400 transition-colors font-medium">
                Criar conta
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
