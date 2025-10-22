'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações
    if (password.length < 6) {
      toast.error('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar conta');
      }

      toast.success('Conta criada com sucesso! Faça login para continuar.');
      
      // Redireciona para login após 1.5 segundos
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (error) {
      console.error('Register error:', error);
      toast.error(error instanceof Error ? error.message : 'Erro ao criar conta');
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
              Criar Conta
            </h1>
            <p className="text-slate-400">
              Preencha os dados para começar
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nome */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-white text-sm font-medium">
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-400"
                required
                disabled={isLoading}
              />
            </div>

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
                placeholder="Mínimo 6 caracteres"
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-400"
                required
                disabled={isLoading}
                minLength={6}
              />
            </div>

            {/* Confirmar Senha */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-white text-sm font-medium">
                Confirmar Senha
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Digite a senha novamente"
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-400"
                required
                disabled={isLoading}
                minLength={6}
              />
            </div>

            {/* Validação de Senha em tempo real */}
            {password && password.length > 0 && (
              <div className="text-sm space-y-1">
                <p className={`${password.length >= 6 ? 'text-green-400' : 'text-red-400'}`}>
                  {password.length >= 6 ? '✓' : '✗'} Mínimo 6 caracteres
                </p>
                {confirmPassword && (
                  <p className={`${password === confirmPassword ? 'text-green-400' : 'text-red-400'}`}>
                    {password === confirmPassword ? '✓' : '✗'} Senhas coincidem
                  </p>
                )}
              </div>
            )}

            {/* Botão de Registro */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#4A69E0] text-white py-4 rounded-lg font-medium text-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? 'Criando conta...' : 'Criar Conta'}
            </button>
          </form>

          {/* Link para login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400">
              Já tem uma conta?{' '}
              <Link href="/login" className="text-[#4A69E0] hover:text-blue-400 transition-colors font-medium">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
