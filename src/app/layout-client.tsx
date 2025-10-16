'use client';
import BottomNavigation from '@/components/BottomNavigation';
import { useModal } from '@/contexts/ModalContext';

export default function LayoutClient() {
  const { openModal } = useModal();

  return <BottomNavigation onAddClick={openModal} />;
}

