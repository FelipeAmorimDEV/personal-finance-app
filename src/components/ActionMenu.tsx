'use client';
import { useModal } from '@/contexts/ModalContext';
import { useState } from 'react';

export default function ActionMenu() {
  const { openModal, openCategoryModal, openAccountModal } = useModal();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-20 right-4 z-30">
      <div className="flex flex-col space-y-3">
        {/* Botões secundários - aparecem quando expandido */}
        {isExpanded && (
          <>
            {/* Botão Adicionar Categoria */}
            <button
              onClick={() => {
                openCategoryModal();
                setIsExpanded(false);
              }}
              className="w-14 h-14 bg-[#33B183] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 animate-in slide-in-from-bottom-2 relative group"
            >
              {/* Tooltip */}
              <div className="absolute right-full mr-3 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                Adicionar Nova Categoria
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
              </div>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </button>

            {/* Botão Adicionar Conta */}
            <button
              onClick={() => {
                openAccountModal();
                setIsExpanded(false);
              }}
              className="w-14 h-14 bg-[#8B5CF6] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 animate-in slide-in-from-bottom-2 relative group"
            >
              {/* Tooltip */}
              <div className="absolute right-full mr-3 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                Adicionar Nova Conta
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
              </div>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </button>

            {/* Botão Adicionar Transação */}
            <button
              onClick={() => {
                openModal();
                setIsExpanded(false);
              }}
              className="w-14 h-14 bg-[#4A69E0] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 animate-in slide-in-from-bottom-2 relative group"
            >
              {/* Tooltip */}
              <div className="absolute right-full mr-3 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                Adicionar Nova Transação
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
              </div>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </>
        )}

        {/* Botão principal - sempre visível */}
        <button
          onClick={toggleMenu}
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 relative group ${
            isExpanded 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-gradient-to-b from-[#A78BFA] to-[#7C3AED] hover:from-[#8B5CF6] hover:to-[#6D28D9]'
          }`}
        >
          {/* Tooltip */}
          <div className="absolute right-full mr-3 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            {isExpanded ? "Fechar menu de ações" : "Abrir menu de ações"}
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
          </div>

          {/* Ícone de menu hambúrguer quando fechado */}
          {!isExpanded && (
            <svg 
              className="w-8 h-8 text-white transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          )}

          {/* Ícone de X quando aberto */}
          {isExpanded && (
            <svg 
              className="w-8 h-8 text-white transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
