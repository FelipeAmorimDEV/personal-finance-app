export default function Header() {
  return (
    <header className="bg-[#1A1D31] px-4 py-4 flex justify-between items-center">
      {/* Hamburger Menu */}
      <button className="text-white">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {/* Avatar */}
      <div className="w-10 h-10 bg-[#5C78E0] rounded-full flex items-center justify-center">
        <span className="text-white font-semibold text-sm">FA</span>
      </div>
    </header>
  );
}
