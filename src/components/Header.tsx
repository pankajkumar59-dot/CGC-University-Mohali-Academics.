import React from 'react';
import { StudentProfile } from '../types';

interface HeaderProps {
  currentView: string;
  onNavigate: (viewId: string) => void;
  onGoBack: () => void;
  canGoBack: boolean;
  unreadCount: number;
  currentStudent: StudentProfile;
  onOpenLogin: () => void;
  onOpenSearch: () => void;
  onLogout: () => void;
}

const VIEW_TITLES: Record<string, string> = {
  dashboard: 'Dashboard',
  notes: 'Notes & Books',
  copilot: 'CGC Copilot AI',
  syllabus: 'Curriculum',
  attendance: 'Attendance Analytics',
  results: 'Results & Transcript',
  timetable: 'Class Schedule',
  'academic-mobility': 'Academic Mobility',
  notifications: 'Notice Board',
  profile: 'Student Profile',
  'campus-info': 'Campus Guide',
  vault: 'Offline Vault'
};

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onGoBack,
  canGoBack,
  unreadCount,
  currentStudent,
  onOpenLogin,
  onOpenSearch,
  onLogout,
}) => {
  return (
    <header className="fixed top-0 w-full z-40 pt-safe bg-[#f8f9ff]/90 backdrop-blur-xl border-b border-[#e5eeff] shadow-sm">
      <div className="max-w-7xl mx-auto h-14 px-4 flex items-center justify-between gap-2">
        {/* Left: Back button + Logo + Title */}
        <div className="flex items-center gap-2 min-w-0">
          {canGoBack && currentView !== 'dashboard' && (
            <button
              onClick={onGoBack}
              aria-label="Go Back"
              className="w-8 h-8 -ml-1 rounded-full flex items-center justify-center text-[#002046] hover:bg-[#e5eeff] active:scale-95 transition-transform"
              title="Go Back"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
          )}

          <img
            alt="CGC"
            src="https://lh3.googleusercontent.com/aida/AEtjO1X4optcITPddOZqk-Lg82pxc7PUiwdylTKlr1pOEn7zrfRUAr-HkTB8VRNIxgQDjCYtSi0lTp8m5mIgIOWvNiEDYP-CpDOeuplWYqpHYqpesuitSTrEoZb18J2DdV0dbpOnRbAMMMFS0YjaXz0IE1udzHVcXs7Hb5iFX02AdMfytl2Hy2ZcwhuzYgIuTyNGwyO6NQVHh-QS44aXeZ_pg45AVZ0PlJJOxjjDWnOhW777Q_9yEVCmOdIwOk"
            className="h-7 w-auto object-contain cursor-pointer"
            onClick={() => onNavigate('dashboard')}
            title="Home - CGC University Mohali Dashboard"
          />

          <div
            className="flex flex-col min-w-0 cursor-pointer"
            onClick={() => onNavigate('dashboard')}
          >
            <span className="text-[9px] font-bold text-[#835500] uppercase tracking-wider truncate">
              CGC UNIVERSITY • 2026 MODEL
            </span>
            <span className="text-[15px] font-bold text-[#002046] truncate leading-tight">
              {VIEW_TITLES[currentView] || 'Student Portal'}
            </span>
          </div>
        </div>

        {/* Desktop Search Trigger & Nav */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#eff4ff] hover:bg-[#e5eeff] text-[#74777f] hover:text-[#002046] border border-[#cbdbf5] text-xs transition-colors shadow-xs"
            title="Search portal (Notes, Courses, Timetable, Notices)"
          >
            <span className="material-symbols-outlined text-[17px] text-[#002046]">search</span>
            <span className="text-[#44474e]">Search portal...</span>
            <span className="px-1.5 py-0.2 rounded bg-white text-[9px] font-mono border border-[#cbdbf5] text-[#74777f]">
              ⌘K
            </span>
          </button>
        </div>

        {/* Desktop Quick Nav Menu (visible on lg screens) */}
        <div className="hidden lg:flex items-center gap-1 bg-[#eff4ff] px-2 py-1 rounded-full border border-[#cbdbf5]">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              currentView === 'dashboard' ? 'bg-[#002046] text-white shadow-sm' : 'text-[#002046] hover:bg-white/60'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onNavigate('attendance')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              currentView === 'attendance' ? 'bg-[#002046] text-white shadow-sm' : 'text-[#002046] hover:bg-white/60'
            }`}
          >
            Attendance
          </button>
          <button
            onClick={() => onNavigate('results')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              currentView === 'results' ? 'bg-[#002046] text-white shadow-sm' : 'text-[#002046] hover:bg-white/60'
            }`}
          >
            Results
          </button>
          <button
            onClick={() => onNavigate('timetable')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              currentView === 'timetable' ? 'bg-[#002046] text-white shadow-sm' : 'text-[#002046] hover:bg-white/60'
            }`}
          >
            Timetable
          </button>
          <button
            onClick={() => onNavigate('notes')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              currentView === 'notes' ? 'bg-[#002046] text-white shadow-sm' : 'text-[#002046] hover:bg-white/60'
            }`}
          >
            Notes
          </button>
          <button
            onClick={() => onNavigate('copilot')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              currentView === 'copilot' ? 'bg-[#002046] text-white shadow-sm' : 'text-[#002046] hover:bg-white/60'
            }`}
          >
            AI Copilot
          </button>
          <button
            onClick={() => onNavigate('academic-mobility')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              currentView === 'academic-mobility' ? 'bg-[#002046] text-white shadow-sm' : 'text-[#002046] hover:bg-white/60'
            }`}
          >
            Mobility
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Mobile Search Button */}
          <button
            aria-label="Search Portal"
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-full text-[#002046] hover:bg-[#e5eeff] active:scale-95 border border-[#e5eeff] transition-all"
            onClick={onOpenSearch}
            title="Search Portal Content"
          >
            <span className="material-symbols-outlined text-[19px]">search</span>
          </button>

          {/* Quick Demo Switcher / Login button */}
          <button
            onClick={onOpenLogin}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#002046] text-xs font-bold border border-[#cbdbf5] transition-colors"
            title="Switch Demo Student or Login"
          >
            <span className="material-symbols-outlined text-[16px] text-[#835500]">swap_horiz</span>
            <span>Switch Student</span>
          </button>

          {/* Campus Directory */}
          <button
            aria-label="Campus Directory"
            className={`w-8 h-8 flex items-center justify-center rounded-full text-[#002046] hover:bg-[#e5eeff] active:scale-95 border border-[#e5eeff] transition-all ${
              currentView === 'campus-info' ? 'bg-[#e5eeff] ring-1 ring-[#002046]' : ''
            }`}
            onClick={() => onNavigate('campus-info')}
            title="Campus Directory & Guide"
          >
            <span className="material-symbols-outlined text-[19px]">domain</span>
          </button>

          {/* Notifications */}
          <button
            aria-label="Notifications"
            className={`relative w-8 h-8 flex items-center justify-center rounded-full text-[#002046] hover:bg-[#e5eeff] active:scale-95 transition-all ${
              currentView === 'notifications' ? 'bg-[#e5eeff] ring-1 ring-[#002046]' : ''
            }`}
            onClick={() => onNavigate('notifications')}
            title="Official Notice Board"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse"></span>
            )}
          </button>

          {/* Profile / Avatar */}
          <button
            aria-label="Profile"
            className={`w-8 h-8 rounded-full ring-2 ring-[#feae2c] active:scale-95 overflow-hidden transition-all ${
              currentView === 'profile' ? 'ring-offset-2 ring-offset-white' : ''
            }`}
            onClick={() => onNavigate('profile')}
            title={`${currentStudent.name} (${currentStudent.rollNo})`}
          >
            <img
              alt={currentStudent.name}
              className="w-full h-full object-cover"
              src={currentStudent.avatarUrl}
            />
          </button>

          {/* Quick Logout button on desktop */}
          <button
            aria-label="Logout"
            onClick={onLogout}
            className="hidden xl:flex w-8 h-8 items-center justify-center rounded-full text-[#74777f] hover:text-[#ba1a1a] hover:bg-red-50 transition-colors"
            title="Sign Out / Logout"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
