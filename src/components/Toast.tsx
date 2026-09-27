import React from 'react';

interface ToastProps {
  message: string;
  icon?: string;
  visible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, icon = 'check_circle', visible }) => {
  return (
    <div
      className={`fixed top-16 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 pointer-events-none ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
    >
      <div className="px-4 py-2 rounded-full bg-[#002046] text-white text-xs font-semibold shadow-xl border border-[#feae2c] flex items-center gap-2">
        <span className="material-symbols-outlined text-[#feae2c] text-[16px]">{icon}</span>
        <span>{message}</span>
      </div>
    </div>
  );
};
