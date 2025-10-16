'use client';
import BottomSheet from '@/components/ui/BottomSheet';
import { useModal } from '@/contexts/ModalContext';
import { Category } from '@/types/dashboard';
import { useState } from 'react';
import { toast } from "react-toastify"
import { useRouter } from 'next/navigation';
import CreateCategoryModal from '@/components/modals/CreateCategoryModal';
import CreateAccountModal from '@/components/modals/CreateAccountModal';
import ActionMenu from '@/components/ActionMenu';

interface PageClientProps {
  accounts: any[];
  categories: Category[];
}

export default function PageClient({ 
  accounts,
  categories
}: PageClientProps) {
  const { isModalOpen, setIsModalOpen } = useModal();
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('income');
  const [accountId, setAccountId] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newTransaction = await fetch  ('/api/transactions', {
        method: 'POST',
        body: JSON.stringify({
          transaction: {
            type: transactionType,
            accountId: accountId,
            categoryId: categoryId,
            description: description,
            date: date,
             amount: amount ? parseFloat(amount) : 0
          }
        })
      });
      
      if (!newTransaction.ok) {
          toast.error('Erro ao criar transação');
          throw new Error('Failed to create new transaction');
      }

      toast.success('Transação criada com sucesso');
      setIsModalOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Error creating new transaction:', error);
      throw new Error('Failed to create new transaction');
    }
  }

  return (
    <>
      <BottomSheet isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <div className="space-y-6">
          <h2 className="text-white text-xl font-semibold">Adicionar Nova Transação</h2>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Tipo de transação */}
            <div className="space-y-2">
              <label htmlFor="transactionType" className="text-white text-sm font-medium">
                Tipo de transação
              </label>
              <div className="relative">
                <select 
                  id="transactionType" 
                  name="transactionType"
                  className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value as 'income' | 'expense')}
                >
                  <option value="">Selecione o tipo da transação</option>
                  <option value="income">Receita</option>
                  <option value="expense">Despesa</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Conta */}
            <div className="space-y-2">
              <label htmlFor="account" className="text-white text-sm font-medium">
                Conta
              </label>
              <div className="relative">
                <select 
                  id="account" 
                  name="account"
                  className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                > 
                  <option value="">Selecione a conta</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Categoria */}
            <div className="space-y-2">
              <label htmlFor="category" className="text-white text-sm font-medium">
                Categoria
              </label>
              <div className="relative">
                <select 
                  id="category" 
                  name="category"
                  className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >   
                  <option value="">Selecione a categoria</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Descrição */}
            <div className="space-y-2">
              <label htmlFor="description" className="text-white text-sm font-medium">
                Descrição
              </label>
              <input 
                type="text" 
                id="description" 
                name="description"
                placeholder="Escreva a descrição da transação"
                className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-400"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Data e Valor */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="date" className="text-white text-sm font-medium">
                  Data
                </label>
                <input 
                  type="date" 
                  id="date" 
                  name="date"
                  className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="value" className="text-white text-sm font-medium">
                  Valor
                </label>
                <input 
                  type="text" 
                  id="value" 
                  name="value"
                  placeholder="R$ 0,00"
                  className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-400"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Botão Criar transação */}
            <button 
              type="submit"
              className="w-full bg-[#4A69E0] text-white py-4 rounded-lg font-medium text-lg hover:bg-blue-600 transition-colors mt-8"
            >
              Criar transação
            </button>
          </form>
        </div>
      </BottomSheet>
      
      {/* Modais para categoria e conta */}
      <CreateCategoryModal />
      <CreateAccountModal />
      
      {/* Menu de ações flutuante */}
      <ActionMenu />
    </>
  );
}
