'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  // Modal de transação
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  openModal: () => void;
  closeModal: () => void;
  
  // Modal de categoria
  isCategoryModalOpen: boolean;
  setIsCategoryModalOpen: (isOpen: boolean) => void;
  openCategoryModal: () => void;
  closeCategoryModal: () => void;
  
  // Modal de conta
  isAccountModalOpen: boolean;
  setIsAccountModalOpen: (isOpen: boolean) => void;
  openAccountModal: () => void;
  closeAccountModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const openCategoryModal = () => setIsCategoryModalOpen(true);
  const closeCategoryModal = () => setIsCategoryModalOpen(false);
  
  const openAccountModal = () => setIsAccountModalOpen(true);
  const closeAccountModal = () => setIsAccountModalOpen(false);

  return (
    <ModalContext.Provider value={{
      isModalOpen,
      setIsModalOpen,
      openModal,
      closeModal,
      isCategoryModalOpen,
      setIsCategoryModalOpen,
      openCategoryModal,
      closeCategoryModal,
      isAccountModalOpen,
      setIsAccountModalOpen,
      openAccountModal,
      closeAccountModal
    }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

