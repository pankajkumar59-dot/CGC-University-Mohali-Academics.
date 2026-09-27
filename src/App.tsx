import { useState, useCallback, useEffect } from 'react';
import { StudentProfile, NoteFile, NoticeItem, AcademicGoal, StudySession } from './types';
import {
  DEMO_STUDENTS,
  NOTES_COLLECTION,
  NOTICES_LIST,
} from './data/mockData';
import { downloadAcademicFile } from './utils/fileDownloader';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { NoteReaderModal } from './components/modals/NoteReaderModal';
import { PyqDrawerModal } from './components/modals/PyqDrawerModal';
import { MasterRepoModal } from './components/modals/MasterRepoModal';
import { NoticeDetailModal } from './components/modals/NoticeDetailModal';
import { LoginModal } from './components/modals/LoginModal';
import { StudySessionModal } from './components/modals/StudySessionModal';
import { GlobalSearchModal } from './components/modals/GlobalSearchModal';

// Views
import { DashboardView } from './views/DashboardView';
import { AttendanceView } from './views/AttendanceView';
import { ResultsView } from './views/ResultsView';
import { TimetableView } from './views/TimetableView';
import { AcademicMobilityView } from './views/AcademicMobilityView';
import { NotesView } from './views/NotesView';
import { CopilotView } from './views/CopilotView';
import { SyllabusView } from './views/SyllabusView';
import { NotificationsView } from './views/NotificationsView';
import { ProfileView } from './views/ProfileView';
import { CampusInfoView } from './views/CampusInfoView';
import { VaultView } from './views/VaultView';

export default function App() {
  // State: Current authenticated student
  const [currentStudent, setCurrentStudent] = useState<StudentProfile>(DEMO_STUDENTS[0]);

  // Navigation History
  const [navHistory, setNavHistory] = useState<string[]>(['dashboard']);
  const currentView = navHistory[navHistory.length - 1] || 'dashboard';

  // State: Notes & Offline Vault
  const [notes, setNotes] = useState<NoteFile[]>(NOTES_COLLECTION);
  const [notices, setNotices] = useState<NoticeItem[]>(NOTICES_LIST);

  // Modals state
  const [activeNoteForReader, setActiveNoteForReader] = useState<NoteFile | null>(null);
  const [isPyqOpen, setIsPyqOpen] = useState(false);
  const [isMasterRepoOpen, setIsMasterRepoOpen] = useState(false);
  const [activeNoticeForModal, setActiveNoticeForModal] = useState<NoticeItem | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Toast alert state
  const [toast, setToast] = useState<{ message: string; icon: string; visible: boolean }>({
    message: '',
    icon: 'check_circle',
    visible: false,
  });

  // State: Academic Goals & Study Hours Tracking
  const [academicGoal, setAcademicGoal] = useState<AcademicGoal>({
    weeklyTargetHours: 20,
    completedHours: 14.5,
    sessions: [
      {
        id: 's1',
        subject: 'Foundations of AI & Python',
        subjectCode: 'BTAI-101',
        durationHours: 3.0,
        date: '2026-09-21',
        day: 'Mon',
        topic: 'Introduction to AI Agents & Heuristic Search'
      },
      {
        id: 's2',
        subject: 'Applied Mathematics - I',
        subjectCode: 'BTAM-101',
        durationHours: 3.0,
        date: '2026-09-22',
        day: 'Tue',
        topic: 'Matrices, Eigenvalues & Linear Algebra for AI'
      },
      {
        id: 's3',
        subject: 'Engineering Physics',
        subjectCode: 'BTPH-101',
        durationHours: 2.5,
        date: '2026-09-23',
        day: 'Wed',
        topic: 'Quantum Mechanics & Semiconductor Band Theory'
      },
      {
        id: 's4',
        subject: 'Foundations of AI & Python',
        subjectCode: 'BTAI-101',
        durationHours: 3.0,
        date: '2026-09-24',
        day: 'Thu',
        topic: 'Python NumPy & Decision Tree Formulations'
      },
      {
        id: 's5',
        subject: 'AI & Python Practical Lab',
        subjectCode: 'BTAI-102',
        durationHours: 3.0,
        date: '2026-09-25',
        day: 'Fri',
        topic: 'State Space Search Graphs Implementation'
      }
    ]
  });

  const handleUpdateTargetHours = useCallback((newTarget: number) => {
    setAcademicGoal((prev) => ({
      ...prev,
      weeklyTargetHours: newTarget,
    }));
  }, []);

  const showToast = useCallback((message: string, icon = 'check_circle') => {
    setToast({ message, icon, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2500);
  }, []);

  const handleLogStudySession = useCallback((sessionData: Omit<StudySession, 'id' | 'date'>) => {
    // Validation: prevent negative, zero, or NaN durations
    if (sessionData.durationHours <= 0 || isNaN(sessionData.durationHours)) {
      showToast('Duration must be a positive number greater than 0.', 'error');
      return;
    }

    const newSession: StudySession = {
      ...sessionData,
      id: `session-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };

    setAcademicGoal((prev) => {
      const nextCompleted = Number((prev.completedHours + sessionData.durationHours).toFixed(1));
      return {
        ...prev,
        completedHours: nextCompleted,
        sessions: [newSession, ...prev.sessions],
      };
    });

    showToast(`+${sessionData.durationHours}h logged for ${sessionData.subject}!`, 'check_circle');
  }, [showToast]);

  const handleResetWeeklySessions = useCallback(() => {
    setAcademicGoal((prev) => ({
      ...prev,
      completedHours: 0,
      sessions: [],
    }));
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoginOpen(true);
    showToast('Signed out of student portal. Please sign in.', 'logout');
  }, [showToast]);

  // Keyboard shortcut Cmd+K / Ctrl+K for Global Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Navigation handlers
  const handleNavigate = useCallback((viewId: string) => {
    setNavHistory((prev) => {
      if (prev[prev.length - 1] === viewId) return prev;
      return [...prev, viewId];
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleGoBack = useCallback(() => {
    setNavHistory((prev) => {
      if (prev.length <= 1) return ['dashboard'];
      return prev.slice(0, prev.length - 1);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // File Download & Offline saving handlers
  const handleTriggerDownload = useCallback((filename: string, title?: string, content?: string) => {
    showToast(`Downloading ${filename}...`, 'downloading');
    setTimeout(() => {
      downloadAcademicFile(filename, title, content);
      showToast(`${filename} saved to device & Offline Vault!`, 'check_circle');

      // Also ensure it is marked in offline vault
      setNotes((prevNotes) =>
        prevNotes.map((n) =>
          n.filename === filename || n.title === title ? { ...n, isSavedOffline: true } : n
        )
      );
    }, 700);
  }, [showToast]);

  const handleSaveOffline = useCallback((note: NoteFile) => {
    setNotes((prevNotes) =>
      prevNotes.map((n) => (n.id === note.id ? { ...n, isSavedOffline: true } : n))
    );
    showToast(`${note.filename} saved to Offline Vault!`, 'cloud_done');
  }, [showToast]);

  const handleRemoveFromVault = useCallback((noteId: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((n) => (n.id === noteId ? { ...n, isSavedOffline: false } : n))
    );
  }, []);

  const handleBookmark = useCallback((note: NoteFile) => {
    showToast(`Bookmarked ${note.title}!`, 'bookmark');
  }, [showToast]);

  const handleOpenNoticeModal = useCallback((refNoOrId: string) => {
    const found = notices.find((n) => n.refNo === refNoOrId || n.id === refNoOrId);
    if (found) {
      setActiveNoticeForModal(found);
    }
  }, [notices]);

  const handleMarkAllNoticesRead = useCallback(() => {
    setNotices((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('All notices marked as read', 'done_all');
  }, [showToast]);

  // Derived metrics
  const unreadNoticesCount = notices.filter((n) => !n.isRead).length;
  const vaultNotes = notes.filter((n) => n.isSavedOffline);

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans select-none antialiased">
      {/* Dynamic Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onGoBack={handleGoBack}
        canGoBack={navHistory.length > 1}
        unreadCount={unreadNoticesCount}
        currentStudent={currentStudent}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Container with Desktop Sidebar */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto pt-14 pb-20 lg:pb-8">
        {/* Desktop Sidebar (visible on lg screens) */}
        <Sidebar
          currentView={currentView}
          onNavigate={handleNavigate}
          currentStudent={currentStudent}
          unreadCount={unreadNoticesCount}
          offlineCount={vaultNotes.length}
          onOpenLogin={() => setIsLoginOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onLogout={handleLogout}
        />

        {/* Central Viewport */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#f8f9ff]">
          {currentView === 'dashboard' && (
            <DashboardView
              student={currentStudent}
              onNavigate={handleNavigate}
              onOpenNoteReader={(note) => setActiveNoteForReader(note)}
              onTriggerDownload={handleTriggerDownload}
              onOpenPyqDrawer={() => setIsPyqOpen(true)}
              onOpenMasterRepo={() => setIsMasterRepoOpen(true)}
              onOpenNoticeModal={handleOpenNoticeModal}
              recentNotes={notes}
              academicGoal={academicGoal}
              onUpdateTargetHours={handleUpdateTargetHours}
              onLogStudySession={handleLogStudySession}
              onResetWeeklySessions={handleResetWeeklySessions}
              onOpenStudySessionModal={() => setIsStudyModalOpen(true)}
              onShowToast={showToast}
            />
          )}

          {currentView === 'attendance' && (
            <AttendanceView student={currentStudent} onShowToast={showToast} />
          )}

          {currentView === 'results' && (
            <ResultsView
              student={currentStudent}
              onDownloadDMC={() =>
                handleTriggerDownload(
                  `${currentStudent.name.replace(' ', '_')}_Official_PTU_Transcript.pdf`,
                  `Official PTU Transcript - ${currentStudent.name} (${currentStudent.rollNo})`
                )
              }
              onShowToast={showToast}
            />
          )}

          {currentView === 'timetable' && <TimetableView onShowToast={showToast} />}

          {currentView === 'academic-mobility' && (
            <AcademicMobilityView student={currentStudent} onShowToast={showToast} />
          )}

          {currentView === 'notes' && (
            <NotesView
              notes={notes}
              onOpenNoteReader={(note) => setActiveNoteForReader(note)}
              onTriggerDownload={handleTriggerDownload}
              onNavigateToVault={() => handleNavigate('vault')}
              offlineCount={vaultNotes.length}
            />
          )}

          {currentView === 'copilot' && (
            <CopilotView student={currentStudent} onShowToast={showToast} />
          )}

          {currentView === 'syllabus' && (
            <SyllabusView
              onDownloadScheme={() =>
                handleTriggerDownload(
                  'PTU_CSE_Official_Syllabus_Scheme_2024.pdf',
                  'PTU B.Tech CSE Official Syllabus & Scheme'
                )
              }
              onShowToast={showToast}
            />
          )}

          {currentView === 'notifications' && (
            <NotificationsView
              notices={notices}
              onOpenNotice={(n) => setActiveNoticeForModal(n)}
              onMarkAllRead={handleMarkAllNoticesRead}
              onDownloadAttachment={(fn, title) => handleTriggerDownload(fn, title)}
            />
          )}

          {currentView === 'profile' && (
            <ProfileView
              student={currentStudent}
              onOpenLogin={() => setIsLoginOpen(true)}
              onLogout={handleLogout}
              onShowToast={showToast}
            />
          )}

          {currentView === 'campus-info' && (
            <CampusInfoView
              onDownloadBusRoutes={() =>
                handleTriggerDownload(
                  'CGC_Mohali_Bus_Routes_2024.pdf',
                  'CGC Mohali Official Bus Routes & Timings'
                )
              }
              onShowToast={showToast}
            />
          )}

          {currentView === 'vault' && (
            <VaultView
              vaultNotes={vaultNotes}
              onOpenNoteReader={(note) => setActiveNoteForReader(note)}
              onRemoveFromVault={handleRemoveFromVault}
              onShowToast={showToast}
            />
          )}
        </main>
      </div>

      {/* Persistent Bottom Mobile Navigation */}
      <BottomNav currentView={currentView} onNavigate={handleNavigate} />

      {/* Modals & Dialogs */}
      <NoteReaderModal
        note={activeNoteForReader}
        isOpen={Boolean(activeNoteForReader)}
        onClose={() => setActiveNoteForReader(null)}
        onDownload={(note) => handleTriggerDownload(note.filename, note.title, note.contentPreview)}
        onSaveOffline={handleSaveOffline}
        onBookmark={handleBookmark}
      />

      <PyqDrawerModal
        isOpen={isPyqOpen}
        onClose={() => setIsPyqOpen(false)}
        onDownload={(fn, title) => handleTriggerDownload(fn, title)}
        onPreview={(fn, title) => {
          setIsPyqOpen(false);
          const found = notes.find((n) => n.filename === fn) || {
            id: 'pyq-preview',
            title,
            description: 'PTU Solved Past Paper',
            subjectCategory: 'PYQ' as const,
            filename: fn,
            fileSize: '3.4 MB',
            tag: 'SOLVED PAPERS',
            author: 'CGC Academic Board',
            downloads: 1200,
            contentPreview: `I.K. GUJRAL PUNJAB TECHNICAL UNIVERSITY\nSolved Past Paper: ${title}\nIncludes Model Answers and Step-by-Step Marking Rubric.`,
          };
          setActiveNoteForReader(found);
        }}
      />

      <MasterRepoModal
        isOpen={isMasterRepoOpen}
        onClose={() => setIsMasterRepoOpen(false)}
        onDownload={(fn, title) => handleTriggerDownload(fn, title)}
        onPreview={(fn, title) => {
          setIsMasterRepoOpen(false);
          const found = {
            id: 'repo-preview',
            title,
            description: 'Department CSE 4th Sem Master Repository',
            subjectCategory: 'OS' as const,
            filename: fn,
            fileSize: '4.8 MB',
            tag: 'FACULTY REPO',
            author: 'Dr. Preetinder Kaur & Prof. Hardeep Singh',
            downloads: 2100,
            contentPreview: `CGC MOHALI - CSE 4TH SEMESTER MASTER REPOSITORY\nResource: ${title}\nIncludes Lab Manuals, Viva Voce Question Bank & Solved Linux syscall programs.`,
          };
          setActiveNoteForReader(found);
        }}
      />

      <NoticeDetailModal
        notice={activeNoticeForModal}
        isOpen={Boolean(activeNoticeForModal)}
        onClose={() => setActiveNoticeForModal(null)}
        onDownloadAttachment={(fn, title) => handleTriggerDownload(fn, title)}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(student) => {
          setCurrentStudent(student);
          showToast(`Logged in as ${student.name} (${student.rollNo})`, 'check_circle');
        }}
        currentStudent={currentStudent}
      />

      {/* Study Session Input Modal with negative duration validation */}
      <StudySessionModal
        isOpen={isStudyModalOpen}
        onClose={() => setIsStudyModalOpen(false)}
        onAddSession={handleLogStudySession}
      />

      {/* Global Portal Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
        onOpenNote={(note) => setActiveNoteForReader(note)}
        notes={notes}
        notices={notices}
        onOpenStudyModal={() => setIsStudyModalOpen(true)}
      />

      {/* Toast Alert */}
      <Toast message={toast.message} icon={toast.icon} visible={toast.visible} />
    </div>
  );
}
