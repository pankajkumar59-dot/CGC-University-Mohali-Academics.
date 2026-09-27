import React from 'react';

interface BottomNavProps {
  currentView: string;
  onNavigate: (viewId: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-[#f8f9ff]/95 backdrop-blur-xl border-t border-[#e5eeff] shadow-md lg:hidden">
      <div className="flex justify-around items-center h-14 px-1">
        <button
          className={`flex-1 flex flex-col items-center justify-center h-full transition-colors ${
            currentView === 'dashboard'
              ? 'text-[#002046] font-bold'
              : 'text-[#44474e] hover:text-[#002046]'
          }`}
          onClick={() => onNavigate('dashboard')}
        >
          <span className="material-symbols-outlined text-[22px]">home</span>
          <span className="text-[10px] mt-0.5">Dashboard</span>
        </button>

        <button
          className={`flex-1 flex flex-col items-center justify-center h-full transition-colors ${
            currentView === 'notes' || currentView === 'vault'
              ? 'text-[#002046] font-bold'
              : 'text-[#44474e] hover:text-[#002046]'
          }`}
          onClick={() => onNavigate('notes')}
        >
          <span className="material-symbols-outlined text-[22px]">menu_book</span>
          <span className="text-[10px] mt-0.5">Notes &amp; Books</span>
        </button>

        <button
          className={`flex-1 flex flex-col items-center justify-center h-full transition-colors ${
            currentView === 'copilot'
              ? 'text-[#002046] font-bold'
              : 'text-[#44474e] hover:text-[#002046]'
          }`}
          onClick={() => onNavigate('copilot')}
        >
          <div className="relative flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px] text-[#835500]">auto_awesome</span>
          </div>
          <span className="text-[10px] mt-0.5">CGC Copilot</span>
        </button>

        <button
          className={`flex-1 flex flex-col items-center justify-center h-full transition-colors ${
            currentView === 'syllabus'
              ? 'text-[#002046] font-bold'
              : 'text-[#44474e] hover:text-[#002046]'
          }`}
          onClick={() => onNavigate('syllabus')}
        >
          <span className="material-symbols-outlined text-[22px]">assignment</span>
          <span className="text-[10px] mt-0.5">Syllabus</span>
        </button>
      </div>
    </nav>
  );
};
