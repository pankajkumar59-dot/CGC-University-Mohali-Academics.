import React from 'react';
import { StudentProfile } from '../types';

interface SidebarProps {
  currentView: string;
  onNavigate: (viewId: string) => void;
  currentStudent: StudentProfile;
  unreadCount: number;
  offlineCount: number;
  onOpenLogin: () => void;
  onOpenSearch: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  currentStudent,
  unreadCount,
  offlineCount,
  onOpenLogin,
  onOpenSearch,
  onLogout,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'attendance', label: 'Attendance & Bunks', icon: 'donut_large', badge: `${currentStudent.overallAttendance}%` },
    { id: 'results', label: 'Results & Transcript', icon: 'verified', badge: `CGPA ${currentStudent.cgpa}` },
    { id: 'timetable', label: 'Class Timetable', icon: 'calendar_month' },
    { id: 'notes', label: 'Notes & Books', icon: 'menu_book', count: '48 New' },
    { id: 'copilot', label: 'CGC Copilot AI', icon: 'auto_awesome', highlight: true },
    { id: 'syllabus', label: 'Curriculum Scheme', icon: 'assignment' },
    { id: 'academic-mobility', label: 'Academic Mobility', icon: 'swap_horiz' },
    { id: 'notifications', label: 'Notice Board', icon: 'campaign', unread: unreadCount },
    { id: 'campus-info', label: 'Campus Guide', icon: 'domain' },
    { id: 'vault', label: 'Offline Vault', icon: 'folder_special', count: `${offlineCount}` },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white border-r border-[#cbdbf5] h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto no-scrollbar py-4 px-3 justify-between">
      <div className="space-y-4">
        {/* Student Mini Card */}
        <div
          onClick={() => onNavigate('profile')}
          className="p-3 rounded-2xl bg-gradient-to-r from-[#002046] to-[#1b365d] text-white cursor-pointer hover:shadow-md transition-all flex items-center gap-2.5"
        >
          <img
            src={currentStudent.avatarUrl}
            alt={currentStudent.name}
            className="w-10 h-10 rounded-xl object-cover ring-2 ring-[#feae2c] shrink-0"
          />
          <div className="min-w-0">
            <h4 className="text-xs font-bold truncate leading-tight">{currentStudent.name}</h4>
            <p className="text-[10px] text-[#87a0cd] truncate">Roll: {currentStudent.rollNo}</p>
            <span className="text-[9px] text-[#feae2c] font-semibold block truncate">
              {currentStudent.campus.split(' ')[0]} • Sem {currentStudent.semester}
            </span>
          </div>
        </div>

        {/* Global Search Button in Sidebar */}
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold bg-[#eff4ff] hover:bg-[#e5eeff] text-[#002046] border border-[#cbdbf5] transition-all shadow-xs"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#002046]">search</span>
            <span>Search Portal...</span>
          </div>
          <span className="text-[9px] font-mono bg-white px-1.5 py-0.5 rounded border border-[#cbdbf5] text-[#74777f]">
            ⌘K
          </span>
        </button>

        {/* Navigation list */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#74777f] mb-1">
            Student Navigation
          </p>
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#002046] text-white shadow-sm'
                    : 'text-[#0b1c30] hover:bg-[#eff4ff]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`material-symbols-outlined text-[19px] ${
                      item.highlight ? 'text-[#835500]' : ''
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                        isActive
                          ? 'bg-[#feae2c] text-[#6b4500]'
                          : 'bg-[#eff4ff] text-[#002046]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.count && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#feae2c] text-[#6b4500] font-bold">
                      {item.count}
                    </span>
                  )}
                  {Boolean(item.unread) && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#ba1a1a] text-white font-bold">
                      {item.unread}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Switch Student, Logout & Help info */}
      <div className="pt-4 border-t border-[#cbdbf5] space-y-2">
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={onOpenLogin}
            className="py-2 px-2 rounded-xl bg-[#eff4ff] text-[#002046] hover:bg-[#e5eeff] font-bold text-[11px] border border-[#cbdbf5] flex items-center justify-center gap-1 transition-colors"
            title="Switch Demo Student"
          >
            <span className="material-symbols-outlined text-[15px] text-[#835500]">switch_account</span>
            <span>Switch</span>
          </button>

          <button
            onClick={onLogout}
            className="py-2 px-2 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 font-bold text-[11px] border border-red-200 flex items-center justify-center gap-1 transition-colors"
            title="Log Out of Student ERP"
          >
            <span className="material-symbols-outlined text-[15px]">logout</span>
            <span>Log Out</span>
          </button>
        </div>

        <div className="p-2.5 rounded-xl bg-[#f8f9ff] border border-[#e5eeff] text-[10px] text-[#44474e]">
          <p className="font-bold text-[#002046]">CGC Landran Helpline</p>
          <p>+91 172-3984200 (Ext 104)</p>
          <p className="text-[#835500] font-semibold mt-0.5">I.K. Gujral PTU Scheme 2024</p>
        </div>
      </div>
    </aside>
  );
};
