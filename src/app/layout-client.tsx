'use client';
import BottomNavigation from '@/components/BottomNavigation';
import { useModal } from '@/contexts/ModalContext';
import { usePathname } from 'next/navigation';

export default function LayoutClient() {
  const { openModal } = useModal();
  const pathname = usePathname();

  // Páginas onde a bottom navigation não deve aparecer
  const pagesWithoutBottomNav = ['/login', '/register', '/force-logout'];
  
  // Se está em uma página sem bottom nav, não renderiza nada
  if (pagesWithoutBottomNav.includes(pathname)) {
    return null;
  }

  return <BottomNavigation onAddClick={openModal} />;
}

