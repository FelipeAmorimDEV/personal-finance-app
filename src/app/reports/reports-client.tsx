'use client';
import { useState } from 'react';
import { Transaction, Account, TransactionByCategory } from '@/types/dashboard';
import { useRouter } from 'next/navigation';

interface ReportsClientProps {
  accounts: Account[];
  transactionsByCategory: TransactionByCategory[];
  transactions: Transaction[];
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
}

export default function ReportsClient({
  accounts,
  transactionsByCategory,
  transactions,
  totalBalance,
  totalIncome,
  totalExpense
}: ReportsClientProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const router = useRouter();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Calcula economia (income - expense)
  const savings = totalIncome - totalExpense;
  const savingsPercentage = totalIncome > 0 ? ((savings / totalIncome) * 100).toFixed(1) : 0;

  // Agrupa transações por categoria para o gráfico
  const categoryData = transactionsByCategory.slice(0, 5).map(item => ({
    name: item.categoryName,
    value: item.amount,
    percentage: totalExpense > 0 ? ((item.amount / totalExpense) * 100).toFixed(1) : 0
  }));

  // Cores para as categorias
  const categoryColors = ['#4A69E0', '#33B183', '#BD4343', '#F59E0B', '#8B5CF6'];

  // Calcula distribuição de saldo por conta
  const accountDistribution = accounts.map(account => ({
    name: account.name,
    balance: account.balance,
    percentage: totalBalance > 0 ? ((account.balance / totalBalance) * 100).toFixed(1) : 0,
    icon: account.icon
  }));

  return (
    <div className="min-h-screen bg-[#20233B] pb-24">
      {/* Header */}
      <div className="bg-[#1A1D31] px-4 py-4 flex items-center justify-between">
        <button onClick={() => router.push('/')} className="text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="text-white text-lg font-semibold">Relatórios</h1>
        <div className="w-6"></div>
      </div>

      {/* Selector de Período */}
      <div className="p-4">
        <div className="flex gap-2 bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setSelectedPeriod('week')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedPeriod === 'week' ? 'bg-[#4A69E0] text-white' : 'text-slate-400'
            }`}
          >
            Semana
          </button>
          <button
            onClick={() => setSelectedPeriod('month')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedPeriod === 'month' ? 'bg-[#4A69E0] text-white' : 'text-slate-400'
            }`}
          >
            Mês
          </button>
          <button
            onClick={() => setSelectedPeriod('year')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedPeriod === 'year' ? 'bg-[#4A69E0] text-white' : 'text-slate-400'
            }`}
          >
            Ano
          </button>
        </div>
      </div>

      {/* Resumo Financeiro */}
      <div className="px-4 space-y-4">
        {/* Card Principal */}
        <div className="bg-gradient-to-br from-[#4A69E0] to-[#5C78E0] p-6 rounded-2xl">
          <p className="text-white/80 text-sm mb-2">Saldo Total</p>
          <h2 className="text-white text-3xl font-bold mb-4">{formatCurrency(totalBalance)}</h2>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white/60 text-xs">Receitas</p>
              <p className="text-white font-semibold">{formatCurrency(totalIncome)}</p>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-xs">Despesas</p>
              <p className="text-white font-semibold">{formatCurrency(totalExpense)}</p>
            </div>
          </div>
        </div>

        {/* Taxa de Economia */}
        <div className="bg-slate-800 p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-slate-400 text-sm">Taxa de Economia</p>
              <p className={`text-2xl font-bold ${savings >= 0 ? 'text-[#33B183]' : 'text-[#BD4343]'}`}>
                {savingsPercentage}%
              </p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-sm">Economizado</p>
              <p className={`text-xl font-bold ${savings >= 0 ? 'text-[#33B183]' : 'text-[#BD4343]'}`}>
                {formatCurrency(savings)}
              </p>
            </div>
          </div>
          
          {/* Barra de progresso */}
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div
              className={`h-3 rounded-full ${savings >= 0 ? 'bg-[#33B183]' : 'bg-[#BD4343]'}`}
              style={{ width: `${Math.min(Math.abs(Number(savingsPercentage)), 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Gastos por Categoria */}
      <div className="px-4 mt-6">
        <h3 className="text-white text-lg font-semibold mb-4">Despesas por Categoria</h3>
        
        <div className="bg-slate-800 p-6 rounded-2xl">
          {/* Gráfico de barras simplificado */}
          <div className="space-y-4 mb-6">
            {categoryData.map((category, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white text-sm">{category.name}</span>
                  <span className="text-slate-400 text-sm">{category.percentage}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${category.percentage}%`,
                      backgroundColor: categoryColors[index % categoryColors.length]
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Legenda */}
          <div className="grid grid-cols-2 gap-3">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: categoryColors[index % categoryColors.length] }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs truncate">{category.name}</p>
                  <p className="text-slate-400 text-xs">{formatCurrency(category.value)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Distribuição por Contas */}
      <div className="px-4 mt-6">
        <h3 className="text-white text-lg font-semibold mb-4">Distribuição por Contas</h3>
        
        <div className="space-y-3">
          {accountDistribution.map((account, index) => (
            <div key={index} className="bg-slate-800 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-xl">
                    {account.icon}
                  </div>
                  <div>
                    <p className="text-white font-medium">{account.name}</p>
                    <p className="text-slate-400 text-sm">{account.percentage}% do total</p>
                  </div>
                </div>
                <p className="text-white font-bold">{formatCurrency(account.balance)}</p>
              </div>
              
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-[#4A69E0]"
                  style={{ width: `${account.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="px-4 mt-6 pb-6">
        <h3 className="text-white text-lg font-semibold mb-4">Estatísticas</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800 p-4 rounded-xl">
            <p className="text-slate-400 text-sm mb-1">Total de Contas</p>
            <p className="text-white text-2xl font-bold">{accounts.length}</p>
          </div>
          
          <div className="bg-slate-800 p-4 rounded-xl">
            <p className="text-slate-400 text-sm mb-1">Transações</p>
            <p className="text-white text-2xl font-bold">{transactions.length}</p>
          </div>
          
          <div className="bg-slate-800 p-4 rounded-xl">
            <p className="text-slate-400 text-sm mb-1">Ticket Médio</p>
            <p className="text-white text-2xl font-bold">
              {formatCurrency(transactions.length > 0 ? totalExpense / transactions.filter(t => t.type === 'expense').length : 0)}
            </p>
          </div>
          
          <div className="bg-slate-800 p-4 rounded-xl">
            <p className="text-slate-400 text-sm mb-1">Categorias</p>
            <p className="text-white text-2xl font-bold">{transactionsByCategory.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
