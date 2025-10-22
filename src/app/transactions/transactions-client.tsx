'use client';
import { useState, useEffect } from 'react';
import { Transaction, Category, Account } from '@/types/dashboard';
import { useRouter } from 'next/navigation';

interface TransactionsClientProps {
  initialTransactions: Transaction[];
  categories: Category[];
  accounts: Account[];
  initialMonth: string;
  initialYear: string;
}

export default function TransactionsClient({
  initialTransactions,
  categories,
  accounts,
  initialMonth,
  initialYear
}: TransactionsClientProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Filtros
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [selectedType, setSelectedType] = useState<'all' | 'income' | 'expense'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAccount, setSelectedAccount] = useState<string>('all');
  
  const router = useRouter();

  // Busca transações quando os filtros mudam
  const fetchFilteredTransactions = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('month', selectedMonth);
      params.append('year', selectedYear);
      if (selectedType !== 'all') params.append('type', selectedType);
      if (selectedCategory !== 'all') params.append('categoryId', selectedCategory);
      if (selectedAccount !== 'all') params.append('accountId', selectedAccount);
      
      const response = await fetch(`/api/transactions/list?${params.toString()}`);
      const data = await response.json();
      
      // Suporta tanto { transactions: [...] } quanto [...] direto
      const transactionsList = Array.isArray(data) ? data : (data.transactions || []);
      setTransactions(transactionsList);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyFilters = () => {
    fetchFilteredTransactions();
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setSelectedType('all');
    setSelectedCategory('all');
    setSelectedAccount('all');
    setSelectedMonth(initialMonth);
    setSelectedYear(initialYear);
  };

  // Calcula totais
  const totals = (transactions || []).reduce((acc, t) => {
    if (t.type === 'income') {
      acc.income += t.amount;
    } else {
      acc.expense += t.amount;
    }
    return acc;
  }, { income: 0, expense: 0 });

  const months = [
    { value: '1', label: 'Janeiro' },
    { value: '2', label: 'Fevereiro' },
    { value: '3', label: 'Março' },
    { value: '4', label: 'Abril' },
    { value: '5', label: 'Maio' },
    { value: '6', label: 'Junho' },
    { value: '7', label: 'Julho' },
    { value: '8', label: 'Agosto' },
    { value: '9', label: 'Setembro' },
    { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' },
    { value: '12', label: 'Dezembro' }
  ];

  const years = Array.from({ length: 5 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { value: year.toString(), label: year.toString() };
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-[#20233B] pb-24">
      {/* Header */}
      <div className="bg-[#1A1D31] px-4 py-4 flex items-center justify-between">
        <button onClick={() => router.push('/')} className="text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="text-white text-lg font-semibold">Transações</h1>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="text-white relative"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          {(selectedType !== 'all' || selectedCategory !== 'all' || selectedAccount !== 'all') && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#4A69E0] rounded-full" />
          )}
        </button>
      </div>

      {/* Filtros */}
      {showFilters && (
        <div className="bg-slate-800 p-4 space-y-4">
          {/* Mês e Ano */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-white text-sm">Mês</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
              >
                {months.map(m => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-white text-sm">Ano</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
              >
                {years.map(y => (
                  <option key={y.value} value={y.value}>{y.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tipo */}
          <div className="space-y-2">
            <label className="text-white text-sm">Tipo</label>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`flex-1 py-2 rounded-lg ${selectedType === 'all' ? 'bg-[#4A69E0]' : 'bg-slate-700'} text-white`}
              >
                Todas
              </button>
              <button
                onClick={() => setSelectedType('income')}
                className={`flex-1 py-2 rounded-lg ${selectedType === 'income' ? 'bg-[#33B183]' : 'bg-slate-700'} text-white`}
              >
                Receitas
              </button>
              <button
                onClick={() => setSelectedType('expense')}
                className={`flex-1 py-2 rounded-lg ${selectedType === 'expense' ? 'bg-[#BD4343]' : 'bg-slate-700'} text-white`}
              >
                Despesas
              </button>
            </div>
          </div>

          {/* Categoria */}
          <div className="space-y-2">
            <label className="text-white text-sm">Categoria</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todas as categorias</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Conta */}
          <div className="space-y-2">
            <label className="text-white text-sm">Conta</label>
            <select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todas as contas</option>
              {accounts.map(acc => (
                <option key={acc.id} value={acc.id}>{acc.name}</option>
              ))}
            </select>
          </div>

          {/* Botões */}
          <div className="flex gap-3">
            <button
              onClick={handleClearFilters}
              className="flex-1 py-3 rounded-lg bg-slate-700 text-white"
            >
              Limpar
            </button>
            <button
              onClick={handleApplyFilters}
              className="flex-1 py-3 rounded-lg bg-[#4A69E0] text-white"
            >
              Aplicar
            </button>
          </div>
        </div>
      )}

      {/* Resumo */}
      <div className="p-4 grid grid-cols-2 gap-4">
        <div className="bg-slate-800 p-4 rounded-xl">
          <p className="text-slate-400 text-sm">Receitas</p>
          <p className="text-[#33B183] text-xl font-bold">
            {formatCurrency(totals.income)}
          </p>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl">
          <p className="text-slate-400 text-sm">Despesas</p>
          <p className="text-[#BD4343] text-xl font-bold">
            {formatCurrency(totals.expense)}
          </p>
        </div>
      </div>

      {/* Lista de Transações */}
      <div className="px-4 space-y-3">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-[#4A69E0] border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : !transactions || transactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-400">Nenhuma transação encontrada</p>
          </div>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-slate-800 p-4 rounded-xl flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  transaction.type === 'income' ? 'bg-[#33B183]/20' : 'bg-[#BD4343]/20'
                }`}>
                  <span className="text-2xl">{transaction.category?.icon || '💰'}</span>
                </div>
                <div>
                  <p className="text-white font-medium">{transaction.description}</p>
                  <p className="text-slate-400 text-sm">
                    {transaction.category?.name} • {formatDate(transaction.date)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold text-lg ${
                  transaction.type === 'income' ? 'text-[#33B183]' : 'text-[#BD4343]'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                </p>
                <p className="text-slate-400 text-sm">{transaction.account?.name}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
