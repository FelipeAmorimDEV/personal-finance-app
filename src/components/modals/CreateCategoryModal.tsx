'use client';
import BottomSheet from '@/components/ui/BottomSheet';
import { useModal } from '@/contexts/ModalContext';
import { useState } from 'react';
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';

export default function CreateCategoryModal() {
  const { isCategoryModalOpen, setIsCategoryModalOpen } = useModal();
  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<string>('#4A69E0');
  const [icon, setIcon] = useState<string>('📁');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          color,
          icon
        })
      });
      
      if (!response.ok) {
        toast.error('Erro ao criar categoria');
        throw new Error('Failed to create category');
      }

      toast.success('Categoria criada com sucesso');
      setIsCategoryModalOpen(false);
      setName('');
      setColor('#4A69E0');
      setIcon('📁');
      router.refresh();
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error('Erro ao criar categoria');
    }
  };

  const colors = [
    '#4A69E0', '#33B183', '#BD4343', '#F59E0B', 
    '#8B5CF6', '#EF4444', '#10B981', '#F97316'
  ];

  const icons = ['📁', '🍔', '🚗', '🎬', '💊', '📚', '🏠', '💰', '🛒', '🎮'];

  return (
    <BottomSheet isOpen={isCategoryModalOpen} setIsOpen={setIsCategoryModalOpen}>
      <div className="space-y-6">
        <h2 className="text-white text-xl font-semibold">Criar Nova Categoria</h2>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Nome da categoria */}
          <div className="space-y-2">
            <label htmlFor="categoryName" className="text-white text-sm font-medium">
              Nome da categoria
            </label>
            <input 
              type="text" 
              id="categoryName" 
              name="categoryName"
              placeholder="Ex: Alimentação"
              className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
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

          {/* Botão Criar categoria */}
          <button 
            type="submit"
            className="w-full bg-[#4A69E0] text-white py-4 rounded-lg font-medium text-lg hover:bg-blue-600 transition-colors mt-8"
          >
            Criar categoria
          </button>
        </form>
      </div>
    </BottomSheet>
  );
}
