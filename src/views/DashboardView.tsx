import React from 'react';
import { StudentProfile, NoteFile, AcademicGoal, StudySession } from '../types';
import { AcademicGoalsCard } from '../components/AcademicGoalsCard';

interface DashboardViewProps {
  student: StudentProfile;
  onNavigate: (viewId: string) => void;
  onOpenNoteReader: (note: NoteFile) => void;
  onTriggerDownload: (filename: string, title?: string) => void;
  onOpenPyqDrawer: () => void;
  onOpenMasterRepo: () => void;
  onOpenNoticeModal: (refNo: string) => void;
  recentNotes: NoteFile[];
  academicGoal: AcademicGoal;
  onUpdateTargetHours: (newTarget: number) => void;
  onLogStudySession: (session: Omit<StudySession, 'id' | 'date'>) => void;
  onResetWeeklySessions: () => void;
  onOpenStudySessionModal: () => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  student,
  onNavigate,
  onOpenNoteReader,
  onTriggerDownload,
  onOpenPyqDrawer,
  onOpenMasterRepo,
  onOpenNoticeModal,
  recentNotes,
  academicGoal,
  onUpdateTargetHours,
  onLogStudySession,
  onResetWeeklySessions,
  onOpenStudySessionModal,
  onShowToast,
}) => {
  return (
    <section className="flex flex-col w-full px-4 pt-3 pb-6 gap-3.5 max-w-4xl mx-auto">
      {/* Student Standing Hero Card */}
      <div className="relative overflow-hidden rounded-2xl bg-[#1b365d] text-white p-4 shadow-md border border-white/10">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
              <button
                onClick={() => onNavigate('campus-info')}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#feae2c] text-[#6b4500] text-[9px] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#835500]"></span>
                {student.campus}
              </button>
              <span className="text-[#87a0cd] text-[10px]">
                • Sem {student.semester} ({student.section})
              </span>
            </div>

            <h2
              className="text-xl sm:text-2xl font-extrabold tracking-tight truncate flex items-center gap-1 cursor-pointer hover:text-[#feae2c] transition-colors"
              onClick={() => onNavigate('profile')}
            >
              {student.name}
              <span className="material-symbols-outlined text-[20px] text-[#feae2c]">
                chevron_right
              </span>
            </h2>

            <p
              className="text-[11px] text-[#87a0cd] mt-0.5 cursor-pointer hover:underline"
              onClick={() => onNavigate('profile')}
            >
              Roll No: {student.rollNo} • {student.course} {student.branch.split(' ')[0]}
            </p>
          </div>

          {/* Attendance Circle (Clickable to Attendance View) */}
          <div
            className="flex flex-col items-center shrink-0 bg-white/10 hover:bg-white/20 active:scale-95 transition-all cursor-pointer rounded-xl p-2 border border-white/10"
            onClick={() => onNavigate('attendance')}
            title="View Attendance & Bunk Simulator"
          >
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#87a0cd] opacity-30"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                ></path>
                <path
                  className="text-[#feae2c]"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray={`${Math.round(student.overallAttendance)}, 100`}
                  strokeLinecap="round"
                  strokeWidth="3.5"
                ></path>
              </svg>
              <span className="absolute text-xs font-black text-white">
                {Math.round(student.overallAttendance)}%
              </span>
            </div>
            <span className="text-[9px] font-bold text-[#feae2c] mt-0.5 flex items-center gap-0.5 whitespace-nowrap">
              Safe (&gt;75%) <span className="material-symbols-outlined text-[10px]">open_in_new</span>
            </span>
          </div>
        </div>

        {/* CGPA & Academic Mobility Links */}
        <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between text-xs flex-wrap gap-2">
          <div
            className="flex items-center gap-1.5 cursor-pointer bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg transition-colors"
            onClick={() => onNavigate('results')}
          >
            <span className="material-symbols-outlined text-[15px] text-[#feae2c]">verified</span>
            <span className="text-white font-bold">CGPA: {student.cgpa.toFixed(2)}</span>
            <span className="text-[10px] text-[#feae2c] underline ml-0.5">Grade Sheet</span>
          </div>

          <div
            className="flex items-center gap-1 text-[11px] cursor-pointer hover:text-white transition-colors"
            onClick={() => onNavigate('academic-mobility')}
          >
            <span className="w-2 h-2 rounded-full bg-[#feae2c] animate-pulse"></span>
            <span className="text-white font-medium">NEP Mobility 2024</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          </div>
        </div>
      </div>

      {/* Next Up Lecture Banner (Clickable to Timetable) */}
      <div
        className="relative overflow-hidden rounded-xl bg-white p-3 shadow-sm border border-[#e5eeff] hover:border-[#feae2c]/60 cursor-pointer active:scale-[0.99] transition-all"
        onClick={() => onNavigate('timetable')}
      >
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#feae2c]"></div>
        <div className="flex items-start justify-between gap-2 pl-1">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#e5eeff] flex items-center justify-center text-[#002046] shrink-0">
              <span className="material-symbols-outlined text-[20px]">laptop_mac</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#dce9ff] text-[#002046] font-bold">
                  NEXT UP • 11:00 AM
                </span>
                <span className="text-[10px] text-[#835500] font-bold">Block 3 • Rm 302</span>
              </div>
              <h3 className="text-xs font-bold text-[#002046] truncate mt-0.5">Foundations of AI &amp; Python</h3>
              <p className="text-[11px] text-[#44474e] truncate">
                Ms. Garima Singh Thakur • Unit 1 Introduction to AI &amp; Heuristics
              </p>
            </div>
          </div>
          <button
            aria-label="View Schedule"
            className="shrink-0 w-8 h-8 rounded-full bg-[#e5eeff] hover:bg-[#dce9ff] flex items-center justify-center text-[#002046] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
          </button>
        </div>
      </div>

      {/* Academic Goals & Study Hours Tracker Feature */}
      <AcademicGoalsCard
        goal={academicGoal}
        onUpdateTargetHours={onUpdateTargetHours}
        onLogStudySession={onLogStudySession}
        onResetWeeklySessions={onResetWeeklySessions}
        onOpenStudySessionModal={onOpenStudySessionModal}
        onShowToast={onShowToast}
      />

      {/* Academic Hub 2x2 Grid */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#002046] uppercase tracking-wide">Academic Hub</h3>
          <span className="text-[9px] text-[#835500] font-bold uppercase">Fast Access</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Notes & Books */}
          <div
            className="p-3 rounded-xl bg-white border border-[#e5eeff] shadow-sm hover:border-[#835500] hover:shadow transition-all cursor-pointer active:scale-95 flex flex-col justify-between"
            onClick={() => onNavigate('notes')}
          >
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-lg bg-[#dce9ff] text-[#002046] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">menu_book</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-full bg-[#feae2c] text-[#6b4500] text-[8px] font-bold">
                48 New
              </span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#002046] mt-2">Notes &amp; Books</h4>
              <p className="text-[10px] text-[#44474e] truncate">Curated toppers' pdfs</p>
            </div>
          </div>

          {/* Curriculum */}
          <div
            className="p-3 rounded-xl bg-white border border-[#e5eeff] shadow-sm hover:border-[#835500] hover:shadow transition-all cursor-pointer active:scale-95 flex flex-col justify-between"
            onClick={() => onNavigate('syllabus')}
          >
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-lg bg-[#dce9ff] text-[#002046] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-full bg-[#e5eeff] text-[#002046] text-[8px] font-bold">
                2024-25
              </span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#002046] mt-2">Curriculum</h4>
              <p className="text-[10px] text-[#44474e] truncate">PTU scheme &amp; units</p>
            </div>
          </div>

          {/* Solved PYQs */}
          <div
            className="p-3 rounded-xl bg-white border border-[#e5eeff] shadow-sm hover:border-[#835500] hover:shadow transition-all cursor-pointer active:scale-95 flex flex-col justify-between"
            onClick={onOpenPyqDrawer}
          >
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-lg bg-[#dce9ff] text-[#002046] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">history_edu</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-full bg-[#e5eeff] text-[#002046] text-[8px] font-bold">
                Solved
              </span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#002046] mt-2">PYQ Papers</h4>
              <p className="text-[10px] text-[#44474e] truncate">Mid-term &amp; End-term</p>
            </div>
          </div>

          {/* CGC Copilot AI */}
          <div
            className="p-3 rounded-xl bg-[#002046] text-white shadow-sm hover:bg-[#1b365d] hover:shadow transition-all cursor-pointer active:scale-95 flex flex-col justify-between"
            onClick={() => onNavigate('copilot')}
          >
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-lg bg-white/10 text-[#feae2c] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-full bg-[#feae2c] text-[#6b4500] text-[8px] font-bold">
                Smart AI
              </span>
            </div>
            <div>
              <h4 className="text-xs font-bold mt-2">CGC Copilot</h4>
              <p className="text-[10px] text-[#87a0cd] truncate">Instant doubt solver</p>
            </div>
          </div>
        </div>
      </div>

      {/* Department Study Shelf Spotlight */}
      <div className="p-3 rounded-xl bg-white border border-[#e5eeff] shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#835500]">local_library</span>
            <span className="text-xs font-bold text-[#002046]">Department Study Shelf</span>
          </div>
          <button
            onClick={() => onNavigate('notes')}
            className="text-[11px] font-bold text-[#835500] hover:underline"
          >
            View All
          </button>
        </div>

        <div
          className="p-3 rounded-lg bg-gradient-to-r from-[#1b365d] to-[#002046] text-white flex items-center justify-between cursor-pointer active:scale-[0.99] transition-transform hover:shadow"
          onClick={onOpenMasterRepo}
        >
          <div className="min-w-0 pr-2">
            <span className="px-1.5 py-0.5 rounded bg-[#feae2c] text-[#6b4500] text-[8px] font-bold uppercase">
              CSE AIML 1st Sem Master Vault
            </span>
            <p className="text-xs font-bold text-white truncate mt-1">
              Handwritten Notes, Python &amp; AI Lab Codes
            </p>
            <p className="text-[10px] text-[#87a0cd]">Mentor: Ms. Garima Singh Thakur, Dr. Manjit Singh</p>
          </div>
          <span className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </span>
        </div>
      </div>

      {/* Recent Notes & Materials List */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[17px] text-[#002046]">description</span>
            <h3 className="text-xs font-bold text-[#002046]">Recent Notes &amp; Materials</h3>
          </div>
          <button
            className="text-[11px] text-[#835500] font-bold hover:underline"
            onClick={() => onNavigate('notes')}
          >
            Explore 50+ Files
          </button>
        </div>

        <div className="space-y-2">
          {recentNotes.slice(0, 3).map((note) => (
            <div
              key={note.id}
              className="p-2.5 rounded-xl bg-white border border-[#e5eeff] shadow-sm flex items-center justify-between gap-2.5 hover:border-[#feae2c]/60 transition-colors"
            >
              <div
                className="flex items-center gap-2.5 min-w-0 cursor-pointer flex-1"
                onClick={() => onOpenNoteReader(note)}
              >
                <div className="w-9 h-9 rounded-lg bg-[#dce9ff] flex flex-col items-center justify-center text-[#002046] shrink-0">
                  <span className="material-symbols-outlined text-[17px]">
                    {note.subjectCategory === 'DAA' ? 'code' : note.subjectCategory === 'DBMS' ? 'database' : 'picture_as_pdf'}
                  </span>
                  <span className="text-[8px] font-bold text-[#835500]">{note.fileSize}</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <h4 className="text-xs font-bold text-[#002046] truncate">{note.title}</h4>
                  <p className="text-[10px] text-[#44474e] truncate">{note.description}</p>
                </div>
              </div>

              <button
                aria-label={`Download ${note.title}`}
                className="w-8 h-8 rounded-full bg-[#e5eeff] hover:bg-[#feae2c] hover:text-[#6b4500] active:scale-90 flex items-center justify-center text-[#002046] transition-all shrink-0"
                onClick={() => onTriggerDownload(note.filename, note.title)}
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CGC Official Notice Board Widget */}
      <div
        className="p-3 rounded-xl bg-white border border-[#e5eeff] shadow-sm flex flex-col gap-1.5 cursor-pointer hover:border-[#835500] transition-all"
        onClick={() => onOpenNoticeModal('CGC/EXAM/24/109')}
      >
        <div className="flex items-center justify-between">
          <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[9px] font-bold uppercase">
            Exam Alert
          </span>
          <span className="text-[10px] text-[#44474e]">Yesterday</span>
        </div>
        <h4 className="text-xs font-bold text-[#002046]">
          Mid Semester Examination (MST-1) datesheet released for 2nd year
        </h4>
        <p className="text-[10px] text-[#44474e]">
          Exams commence from Oct 14th across all engineering wings. Block 3 designated for CSE students.
        </p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-[#002046] font-bold inline-flex items-center gap-1 hover:text-[#835500]">
            View Notice &amp; Schedule <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </span>
          <span className="text-[9px] text-[#835500] font-semibold">Ref: CGC/EXAM/24/109</span>
        </div>
      </div>

      {/* Ask AI Bottom Banner */}
      <div className="p-3 rounded-xl bg-[#dce9ff] flex items-center justify-between gap-3 border border-[#d3e4fe]">
        <div className="flex items-center gap-2 min-w-0">
          <span className="material-symbols-outlined text-[20px] text-[#835500]">help</span>
          <div className="min-w-0">
            <p className="text-xs font-bold text-[#002046] truncate">Have syllabus or exam doubts?</p>
            <p className="text-[10px] text-[#44474e] truncate">Ask CGC Copilot AI or reach CSE desk</p>
          </div>
        </div>
        <button
          className="px-3 py-1.5 rounded-lg bg-[#002046] text-white text-xs font-bold active:scale-95 hover:bg-[#1b365d] transition-all shrink-0 shadow-sm"
          onClick={() => onNavigate('copilot')}
        >
          Ask AI
        </button>
      </div>
    </section>
  );
};
