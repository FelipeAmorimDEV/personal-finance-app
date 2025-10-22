'use client';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { logout } = useAuth();

  return (
    <header className="bg-[#1A1D31] px-4 py-4 flex justify-between items-center">
      {/* Logo/Title */}
      <div className="flex items-center">
        <h1 className="text-white font-semibold text-lg">Personal Finance</h1>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Botão Logout */}
        <button 
          onClick={logout}
          className="text-slate-400 hover:text-white transition-colors"
          title="Sair"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {/* Avatar */}
        <div className="w-10 h-10 bg-[#5C78E0] rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-sm">FA</span>
        </div>
      </div>
    </header>
  );
}
