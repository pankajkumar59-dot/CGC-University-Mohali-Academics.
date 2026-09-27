export interface StudentProfile {
  id: string;
  rollNo: string;
  urn: string;
  ptuReg: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  branch: string;
  semester: number;
  section: string;
  campus: string;
  cgpa: number;
  overallAttendance: number;
  totalAttendedClasses: number;
  totalHeldClasses: number;
  mentor: string;
  hostel: string;
  busRoute: string;
  avatarUrl: string;
  abcId: string;
  transferredCredits: number;
  requiredCredits: number;
  nptelCredits: number;
  batchYear: string;
  validUpto: string;
}

export interface SubjectAttendance {
  code: string;
  name: string;
  attended: number;
  total: number;
  percentage: number;
  safeMiss: number;
  credits: number;
  faculty: string;
}

export interface SubjectGrade {
  code: string;
  name: string;
  credits: number;
  grade: string;
  gradePoints: number;
  internalMarks: number;
  externalMarks: number;
  totalMarks: number;
  status: 'Pass' | 'Fail' | 'In Progress';
}

export interface SemesterResult {
  semester: number;
  sgpa: number;
  creditsEarned: number;
  totalCredits: number;
  status: string;
  subjects: SubjectGrade[];
}

export interface TimetableSlot {
  id: string;
  day: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';
  time: string;
  endTime: string;
  subject: string;
  subjectCode: string;
  room: string;
  block: string;
  instructor: string;
  type: 'Lecture' | 'Lab' | 'Tutorial' | 'Seminar';
  topic?: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface NoteFile {
  id: string;
  title: string;
  description: string;
  subjectCategory: 'OS' | 'DAA' | 'DBMS' | 'PYQ' | 'MATHS' | 'LAB';
  filename: string;
  fileSize: string;
  tag: string;
  author: string;
  downloads: number;
  contentPreview?: string;
  isSavedOffline?: boolean;
}

export interface NoticeItem {
  id: string;
  title: string;
  description: string;
  category: 'Exam' | 'Placement' | 'Clubs' | 'Academic' | 'Admin';
  date: string;
  refNo: string;
  attachmentName?: string;
  isRead: boolean;
  priority: 'high' | 'normal';
}

export interface SyllabusUnit {
  unitNumber: number;
  title: string;
  topics: string[];
  status: 'Completed' | 'In Progress' | 'Pending';
  completionPct: number;
}

export interface SyllabusCourse {
  code: string;
  name: string;
  credits: number;
  completionPct: number;
  units: SyllabusUnit[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  topic?: string;
}

export interface StudySession {
  id: string;
  subject: string;
  subjectCode: string;
  durationHours: number;
  date: string;
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  topic: string;
}

export interface AcademicGoal {
  weeklyTargetHours: number;
  completedHours: number;
  sessions: StudySession[];
}

