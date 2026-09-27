import React, { useState, useMemo } from 'react';
import { NoteFile, NoticeItem, TimetableSlot } from '../../types';
import { CAMPUS_DIRECTORY, SYLLABUS_COURSES, TIMETABLE_DATA } from '../../data/mockData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (viewId: string) => void;
  onOpenNote: (note: NoteFile) => void;
  notes: NoteFile[];
  notices: NoticeItem[];
  onOpenStudyModal: () => void;
}

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Notes' | 'Courses' | 'Timetable' | 'Campus' | 'Notices' | 'Quick Actions';
  icon: string;
  action: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenNote,
  notes,
  notices,
  onOpenStudyModal,
}) => {
  const [query, setQuery] = useState('');

  const allItems = useMemo<SearchResultItem[]>(() => {
    const list: SearchResultItem[] = [];

    // Quick Actions
    list.push(
      {
        id: 'qa-bunk',
        title: 'Attendance & Bunk Simulator',
        subtitle: 'Calculate safe class skips and monitor 75% PTU margin',
        category: 'Quick Actions',
        icon: 'calculate',
        action: () => {
          onNavigate('attendance');
          onClose();
        },
      },
      {
        id: 'qa-grades',
        title: 'Results & Grade Transcript',
        subtitle: 'View SGPA progression and download provisional DMC PDF',
        category: 'Quick Actions',
        icon: 'verified',
        action: () => {
          onNavigate('results');
          onClose();
        },
      },
      {
        id: 'qa-study-session',
        title: 'Log Study Session Hours',
        subtitle: 'Record study time towards your weekly Academic Goal',
        category: 'Quick Actions',
        icon: 'timer',
        action: () => {
          onClose();
          onOpenStudyModal();
        },
      },
      {
        id: 'qa-copilot',
        title: 'CGC Copilot AI Doubt Solver',
        subtitle: 'Ask PTU syllabus questions with voice mode support',
        category: 'Quick Actions',
        icon: 'auto_awesome',
        action: () => {
          onNavigate('copilot');
          onClose();
        },
      },
      {
        id: 'qa-mobility',
        title: 'NEP 2026 Academic Mobility & ABC',
        subtitle: 'DigiLocker credit transfer and semester exchange forms (2026 Model)',
        category: 'Quick Actions',
        icon: 'swap_horiz',
        action: () => {
          onNavigate('academic-mobility');
          onClose();
        },
      }
    );

    // Notes
    notes.forEach((n) => {
      list.push({
        id: `note-${n.id}`,
        title: n.title,
        subtitle: `${n.tag} • ${n.fileSize} • By ${n.author}`,
        category: 'Notes',
        icon: 'description',
        action: () => {
          onOpenNote(n);
          onClose();
        },
      });
    });

    // Syllabus
    SYLLABUS_COURSES.forEach((c) => {
      list.push({
        id: `course-${c.code}`,
        title: `${c.name} (${c.code})`,
        subtitle: `${c.credits} Credits • ${c.completionPct}% completed PTU modules`,
        category: 'Courses',
        icon: 'assignment',
        action: () => {
          onNavigate('syllabus');
          onClose();
        },
      });
    });

    // Timetable Slots
    const thuSlots = TIMETABLE_DATA['THU'] || [];
    thuSlots.forEach((slot: TimetableSlot) => {
      list.push({
        id: `tt-${slot.id}`,
        title: `${slot.subject} (${slot.time})`,
        subtitle: `${slot.block} • ${slot.room} • ${slot.instructor}`,
        category: 'Timetable',
        icon: 'calendar_month',
        action: () => {
          onNavigate('timetable');
          onClose();
        },
      });
    });

    // Campus
    CAMPUS_DIRECTORY.forEach((cd) => {
      list.push({
        id: `campus-${cd.id}`,
        title: cd.name,
        subtitle: `${cd.category} • ${cd.campus} • Tel: ${cd.phone}`,
        category: 'Campus',
        icon: cd.icon || 'domain',
        action: () => {
          onNavigate('campus-info');
          onClose();
        },
      });
    });

    // Notices
    notices.forEach((notif) => {
      list.push({
        id: `notice-${notif.id}`,
        title: notif.title,
        subtitle: `${notif.category} Branch • ${notif.refNo} • ${notif.date}`,
        category: 'Notices',
        icon: 'campaign',
        action: () => {
          onNavigate('notifications');
          onClose();
        },
      });
    });

    return list;
  }, [notes, notices, onNavigate, onOpenNote, onClose, onOpenStudyModal]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return allItems.slice(0, 8); // show quick actions and top items
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query, allItems]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/65 backdrop-blur-sm p-4 pt-16 sm:pt-20 animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#eff4ff] flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-3.5 bg-[#002046] text-white flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[#feae2c] text-[22px]">search</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes, courses, timetable, faculty, campus buildings..."
            className="flex-1 bg-transparent text-white text-xs sm:text-sm placeholder:text-[#87a0cd] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#87a0cd] hover:text-white"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] text-white font-bold"
          >
            Esc
          </button>
        </div>

        {/* Results Body */}
        <div className="p-3 overflow-y-auto space-y-1.5 divide-y divide-[#cbdbf5]/40 text-xs">
          {filtered.length === 0 ? (
            <div className="p-8 text-center">
              <span className="material-symbols-outlined text-3xl text-[#74777f]">search_off</span>
              <p className="font-bold text-[#002046] mt-1">No matching portal content</p>
              <p className="text-[11px] text-[#74777f]">Try keywords like "OS", "Attendance", "MST", or "Library"</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={item.action}
                className="pt-1.5 first:pt-0 pb-1.5 flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-[#eff4ff] cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#eff4ff] group-hover:bg-[#dce9ff] flex items-center justify-center text-[#002046] shrink-0 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-[#002046] text-xs truncate group-hover:text-[#835500]">
                        {item.title}
                      </h4>
                      <span className="text-[8px] px-1.5 py-0.2 rounded bg-[#e5eeff] text-[#002046] font-semibold shrink-0">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#74777f] truncate mt-0.5">{item.subtitle}</p>
                  </div>
                </div>

                <span className="material-symbols-outlined text-[16px] text-[#74777f] group-hover:text-[#002046] shrink-0">
                  arrow_forward
                </span>
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-2.5 bg-[#f8f9ff] border-t border-[#cbdbf5] flex items-center justify-between text-[10px] text-[#74777f] px-4">
          <span>Search across 60+ CGC Mohali courses, faculty &amp; notices</span>
          <span className="font-mono bg-[#eff4ff] px-1.5 py-0.5 rounded text-[#002046] font-bold">
            CGC Portal
          </span>
        </div>
      </div>
    </div>
  );
};
