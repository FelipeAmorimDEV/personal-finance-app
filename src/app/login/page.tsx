'use client';
import { Suspense } from 'react';
import LoginForm from './login-form';

export default function LoginPage() {
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

          {/* Formulário com Suspense */}
          <Suspense fallback={
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="h-4 bg-slate-700 rounded animate-pulse"></div>
                <div className="h-12 bg-slate-700 rounded animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-700 rounded animate-pulse"></div>
                <div className="h-12 bg-slate-700 rounded animate-pulse"></div>
              </div>
              <div className="h-12 bg-slate-700 rounded animate-pulse"></div>
            </div>
          }>
            <LoginForm />
          </Suspense>

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
