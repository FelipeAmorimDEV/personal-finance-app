'use client';
import BottomSheet from '@/components/ui/BottomSheet';
import { useModal } from '@/contexts/ModalContext';
import { useState } from 'react';
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';

export default function CreateAccountModal() {
  const { isAccountModalOpen, setIsAccountModalOpen } = useModal();
  const [name, setName] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  const [color, setColor] = useState<string>('#4A69E0');
  const [icon, setIcon] = useState<string>('🏦');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const accountData = {
        name,
        balance: balance ? parseFloat(balance) : 0,
        color,
        icon
      };
      
      console.log('=== MODAL - Sending account data ===');
      console.log('Modal data:', accountData);
      console.log('Modal data stringified:', JSON.stringify(accountData));
      
      const response = await fetch('/api/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountData)
      });
      
      if (!response.ok) {
        toast.error('Erro ao criar conta');
        throw new Error('Failed to create account');
      }

      toast.success('Conta criada com sucesso');
      setIsAccountModalOpen(false);
      setName('');
      setBalance('');
      setColor('#4A69E0');
      setIcon('🏦');
      router.refresh();
    } catch (error) {
      console.error('Error creating account:', error);
      toast.error('Erro ao criar conta');
    }
  };

  const colors = [
    '#4A69E0', '#33B183', '#BD4343', '#F59E0B', 
    '#8B5CF6', '#EF4444', '#10B981', '#F97316'
  ];

  const icons = ['🏦', '💳', '💰', '📱', '🏠', '🚗', '📊', '🎯', '⭐', '💎'];

  return (
    <BottomSheet isOpen={isAccountModalOpen} setIsOpen={setIsAccountModalOpen}>
      <div className="space-y-6">
        <h2 className="text-white text-xl font-semibold">Criar Nova Conta</h2>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Nome da conta */}
          <div className="space-y-2">
            <label htmlFor="accountName" className="text-white text-sm font-medium">
              Nome da conta
            </label>
            <input 
              type="text" 
              id="accountName" 
              name="accountName"
              placeholder="Ex: Conta Corrente"
              className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Saldo inicial */}
          <div className="space-y-2">
            <label htmlFor="initialBalance" className="text-white text-sm font-medium">
              Saldo inicial
            </label>
            <input 
              type="number" 
              id="initialBalance" 
              name="initialBalance"
              placeholder="R$ 0,00"
              step="0.01"
              className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-400"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            />
          </div>

          {/* Cor */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium">
              Cor
            </label>
            <div className="grid grid-cols-4 gap-3">
              {colors.map((colorOption) => (
                <button
                  key={colorOption}
                  type="button"
                  className={`w-12 h-12 rounded-lg border-2 ${
                    color === colorOption ? 'border-white' : 'border-slate-600'
                  }`}
                  style={{ backgroundColor: colorOption }}
                  onClick={() => setColor(colorOption)}
                />
              ))}
            </div>
          </div>

          {/* Ícone */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium">
              Ícone
            </label>
            <div className="grid grid-cols-5 gap-3">
              {icons.map((iconOption) => (
                <button
                  key={iconOption}
                  type="button"
                  className={`w-12 h-12 rounded-lg border-2 text-2xl flex items-center justify-center ${
                    icon === iconOption ? 'border-white bg-slate-600' : 'border-slate-600 bg-slate-700'
                  }`}
                  onClick={() => setIcon(iconOption)}
                >
                  {iconOption}
                </button>
              ))}
            </div>
          </div>

          {/* Botão Criar conta */}
          <button 
            type="submit"
            className="w-full bg-[#4A69E0] text-white py-4 rounded-lg font-medium text-lg hover:bg-blue-600 transition-colors mt-8"
          >
            Criar conta
          </button>
        </form>
      </div>
    </BottomSheet>
  );
}
